'use client'

import { useEffect, useRef } from 'react'

/**
 * "Built on what's next" - the technology layer under the system.
 *
 * Not a grid and not badges: technology names are typographic objects placed
 * in one spatial field, sized and dimmed by depth. Four layers read left to
 * right (interface -> intelligence -> data -> infrastructure) along a single
 * signal line, and each name brightens in turn as the signal reaches it -
 * which is done purely in CSS, by giving every name an animation-delay
 * proportional to its own position. No per-frame work for the ambient state.
 *
 * The pointer adds proximity: names brighten, neighbours ease aside, and a
 * connector drops to the signal line with a small readout.
 */

type Tier = 'lg' | 'md' | 'sm' | 'xs'

interface Tech {
  name: string
  x: number // % across the field
  y: number // % down the field
  tier: Tier
  depth: number // 0.35..1 - opacity and blur
  role: string
  tag: string
  layer: string
}

const LAYERS = [
  { id: '01', name: 'Interface', x: 2 },
  { id: '02', name: 'Intelligence', x: 28 },
  { id: '03', name: 'Data', x: 55 },
  { id: '04', name: 'Infrastructure', x: 78 },
]

const TECH: Tech[] = [
  // 01 interface
  { name: 'Next.js', x: 2, y: 30, tier: 'lg', depth: 1, role: 'Framework', tag: 'SSR / RSC', layer: '01' },
  { name: 'React', x: 14.5, y: 57, tier: 'md', depth: 0.8, role: 'Library', tag: 'UI runtime', layer: '01' },
  { name: 'TypeScript', x: 2.5, y: 76, tier: 'sm', depth: 0.6, role: 'Language', tag: 'Types', layer: '01' },
  { name: 'Tailwind', x: 16, y: 13, tier: 'xs', depth: 0.45, role: 'Styling', tag: 'Tokens', layer: '01' },

  // 02 intelligence
  { name: 'OpenAI', x: 28, y: 22, tier: 'lg', depth: 1, role: 'Model provider', tag: 'LLM API', layer: '02' },
  { name: 'Anthropic', x: 28.5, y: 68, tier: 'md', depth: 0.85, role: 'Model provider', tag: 'LLM API', layer: '02' },
  { name: 'Python', x: 44, y: 48, tier: 'md', depth: 0.75, role: 'Language', tag: 'Runtime', layer: '02' },
  { name: 'FastAPI', x: 43.5, y: 80, tier: 'sm', depth: 0.55, role: 'Service', tag: 'Async API', layer: '02' },
  { name: 'LangGraph', x: 41, y: 12, tier: 'xs', depth: 0.45, role: 'Orchestration', tag: 'Agent graphs', layer: '02' },

  // 03 data
  { name: 'PostgreSQL', x: 55, y: 58, tier: 'lg', depth: 1, role: 'Data layer', tag: 'Production', layer: '03' },
  { name: 'pgvector', x: 56.5, y: 26, tier: 'md', depth: 0.8, role: 'Vector index', tag: 'Embeddings', layer: '03' },
  { name: 'Redis', x: 73, y: 82, tier: 'sm', depth: 0.6, role: 'Cache', tag: 'Queues', layer: '03' },
  { name: 'Pinecone', x: 71, y: 36, tier: 'xs', depth: 0.45, role: 'Vector DB', tag: 'Managed', layer: '03' },

  // 04 infrastructure
  { name: 'Docker', x: 78, y: 30, tier: 'lg', depth: 1, role: 'Runtime', tag: 'Containers', layer: '04' },
  { name: 'AWS', x: 89, y: 60, tier: 'md', depth: 0.8, role: 'Cloud', tag: 'Compute', layer: '04' },
  { name: 'Vercel', x: 78.5, y: 78, tier: 'sm', depth: 0.6, role: 'Edge', tag: 'Deploy', layer: '04' },
  { name: 'CI/CD', x: 89.5, y: 14, tier: 'xs', depth: 0.45, role: 'Pipeline', tag: 'Automated', layer: '04' },
]

export default function StackField() {
  const rootRef = useRef<HTMLElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  // Proximity. Runs only for fine pointers on a wide enough field, and only
  // while the pointer is actually over it - the listener lives on the element.
  useEffect(() => {
    const field = fieldRef.current
    if (!field) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const wide = window.matchMedia('(min-width: 900px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || !wide.matches || reduced.matches) return

    field.classList.add('is-live')
    const items = Array.from(field.querySelectorAll<HTMLElement>('.stack-item'))
    let centres: { x: number; y: number }[] = []
    const cur = items.map(() => ({ p: 0, dx: 0, dy: 0 }))

    const measure = () => {
      const r = field.getBoundingClientRect()
      centres = items.map((el) => {
        const b = el.getBoundingClientRect()
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 }
      })
    }
    measure()

    const pointer = { x: -9999, y: -9999, on: false }
    let raf = 0
    let running = false

    const frame = () => {
      let moving = false
      const R = 190
      for (let i = 0; i < items.length; i++) {
        const c = centres[i]
        if (!c) continue
        const dx = c.x - pointer.x
        const dy = c.y - pointer.y
        const d = Math.hypot(dx, dy)
        const target = pointer.on && d < R ? Math.pow(1 - d / R, 2) : 0

        // the nearest name lights; the ones just outside ease aside
        const push = pointer.on && d < R && d > 1 ? (1 - d / R) * 14 : 0
        const s = cur[i]
        s.p += (target - s.p) * 0.18
        s.dx += ((dx / (d || 1)) * push - s.dx) * 0.14
        s.dy += ((dy / (d || 1)) * push - s.dy) * 0.14

        if (s.p > 0.002 || Math.abs(s.dx) > 0.05 || Math.abs(s.dy) > 0.05) moving = true
        items[i].style.setProperty('--p', s.p.toFixed(3))
        items[i].style.setProperty('--dx', s.dx.toFixed(2) + 'px')
        items[i].style.setProperty('--dy', s.dy.toFixed(2) + 'px')
      }
      if (!moving && !pointer.on) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.on = true
      start()
    }
    const onLeave = () => {
      pointer.on = false
      start()
    }
    let mRaf = 0
    const remeasure = () => {
      cancelAnimationFrame(mRaf)
      mRaf = requestAnimationFrame(measure)
    }

    field.addEventListener('pointermove', onMove, { passive: true })
    field.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', remeasure)
    window.addEventListener('scroll', remeasure, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(mRaf)
      field.classList.remove('is-live')
      field.removeEventListener('pointermove', onMove)
      field.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('scroll', remeasure)
    }
  }, [])

  // The field resolves as it arrives, and settles again on the way out.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // Arming enables the hide-then-reveal; see .stack-armed in globals.css.
    root.classList.add('stack-armed')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-focused')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => root.classList.toggle('is-focused', e.isIntersecting))
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: 0 }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="stack" aria-labelledby="stack-title">
      <div className="stack-ground" aria-hidden="true" />
      <div className="stack-grid" aria-hidden="true" />

      <div className="stack-inner">
        <header className="stack-head">
          <div className="stack-head-line">
            <span className="stack-meta">
              <span className="stack-meta-index">03</span>
              <span className="stack-meta-rule" aria-hidden="true" />
              Current stack
            </span>
            <span className="stack-meta stack-meta-status">
              <span className="stack-status-dot" aria-hidden="true" />
              Status: active
            </span>
          </div>

          <h2 id="stack-title" className="stack-title">
            Built on what&apos;s next.
          </h2>
          <p className="stack-lede">
            Tools are interchangeable.{' '}
            <span className="stack-lede-em">Engineering isn&apos;t.</span>
          </p>
        </header>

        <div ref={fieldRef} className="stack-field">
          <span className="stack-signal" aria-hidden="true">
            <span className="stack-signal-pulse" />
          </span>

          {LAYERS.map((l) => (
            <div key={l.id} className="stack-group">
              <div className="stack-layer" style={{ left: l.x + '%' }}>
                <span className="stack-layer-tick" aria-hidden="true" />
                <span className="stack-layer-id">{l.id}</span>
                <span className="stack-layer-name">{l.name}</span>
              </div>

              <ul className="stack-list">
                {TECH.filter((t) => t.layer === l.id).map((t) => (
                  <li
                    key={t.name}
                    className={'stack-item stack-' + t.tier}
                    style={
                      {
                        left: t.x + '%',
                        top: t.y + '%',
                        '--o': t.depth,
                        // peak in step with the signal reaching this position
                        animationDelay: (t.x / 100) * 15 + 's',
                      } as React.CSSProperties
                    }
                  >
                    <span className="stack-name">{t.name}</span>
                    <span className="stack-readout" aria-hidden="true">
                      <span className="stack-readout-line" />
                      <span className="stack-readout-role">{t.role}</span>
                      <span className="stack-readout-tag">{t.tag}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

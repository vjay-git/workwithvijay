'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
  InterfaceVisual,
  IntelligenceVisual,
  OperationsVisual,
  InfrastructureVisual,
} from './ServiceVisuals'

const LAYERS = [
  {
    n: '01',
    title: 'The Interface',
    sub: 'Where systems meet people.',
    body: 'We design interfaces that make complex products feel obvious — from AI-native experiences to customer-facing applications.',
    Visual: InterfaceVisual,
    caps: [
      { name: 'Web', meta: 'Marketing · product surfaces' },
      { name: 'Product', meta: 'Application UI · flows' },
      { name: 'AI interfaces', meta: 'Streaming · citations · review' },
      { name: 'Design systems', meta: 'Tokens · components' },
    ],
  },
  {
    n: '02',
    title: 'The Intelligence',
    sub: 'Where systems learn and reason.',
    body: 'We connect models to your data, tools and business logic through RAG, agents, orchestration and structured workflows.',
    Visual: IntelligenceVisual,
    caps: [
      { name: 'RAG', meta: 'Vector · retrieval · context' },
      { name: 'AI agents', meta: 'Tools · verification' },
      { name: 'LLM systems', meta: 'Prompting · evaluation' },
      { name: 'Knowledge', meta: 'Ingestion · chunking' },
      { name: 'Orchestration', meta: 'Graphs · state' },
    ],
  },
  {
    n: '03',
    title: 'The Operations',
    sub: 'Where systems sustain themselves.',
    body: 'We turn repetitive work into reliable workflows with automation, internal tools, integrations and operational intelligence.',
    Visual: OperationsVisual,
    caps: [
      { name: 'Automation', meta: 'Triggers · schedules' },
      { name: 'Workflows', meta: 'Queues · retries' },
      { name: 'Internal tools', meta: 'Admin · review UI' },
      { name: 'Integrations', meta: 'APIs · webhooks' },
    ],
  },
  {
    n: '04',
    title: 'The Infrastructure',
    sub: 'Where systems become reliable.',
    body: 'Production architecture built for the realities beyond the demo: data, APIs, deployment, observability and scale.',
    Visual: InfrastructureVisual,
    caps: [
      { name: 'APIs', meta: 'REST · streaming' },
      { name: 'Data', meta: 'Postgres · pgvector' },
      { name: 'Cloud', meta: 'Compute · storage' },
      { name: 'Deployment', meta: 'CI/CD · rollback' },
      { name: 'Monitoring', meta: 'Traces · alerts' },
    ],
  },
]

export default function ServicesLayers() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // One pointer controller for every node on the page. Node centres are cached
  // relative to the root, so they survive scrolling and only one rect is read
  // per move rather than one per node.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    const nodes = Array.from(root.querySelectorAll<SVGElement>('[data-node]'))
    if (!nodes.length) return
    let centres: { x: number; y: number }[] = []
    const cur = nodes.map(() => 0)

    const measure = () => {
      const r = root.getBoundingClientRect()
      centres = nodes.map((el) => {
        const b = el.getBoundingClientRect()
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 }
      })
    }
    measure()

    const pointer = { x: -99999, y: -99999, on: false }
    let raf = 0
    let running = false

    const frame = () => {
      let moving = false
      const R = 150
      for (let i = 0; i < nodes.length; i++) {
        const c = centres[i]
        if (!c) continue
        const d = Math.hypot(c.x - pointer.x, c.y - pointer.y)
        const target = pointer.on && d < R ? Math.pow(1 - d / R, 2) : 0
        cur[i] += (target - cur[i]) * 0.18
        if (cur[i] > 0.003) moving = true
        nodes[i].style.setProperty('--p', cur[i].toFixed(3))
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
      const r = root.getBoundingClientRect()
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

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', remeasure)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(mRaf)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', remeasure)
    }
  }, [])

  // Section activation + the signal travelling the system line.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const sections = Array.from(track.querySelectorAll<HTMLElement>('.svc-layer'))
    track.classList.add('svc-armed')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((s) => s.classList.add('is-live'))
      track.style.setProperty('--svc-p', '1')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting))
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))

    let raf = 0
    const apply = () => {
      const r = track.getBoundingClientRect()
      const p = (window.innerHeight * 0.62 - r.top) / Math.max(1, r.height)
      track.style.setProperty('--svc-p', String(Math.max(0, Math.min(1, p))))
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={rootRef} className="svc">
      <div className="svc-ground" aria-hidden="true" />
      <div className="svc-grid" aria-hidden="true" />

      {/* --- opening --- */}
      <section className="svc-open" aria-labelledby="svc-title">
        <div className="svc-inner">
          <span className="svc-meta">
            <span className="svc-meta-index">Services</span>
            <span className="svc-meta-rule" aria-hidden="true" />
            01
          </span>

          <h1 id="svc-title" className="svc-title">
            How we
            <br />
            <span className="svc-title-em">build systems.</span>
          </h1>

          <p className="svc-lede">
            We design the interface, intelligence, operations and infrastructure that make
            digital products work.
          </p>

          <span className="svc-hint">
            Scroll to explore the system
            <span className="svc-hint-arrow" aria-hidden="true">
              ↓
            </span>
          </span>
        </div>
      </section>

      {/* --- the four layers --- */}
      <div ref={trackRef} className="svc-track">
        <span className="svc-line" aria-hidden="true">
          <span className="svc-line-fill" />
        </span>

        {LAYERS.map(({ n, title, sub, body, caps, Visual }) => (
          <section key={n} className="svc-layer" aria-labelledby={'svc-' + n}>
            <span className="svc-marker" aria-hidden="true">
              <span className="svc-marker-dot" />
            </span>

            <div className="svc-layer-text">
              <span className="svc-n">{n}</span>
              <h2 id={'svc-' + n} className="svc-layer-title">
                {title}
              </h2>
              <p className="svc-layer-sub">{sub}</p>
              <p className="svc-layer-body">{body}</p>

              <ul className="svc-caps">
                {caps.map((c) => (
                  <li key={c.name} className="svc-cap">
                    <span className="svc-cap-name">{c.name}</span>
                    <span className="svc-cap-meta" aria-hidden="true">
                      {c.meta}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc-layer-visual">
              <Visual />
            </div>
          </section>
        ))}
      </div>

      {/* --- closing --- */}
      <section className="svc-close">
        <div className="svc-inner">
          <p className="svc-close-line">
            If your system doesn&apos;t fit these layers,{' '}
            <span className="svc-close-em">that&apos;s usually where we do our best work.</span>
          </p>
          <div className="svc-close-actions">
            <Link href="/contact" prefetch={true} className="svc-cta">
              <span className="svc-cta-label">Start a project</span>
              <span className="svc-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/work" prefetch={true} className="svc-ghost">
              <span className="svc-ghost-text">View work</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  RagVisual,
  AgentVisual,
  PlatformVisual,
  OrchestrationVisual,
} from './WorkVisuals'

/* -------------------------------------------------------------------------- */
/*  the archive                                                               */
/* -------------------------------------------------------------------------- */

type Tag = 'rag' | 'agents' | 'platform' | 'automation'

interface CaseStudy {
  n: string
  /** one entry per rendered line, so the break point is a design decision */
  title: string[]
  /** the project's own designation, where it has one */
  designation?: string
  category: string
  tags: Tag[]
  problem: string
  system: string
  outcome: {
    /** only ever set where the figure is recorded in the project data */
    figure?: string
    head: string
    note: string
  }
  stack?: string[]
  Visual: React.ComponentType
}

const CASES: CaseStudy[] = [
  {
    n: '01',
    title: ['AI Knowledge', 'Assistant'],
    category: 'RAG / Knowledge system',
    tags: ['rag'],
    problem:
      'Users needed reliable answers from internal documents without hallucinations.',
    system:
      'Retrieval-augmented generation with controlled knowledge retrieval and answer validation.',
    outcome: {
      head: 'Faster knowledge access',
      note:
        'Reliable answers, reduced search time, and a production deployment with monitoring.',
    },
    stack: ['Next.js', 'Python', 'Vector DB', 'LLM APIs'],
    Visual: RagVisual,
  },
  {
    n: '02',
    title: ['Agent-Based Workflow', 'Automation'],
    category: 'AI agents / Automation',
    tags: ['agents', 'automation'],
    problem:
      'Complex multi-step processes required manual coordination and inconsistent execution.',
    system:
      'An agent-based system with explicit decision boundaries, tool access, and fallback paths.',
    outcome: {
      figure: '70%',
      head: 'Less manual coordination',
      note: 'Automated workflows with improved accuracy and full audit trails.',
    },
    stack: ['Python', 'AI agents', 'TypeScript', 'PostgreSQL'],
    Visual: AgentVisual,
  },
  {
    n: '03',
    title: ['Scalable Web', 'Platform'],
    category: 'Full-stack / Platform',
    tags: ['platform'],
    problem:
      'Applications required high traffic handling and complex business logic while maintaining performance.',
    system:
      'Optimized data pipelines, a caching strategy, and a clean API boundary between services.',
    outcome: {
      head: 'Performance at scale',
      note: 'A scalable production platform with improved performance under real traffic.',
    },
    stack: ['React', 'Next.js', 'TypeScript', 'Python', 'Java'],
    Visual: PlatformVisual,
  },
  {
    n: '04',
    title: ['Agentic Orchestration', 'Platform'],
    designation: 'ATS Optimizer',
    category: 'AI agents / Orchestration',
    tags: ['agents'],
    problem: 'Job seekers struggled to optimize resumes across different roles.',
    system:
      'Multi-agent orchestration evaluates resumes, requirements, and role-specific context.',
    outcome: {
      head: 'Repeatable evaluation',
      note: 'Automated candidate optimization with explainable, repeatable scoring.',
    },
    Visual: OrchestrationVisual,
  },
]

const FILTERS: { key: 'all' | Tag; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'rag', label: 'RAG' },
  { key: 'agents', label: 'Agents' },
  { key: 'platform', label: 'Platform' },
  { key: 'automation', label: 'Automation' },
]

/* -------------------------------------------------------------------------- */

export default function WorkArchive() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<'all' | Tag>('all')

  const visible = useMemo(
    () => CASES.filter((c) => filter === 'all' || c.tags.includes(filter as Tag)),
    [filter]
  )

  // One pointer controller for every node on the page. Centres are cached
  // relative to the root, so one rect is read per move rather than one per node.
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
    // the node set is re-composed whenever the index filter changes
  }, [filter])

  // Case activation. Normal scrolling drives it — nothing is captured.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cases = Array.from(track.querySelectorAll<HTMLElement>('.wk-case'))
    track.classList.add('wk-armed')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cases.forEach((c) => c.classList.add('is-live'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting))
      },
      { rootMargin: '-18% 0px -22% 0px', threshold: 0 }
    )
    cases.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [filter])

  return (
    <div ref={rootRef} className="wk">
      <div className="wk-ground" aria-hidden="true" />
      <div className="wk-grid" aria-hidden="true" />
      <div className="wk-coords" aria-hidden="true" />

      {/* ---------------------------------------------------------------- hero */}
      <section className="wk-open" aria-labelledby="wk-title">
        <div className="wk-inner">
          <span className="wk-meta">
            <span className="wk-meta-index">Work</span>
            <span className="wk-meta-rule" aria-hidden="true" />
            03
          </span>

          <h1 id="wk-title" className="wk-title">
            Systems
            <br />
            <span className="wk-title-em">that ship.</span>
          </h1>

          <p className="wk-lede">
            Selected systems built around real operational, product, and intelligence
            problems.
          </p>

          <ul className="wk-spec">
            <li className="wk-spec-item">Selected work</li>
            <li className="wk-spec-item">
              <span className="wk-spec-figure">04</span> Systems
            </li>
            <li className="wk-spec-item">Production-oriented</li>
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- system index */}
      <section className="wk-index" aria-label="Filter systems by type">
        <div className="wk-inner wk-index-inner">
          <span className="wk-index-label" aria-hidden="true">
            System type
          </span>

          <div className="wk-index-set" role="group">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={'wk-index-key' + (filter === f.key ? ' is-active' : '')}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                <span className="wk-index-key-dot" aria-hidden="true" />
                {f.label}
              </button>
            ))}
          </div>

          <span className="wk-index-count" aria-live="polite">
            {String(visible.length).padStart(2, '0')} /{' '}
            {String(CASES.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* --------------------------------------------------------- case studies */}
      <div key={filter} ref={trackRef} className="wk-track">
        {visible.map((c, i) => {
          const next = visible[i + 1]
          return (
            <div key={c.n} className="wk-unit">
              <Case study={c} flip={i % 2 === 1} enter={i} />
              {next && (
                <div className="wk-sep" aria-hidden="true">
                  <span className="wk-sep-line" />
                  <span className="wk-sep-mark">
                    {c.n} <span className="wk-sep-arrow">&rarr;</span> {next.n}
                  </span>
                  <span className="wk-sep-line wk-sep-line-r" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ------------------------------------------------------------- closing */}
      <section className="wk-close" aria-labelledby="wk-close-title">
        <div className="wk-inner">
          <span className="wk-meta">
            <span className="wk-meta-index">Contact</span>
            <span className="wk-meta-rule" aria-hidden="true" />
            05
          </span>

          <h2 id="wk-close-title" className="wk-close-title">
            The next
            <br />
            system is
            <br />
            <span className="wk-close-em">yours.</span>
          </h2>

          <p className="wk-close-lede">
            Have a difficult problem that needs more than a prototype?
          </p>

          <div className="wk-close-actions">
            <Link href="/contact" prefetch={true} className="wk-cta">
              <span className="wk-cta-label">Start a project</span>
              <span className="wk-cta-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>

            <Link href="/services" prefetch={true} className="wk-ghost">
              <span className="wk-ghost-text">How we build</span>
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  one case study                                                            */
/* -------------------------------------------------------------------------- */

function Case({
  study,
  flip,
  enter,
}: {
  study: CaseStudy
  /** composition alternates on the visible index, so filtering keeps the rhythm */
  flip: boolean
  enter: number
}) {
  const { n, title, designation, category, problem, system, outcome, stack, Visual } =
    study
  const headingId = 'wk-case-' + n

  return (
    <article
      className={'wk-case' + (flip ? ' wk-case-flip' : '')}
      style={{ animationDelay: enter * 90 + 'ms' }}
      aria-labelledby={headingId}
    >
      {/* header: the index line, then the rule that runs the width of the case */}
      <div className="wk-case-head">
        <span className="wk-case-eyebrow">
          <span className="wk-case-eyebrow-n">{n}</span>
          <span className="wk-case-eyebrow-slash" aria-hidden="true">
            /
          </span>
          Selected system
        </span>
        <span className="wk-case-head-rule" aria-hidden="true">
          <span className="wk-case-head-fill" />
        </span>
      </div>

      {/* the composition: identity against architecture */}
      <div className="wk-case-top">
        <div className="wk-case-id">
          <span className="wk-case-n" aria-hidden="true">
            {n}
          </span>
          <h2 id={headingId} className="wk-case-title">
            {title.map((line, i) => (
              <span key={line}>
                {line}
                {i < title.length - 1 && <br />}
              </span>
            ))}
          </h2>
          {designation && <span className="wk-case-desig">{designation}</span>}
          <p className="wk-case-cat">{category}</p>
        </div>

        <div className="wk-case-visual">
          <Visual />
        </div>
      </div>

      {/* the dossier: problem, system, and the result the work is judged on */}
      <div className="wk-case-body">
        <div className="wk-field">
          <span className="wk-field-label">The problem</span>
          <p className="wk-field-text">{problem}</p>
        </div>

        <div className="wk-field">
          <span className="wk-field-label">The system</span>
          <p className="wk-field-text">{system}</p>
        </div>

        <div className="wk-field wk-field-outcome">
          <span className="wk-field-label">Outcome</span>
          <p className="wk-outcome">
            {outcome.figure && (
              <span className="wk-outcome-figure">{outcome.figure}</span>
            )}
            <span className="wk-outcome-head">{outcome.head}</span>
          </p>
          <p className="wk-outcome-note">{outcome.note}</p>
        </div>
      </div>

      {/* the stack line only appears where the project data records one */}
      {stack && (
        <p className="wk-stack">
          <span className="wk-stack-label">Stack</span>
          <span className="wk-stack-value">
            {stack.map((t, i) => (
              <span key={t}>
                {i > 0 && (
                  <span className="wk-stack-sep" aria-hidden="true">
                    /
                  </span>
                )}
                {t}
              </span>
            ))}
          </span>
        </p>
      )}
    </article>
  )
}

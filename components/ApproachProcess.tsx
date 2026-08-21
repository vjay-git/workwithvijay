'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  DiscoverVisual,
  ArchitectVisual,
  BuildVisual,
  ValidateVisual,
  ShipVisual,
  EvolveVisual,
} from './ProcessVisuals'

/* -------------------------------------------------------------------------- */
/*  the process                                                               */
/* -------------------------------------------------------------------------- */

interface Stage {
  n: string
  title: string
  sub: string
  body: string
  /** the four principles, kept but embedded where they actually apply */
  principle: { label: string; lines: string[] }
  Visual: React.ComponentType
}

const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Discover',
    sub: 'Start with the problem, not the technology.',
    body: 'We understand what needs to change, who it affects, what already exists, and where the real constraints are.',
    principle: { label: 'Systems thinking', lines: ['Look beyond the feature.'] },
    Visual: DiscoverVisual,
  },
  {
    n: '02',
    title: 'Architect',
    sub: 'Design the system before building it.',
    body: 'We decide where intelligence lives, how data moves, and which boundaries the system needs — before any of it is written.',
    principle: {
      label: 'How we think',
      lines: ['Reliable, explainable, production-ready.'],
    },
    Visual: ArchitectVisual,
  },
  {
    n: '03',
    title: 'Build',
    sub: 'Turn the architecture into something real.',
    body: 'We build in small, testable increments — connecting interfaces, intelligence, data, and infrastructure.',
    principle: {
      label: 'Engineering discipline',
      lines: ['Make decisions explicit.', 'Build in increments.', 'Test continuously.'],
    },
    Visual: BuildVisual,
  },
  {
    n: '04',
    title: 'Validate',
    sub: 'Make the system prove itself.',
    body: 'We test accuracy, reliability and failure paths under real conditions. A system that only works on the happy path is not finished.',
    principle: {
      label: 'No shortcuts',
      lines: ['Error handling, observability,', 'and audit trails from the start.'],
    },
    Visual: ValidateVisual,
  },
  {
    n: '05',
    title: 'Ship',
    sub: 'Production is part of the engineering.',
    body: 'Deployment, security, observability and rollback are designed with the system, not bolted on at the end.',
    principle: {
      label: 'Production first',
      lines: ['Build for what happens after launch.'],
    },
    Visual: ShipVisual,
  },
  {
    n: '06',
    title: 'Evolve',
    sub: 'A production system is never finished.',
    body: 'We watch how it behaves, learn from real usage, and improve it. Every cycle feeds the next round of discovery.',
    principle: {
      label: 'Design for change',
      lines: ['Not just for today.'],
    },
    Visual: EvolveVisual,
  },
]

/* -------------------------------------------------------------------------- */

export default function ApproachProcess() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // One scroll pass drives everything: the rail fill, the overview chain, and
  // which stage is current. Six rects per frame, read inside a rAF - normal
  // scrolling stays normal, nothing is captured.
  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const stages = Array.from(track.querySelectorAll<HTMLElement>('.pr-stage'))
    if (!stages.length) return
    track.classList.add('pr-armed')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stages.forEach((s) => s.classList.add('is-live'))
      root.style.setProperty('--pr-p', '1')
      setActive(stages.length - 1)
      return
    }

    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight
      const r = track.getBoundingClientRect()
      const p = (vh * 0.6 - r.top) / Math.max(1, r.height)
      root.style.setProperty('--pr-p', Math.max(0, Math.min(1, p)).toFixed(4))

      // the current stage is the one nearest the reading line
      const line = vh * 0.45
      let best = 0
      let bestD = Infinity
      for (let i = 0; i < stages.length; i++) {
        const b = stages[i].getBoundingClientRect()
        const dist = Math.abs(b.top + b.height / 2 - line)
        if (dist < bestD) {
          bestD = dist
          best = i
        }
      }
      for (let i = 0; i < stages.length; i++) {
        stages[i].classList.toggle('is-live', i === best)
      }
      setActive(best)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={rootRef} className="pr">
      <div className="pr-ground" aria-hidden="true" />
      <div className="pr-grid" aria-hidden="true" />

      {/* ---------------------------------------------------------------- hero */}
      <section className="pr-open" aria-labelledby="pr-title">
        <div className="pr-inner">
          <span className="pr-meta">
            <span className="pr-meta-index">Approach</span>
            <span className="pr-meta-rule" aria-hidden="true" />
            04
          </span>

          <h1 id="pr-title" className="pr-title">
            How systems
            <br />
            <span className="pr-title-em">move.</span>
          </h1>

          <p className="pr-lede">
            From ambiguous problems to production systems — every decision changes what
            comes next.
          </p>

          <span className="pr-scope">
            Process
            <span className="pr-scope-sep" aria-hidden="true">
              /
            </span>
            01
            <span className="pr-scope-arrow" aria-hidden="true">
              &rarr;
            </span>
            06
          </span>
        </div>
      </section>

      {/* ------------------------------------------------ the process, at a glance */}
      <div className="pr-inner">
        <nav className="pr-chain" aria-label="Process stages">
          <span className="pr-chain-rule" aria-hidden="true">
            <span className="pr-chain-fill" />
            {/* The scroll fill below only moves once the track is in view, by
                which time the chain has scrolled away. This runs the signal
                through the six nodes once on arrival, so the overview reads as
                a live system rather than a diagram of one. */}
            <span className="pr-chain-sweep" />
          </span>

          {STAGES.map((s, i) => (
            <a
              key={s.n}
              href={'#stage-' + s.n}
              className={
                'pr-chain-key' +
                (i <= active ? ' is-passed' : '') +
                (i === active ? ' is-current' : '')
              }
              aria-current={i === active ? 'true' : undefined}
            >
              <span className="pr-chain-dot" aria-hidden="true" />
              <span className="pr-chain-n">{s.n}</span>
              <span className="pr-chain-name">{s.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* -------------------------------------------------------- the six stages */}
      <div ref={trackRef} className="pr-track">
        <span className="pr-line" aria-hidden="true">
          <span className="pr-line-fill" />
        </span>

        {STAGES.map((s, i) => {
          const { n, title, sub, body, principle, Visual } = s
          return (
            <section
              key={n}
              id={'stage-' + n}
              className={'pr-stage' + (i % 2 === 1 ? ' pr-stage-flip' : '')}
              aria-labelledby={'pr-h-' + n}
            >
              <span className="pr-marker" aria-hidden="true">
                <span className="pr-marker-dot" />
                <span className="pr-marker-arm" />
              </span>

              <div className="pr-stage-text">
                <span className="pr-n">{n}</span>
                <h2 id={'pr-h-' + n} className="pr-stage-title">
                  {title}
                </h2>
                <p className="pr-stage-sub">{sub}</p>
                <p className="pr-stage-body">{body}</p>

                <div className="pr-principle">
                  <span className="pr-principle-label">{principle.label}</span>
                  {principle.lines.map((line) => (
                    <p key={line} className="pr-principle-line">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pr-stage-visual">
                <Visual />
              </div>
            </section>
          )
        })}
      </div>

      {/* ------------------------------------------------------------- closing */}
      <section className="pr-close" aria-labelledby="pr-close-title">
        <div className="pr-inner">
          <span className="pr-meta">
            <span className="pr-meta-index">Contact</span>
            <span className="pr-meta-rule" aria-hidden="true" />
            05
          </span>

          <h2 id="pr-close-title" className="pr-close-title">
            The system
            <br />
            is never
            <br />
            <span className="pr-close-em">just the feature.</span>
          </h2>

          <p className="pr-close-lede">We engineer for what happens after launch.</p>

          <div className="pr-close-actions">
            <Link href="/contact" prefetch={true} className="pr-cta">
              <span className="pr-cta-label">Start a project</span>
              <span className="pr-cta-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>

            <Link href="/work" prefetch={true} className="pr-ghost">
              <span className="pr-ghost-text">See the results</span>
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

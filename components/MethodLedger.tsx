'use client'

import { useEffect, useRef } from 'react'

/**
 * "How we build" - the operating layer.
 *
 * A third rhythm again: not the spine of THE SYSTEM, not the field of THE
 * STACK, but a ledger - full-width rows separated by hairlines, read like an
 * index. The enterprise guarantees follow as a spec strip rather than a second
 * 2x2 grid, which is what made the old pair of sections read as filler.
 */

const PRINCIPLES = [
  {
    n: '01',
    title: 'Production from day one',
    body: 'Security, scale and observability are designed in at the start, not retrofitted once something breaks.',
  },
  {
    n: '02',
    title: 'Systems, not demos',
    body: 'We do not ship experiments. We ship what a team can run, maintain and extend after we hand it over.',
  },
  {
    n: '03',
    title: 'Guardrails by default',
    body: 'Access control, input validation, output filtering and audit trails on every system that touches real data.',
  },
  {
    n: '04',
    title: 'We own the outcome',
    body: 'Clear communication, documentation you can actually use, and support that continues past launch.',
  },
]

const SPEC = [
  { label: 'Enterprise data', value: 'Access control and audit trails on sensitive records' },
  { label: 'SAP / ERP', value: 'Direct integration with real data models and business logic' },
  { label: 'AI guardrails', value: 'Query validation and result filtering before anything returns' },
  { label: '24/7 operation', value: 'Monitoring, error handling and room to scale' },
]

export default function MethodLedger() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const rows = Array.from(list.querySelectorAll<HTMLElement>('.mth-row'))
    // Arming enables the reveal; without it every row stays fully legible.
    list.classList.add('mth-armed')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rows.forEach((r) => r.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="mth" aria-labelledby="mth-title">
      <div className="mth-ground" aria-hidden="true" />
      <div className="mth-grid" aria-hidden="true" />

      <div className="mth-inner">
        <header className="mth-head">
          <span className="mth-meta">
            <span className="mth-meta-index">04</span>
            <span className="mth-meta-rule" aria-hidden="true" />
            Method
          </span>
          <h2 id="mth-title" className="mth-title">
            How we build.
          </h2>
        </header>

        <ol ref={listRef} className="mth-rows">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="mth-row">
              <span className="mth-row-bar" aria-hidden="true" />
              <span className="mth-n">{p.n}</span>
              <h3 className="mth-row-title">{p.title}</h3>
              <p className="mth-row-body">{p.body}</p>
            </li>
          ))}
        </ol>

        {/* the guarantees, as a spec sheet rather than another grid of cards */}
        <div className="mth-spec">
          <span className="mth-spec-label" aria-hidden="true">
            Operating constraints
          </span>
          <dl className="mth-spec-list">
            {SPEC.map((s) => (
              <div key={s.label} className="mth-spec-item">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

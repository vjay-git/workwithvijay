'use client'

import { useEffect, useRef } from 'react'
import { RagDiagram, AgentDiagram, IntegrationDiagram, FullStackDiagram } from './SystemMapDiagrams'

const STAGES = [
  {
    id: 'rag',
    index: '01',
    tag: 'RETRIEVAL',
    title: 'RAG Systems',
    lead: 'Give your AI a reliable memory.',
    body: 'Knowledge systems that connect your data to models through controlled retrieval, real context and citations you can check.',
    Diagram: RagDiagram,
  },
  {
    id: 'agents',
    index: '02',
    tag: 'ORCHESTRATION',
    title: 'AI Agents',
    lead: 'Systems that can actually act.',
    body: 'Multi-step agents with tools, verification and guardrails — including what happens when a step fails.',
    Diagram: AgentDiagram,
  },
  {
    id: 'integrations',
    index: '03',
    tag: 'INTERFACES',
    title: 'Integrations',
    lead: 'Connect intelligence to what you already run.',
    body: 'Secure links into business systems, databases, APIs and internal tools, with access control at every edge.',
    Diagram: IntegrationDiagram,
  },
  {
    id: 'fullstack',
    index: '04',
    tag: 'ARCHITECTURE',
    title: 'Full-Stack',
    lead: 'From model to interface.',
    body: 'Applications spanning frontend, backend, data, AI orchestration and the infrastructure underneath.',
    Diagram: FullStackDiagram,
  },
]

/**
 * "The System" - the hero's environment continued downward.
 *
 * A single cyan signal runs the length of the section and fills with scroll
 * progress; each stage activates as it arrives. Deliberately not four cards:
 * the stages alternate sides across one continuous spine, so it reads as one
 * system explored from top to bottom.
 */
export default function SystemMap() {
  const rootRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)

  // Signal fill, tied to how far the spine has been travelled.
  useEffect(() => {
    const root = rootRef.current
    const list = listRef.current
    if (!root || !list) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.setProperty('--sys-p', '1')
      return
    }
    let raf = 0
    const apply = () => {
      const r = list.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the spine reaches the lower third, 1 once its end passes it
      const p = (vh * 0.68 - r.top) / Math.max(1, r.height)
      root.style.setProperty('--sys-p', String(Math.max(0, Math.min(1, p))))
      raf = 0
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

  // Stages activate on arrival and stay active; earlier ones quiet down via CSS.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.querySelectorAll<HTMLElement>('.sys-stage'))
    // Arming is what enables the dimming - see .sys-armed in globals.css.
    list.classList.add('sys-armed')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-active'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-active')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.1 }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="sys" aria-labelledby="sys-title">
      <div className="sys-ground" aria-hidden="true" />
      <div className="sys-grid" aria-hidden="true" />

      <div className="sys-inner">
        <header className="sys-head">
          <span className="sys-meta">
            <span className="sys-meta-index">02</span>
            <span className="sys-meta-rule" aria-hidden="true" />
            WHAT WE ENGINEER
          </span>
          <h2 id="sys-title" className="sys-title">
            THE SYSTEM
          </h2>
          <p className="sys-lede">
            AI products are more than models.{' '}
            <span className="sys-lede-em">We engineer the systems around them.</span>
          </p>
        </header>

        <ol ref={listRef} className="sys-stages">
          <span className="sys-spine" aria-hidden="true">
            <span className="sys-spine-fill" />
          </span>

          {STAGES.map(({ id, index, tag, title, lead, body, Diagram }) => (
            <li key={id} className="sys-stage">
              <span className="sys-marker" aria-hidden="true">
                <span className="sys-marker-dot" />
              </span>

              <div className="sys-stage-text">
                <span className="sys-stage-meta">
                  <span className="sys-stage-index">{index}</span>
                  <span className="sys-stage-tag">{tag}</span>
                </span>
                <h3 className="sys-stage-title">{title}</h3>
                <p className="sys-stage-lead">{lead}</p>
                <p className="sys-stage-body">{body}</p>
              </div>

              <div className="sys-stage-viz">
                <Diagram />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

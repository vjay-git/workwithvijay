'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import portraitImg from '@/public/portrait.jpg'
import {
  RagVisual,
  AgentVisual,
  PlatformVisual,
  OrchestrationVisual,
} from './WorkVisuals'

/* ==========================================================================
   The portrait. Used twice, treated differently each time:
     hero   - art-directed editorial crop, edges dissolved into the page
     human  - a plate held far behind the type, masked on every side

   Set to null and both sections stay typographically complete on their own:
   no empty frames, no placeholders.
   ========================================================================== */
const PORTRAIT: { src: StaticImageData; alt: string } | null = {
  src: portraitImg,
  alt: 'Vijay, solution architect and principal engineer',
}

/* --------------------------------------------------------------------------
   Content.

   Assembled from copy that already exists in this repository: the four
   beliefs, the career detail, the capability blocks, the skills groups and the
   four systems on the Work page. No dates, employers, locations, links,
   credentials or metrics have been added, because none exist in the source.
   The single figure on the page (70%) is the one recorded in both
   app/projects/page.tsx and the Work page.
   -------------------------------------------------------------------------- */

/** Hero annotations. Three of these state something; STATUS is atmosphere. */
const MARKS = [
  { k: 'Identity', v: 'Engineer' },
  { k: 'Discipline', v: 'Systems' },
  { k: 'Status', v: 'Building' },
  { k: 'Focus', v: 'AI + Product' },
]

const STRIP = [
  { k: 'Builds across', v: 'RAG · Agents · Full-stack · Integration' },
  { k: 'Specializes in', v: 'AI systems · Product engineering · Architecture' },
  { k: 'Contact', v: 'hello@workwithvijay.com', href: 'mailto:hello@workwithvijay.com' },
]

/**
 * The path, forward this time - a progression only reads as one in the order it
 * happened. `year`, `role` and `org` stay absent: the repository carries three
 * incompatible date claims and no employer names. Fill them in and they render.
 */
const PATH: {
  n: string
  label: string
  focus: string
  text: string
  year?: string
  role?: string
  org?: string
  tech: string[]
}[] = [
  {
    n: '01',
    label: 'Engineering',
    focus: 'Backend engineering',
    text: 'RESTful and GraphQL APIs, concurrent systems, data integrity under load. Where the discipline of correctness was built.',
    tech: ['REST', 'GraphQL', 'Concurrency', 'PostgreSQL'],
  },
  {
    n: '02',
    label: 'Integration',
    focus: 'Enterprise integration',
    text: 'SAP, ERP and legacy system integrations. Data synchronization across boundaries. Working with constraints that billions of dollars of business logic depend on.',
    tech: ['SAP', 'ERP', 'Data pipelines'],
  },
  {
    n: '03',
    label: 'Full-stack',
    focus: 'Full-stack architecture',
    text: 'End-to-end systems from React front ends to Python and Java back ends. Designed for maintainability and real production loads, not demos.',
    tech: ['React', 'Next.js', 'TypeScript', 'Python', 'Java'],
  },
  {
    n: '04',
    label: 'AI systems',
    focus: 'AI systems & agents',
    text: 'RAG pipelines, LLM integrations and multi-agent workflows for enterprise clients. Controlled prompts, audit trails and explainable reasoning — designed for teams that need to trust their AI.',
    tech: ['RAG', 'Agents', 'LLM orchestration', 'Prompt & context engineering'],
  },
  {
    n: '05',
    label: 'Independent work',
    focus: 'COLLAB WITH VIJAY',
    text: 'A product and AI engineering studio. I lead the engineering, and a small senior team builds alongside me — no layers between the person who designs a system and the people who build it.',
    tech: ['Architecture', 'Product engineering', 'Production systems'],
  },
]

/** The four systems as written records. Their diagrams live in PROOF instead. */
const CONTRIBUTIONS: {
  n: string
  category: string
  title: string
  built: string
  why: string
  figure?: string
  impact: string
  tech?: string[]
}[] = [
  {
    n: '01',
    category: 'AI systems',
    title: 'AI Knowledge Assistant',
    built: 'Retrieval-augmented generation with controlled knowledge retrieval and answer validation.',
    why: 'Teams needed reliable answers from internal documents without hallucinations.',
    impact: 'Faster knowledge access, deployed with monitoring',
    tech: ['Next.js', 'Python', 'Vector DB', 'LLM APIs'],
  },
  {
    n: '02',
    category: 'AI systems / Automation',
    title: 'Agent-Based Workflow Automation',
    built: 'An agent-based system with explicit decision boundaries, tool access and fallback paths.',
    why: 'Multi-step processes had required manual coordination and ran inconsistently.',
    figure: '70%',
    impact: 'Less manual coordination, with full audit trails',
    tech: ['Python', 'AI agents', 'TypeScript', 'PostgreSQL'],
  },
  {
    n: '03',
    category: 'Product engineering',
    title: 'Scalable Web Platform',
    built: 'Optimized data pipelines, a caching strategy and a clean API boundary between services.',
    why: 'High traffic handling and complex business logic, without losing performance.',
    impact: 'Performance held at scale',
    tech: ['React', 'Next.js', 'TypeScript', 'Python', 'Java'],
  },
  {
    n: '04',
    category: 'Architecture / Orchestration',
    title: 'Agentic Orchestration — ATS Optimizer',
    built: 'Multi-agent orchestration that evaluates resumes, requirements and role-specific context.',
    why: 'Optimizing a resume across different roles was slow and inconsistent.',
    impact: 'Repeatable, explainable evaluation',
  },
]

/**
 * Six layers. PRODUCT carries practice rather than technology - the repository
 * records no product tooling, and inventing some so the row matched the others
 * would be padding.
 */
const DEPTH = [
  {
    n: '01',
    layer: 'Product',
    items: ['Problem framing', 'Constraints', 'Architecture decisions'],
  },
  {
    n: '02',
    layer: 'Interface',
    items: ['React', 'Next.js', 'TypeScript', 'Accessibility', 'Performance'],
  },
  {
    n: '03',
    layer: 'Application',
    items: ['Python', 'Java', 'Node.js', 'FastAPI', 'REST', 'GraphQL'],
  },
  {
    n: '04',
    layer: 'AI systems',
    items: [
      'RAG',
      'Vector databases',
      'LLM orchestration',
      'Agent workflows',
      'Prompt & context engineering',
    ],
  },
  {
    n: '05',
    layer: 'Data',
    items: ['PostgreSQL', 'Redis', 'Data pipelines', 'SAP / ERP integration'],
  },
  {
    n: '06',
    layer: 'Infrastructure',
    items: ['Scalable architecture', 'Observability', 'Security-aware design'],
  },
]

/** The labels are compressions; the statements are the recorded content. */
const PRINCIPLES = [
  {
    n: '01',
    label: 'Earn trust first',
    text: 'Systems must earn trust before they earn features.',
  },
  {
    n: '02',
    label: 'Reliability is architecture',
    text: 'Reliability is architecture — not an afterthought.',
  },
  {
    n: '03',
    label: 'Write it to be read',
    text: 'Code that cannot be read cannot be maintained.',
  },
  {
    n: '04',
    label: 'Justify every abstraction',
    text: 'Every abstraction must justify its existence.',
  },
  {
    n: '05',
    label: 'Design for production',
    text: 'Deployment, security and observability are designed with the system, not bolted on at the end.',
  },
]

const PROOF = [
  { title: 'AI Knowledge Assistant', category: 'RAG / Knowledge', Visual: RagVisual },
  { title: 'Agent-Based Workflow', category: 'Agents / Automation', Visual: AgentVisual },
  { title: 'Scalable Web Platform', category: 'Full-stack / Platform', Visual: PlatformVisual },
  { title: 'ATS Optimizer', category: 'Agents / Orchestration', Visual: OrchestrationVisual },
]

/* -------------------------------------------------------------------------- */

const sd = (i: number) => ({ ['--i' as string]: i })

export default function AboutProfile() {
  const rootRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)

  // Reveals: one observer, unobserved once fired. Nothing dims after the fact.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>('.ab-reveal'))
    if (!targets.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((t) => t.classList.add('is-in'))
      root.style.setProperty('--ab-depth', '1')
      return
    }

    root.classList.add('ab-armed')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        })
      },
      { rootMargin: '-5% 0px -12% 0px', threshold: 0 }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // One scroll pass for the three continuous effects: the portrait's parallax,
  // the ground grid's drift, and the drawn line in DEPTH.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight

      // the grid drifts a fraction of the scroll: depth you feel, not movement
      // you notice
      root.style.setProperty('--ab-grid', (window.scrollY * -0.04).toFixed(1) + 'px')

      const fig = figureRef.current
      if (fig) {
        const r = fig.getBoundingClientRect()
        // -1..1 across the viewport, so the image settles rather than slides
        const t = (r.top + r.height / 2 - vh / 2) / vh
        fig.style.setProperty(
          '--ab-por',
          (Math.max(-1, Math.min(1, t)) * 26).toFixed(1) + 'px'
        )
      }

      const d = depthRef.current
      if (d) {
        const r = d.getBoundingClientRect()
        const p = (vh * 0.72 - r.top) / Math.max(1, r.height)
        d.style.setProperty('--ab-depth', Math.max(0, Math.min(1, p)).toFixed(4))
      }
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
    <div ref={rootRef} className="ab">
      <div className="ab-ground" aria-hidden="true" />
      <div className="ab-grid" aria-hidden="true" />

      {/* ══════════════════════════════════════════ 01 · the engineer */}
      <section className="ab-hero" aria-labelledby="ab-title">
        <div className="ab-inner ab-hero-grid">
          <div className="ab-hero-text">
            <span className="ab-meta ab-reveal">
              <span className="ab-meta-index">About</span>
              <span className="ab-meta-rule" aria-hidden="true" />
              05
            </span>

            <h1 id="ab-title" className="ab-title ab-reveal">
              <span className="ab-l">The engineer</span>
              <span className="ab-l">behind the</span>
              <span className="ab-l">systems.</span>
            </h1>

            <p className="ab-intro ab-reveal">
              I&apos;m Vijay — a solution architect and principal engineer building AI
              systems and the software around them. I work across architecture, product
              engineering, and production infrastructure, with a focus on systems that
              need to work beyond the demo.
            </p>
          </div>

          {PORTRAIT && (
            <figure ref={figureRef} className="ab-figure ab-reveal">
              <div className="ab-figure-plate">
                <Image
                  src={PORTRAIT.src}
                  alt={PORTRAIT.alt}
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1080px) 30rem, 100vw"
                  className="ab-figure-img"
                  style={{ objectFit: 'cover', objectPosition: '50% 16%' }}
                />
                <span className="ab-figure-scan" aria-hidden="true" />
              </div>

              <span className="ab-figure-tick ab-figure-tick-tl" aria-hidden="true" />
              <span className="ab-figure-tick ab-figure-tick-br" aria-hidden="true" />

              <figcaption className="ab-marks">
                {MARKS.map((m, i) => (
                  <span key={m.k} className="ab-mark" style={sd(i)}>
                    <span className="ab-mark-k">{m.k}</span>
                    <span className="ab-mark-line" aria-hidden="true" />
                    <span className="ab-mark-v">{m.v}</span>
                  </span>
                ))}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="ab-inner">
          <dl className="ab-strip ab-reveal">
            {STRIP.map((s) => (
              <div key={s.k} className="ab-strip-cell">
                <dt className="ab-strip-k">{s.k}</dt>
                <dd className="ab-strip-v">
                  {s.href ? (
                    <a href={s.href} className="ab-strip-link">
                      {s.v}
                    </a>
                  ) : (
                    s.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ 02 · who I am */}
      <section className="ab-stmt" aria-labelledby="ab-stmt-title">
        <div className="ab-inner">
          <h2 id="ab-stmt-title" className="ab-stmt-title ab-reveal">
            <span className="ab-l">I don&apos;t just build</span>
            <span className="ab-l ab-quiet">features.</span>
            <span className="ab-l ab-gap">I build the</span>
            <span className="ab-l">
              <span className="ab-em">systems</span> around them.
            </span>
          </h2>

          <p className="ab-stmt-body ab-reveal">
            A feature is the part that demos. The system is everything that has to hold
            once it meets real data and real load — the retrieval boundary, the fallback
            path, the audit trail, the deployment you can roll back. That is the part I
            am actually hired for, and the part that decides whether the feature still
            works in six months.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ 03 · the path */}
      <Sec index="The path" title="How the range was built." id="path">
        <ol className="ab-path">
          {PATH.map((s, i) => (
            <li key={s.n} className="ab-stop ab-reveal" style={sd(i)}>
              <div className="ab-stop-id">
                <span className="ab-stop-n" aria-hidden="true">
                  {s.n}
                </span>
                <span className="ab-stop-label">{s.label}</span>
              </div>

              <div className="ab-stop-body">
                {(s.year || s.role || s.org) && (
                  <p className="ab-stop-head">
                    {s.year && <span className="ab-stop-year">{s.year}</span>}
                    {s.role && <span className="ab-stop-role">{s.role}</span>}
                    {s.org && <span className="ab-stop-org">{s.org}</span>}
                  </p>
                )}
                <h3 className="ab-stop-focus">{s.focus}</h3>
                <p className="ab-stop-text">{s.text}</p>
                <p className="ab-dots">
                  {s.tech.map((t, k) => (
                    <span key={t}>
                      {k > 0 && (
                        <span className="ab-sep" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ═════════════════════════════════════════ 04 · contributions */}
      <Sec index="Contributions" title="What I've contributed to." id="cons">
        <div className="ab-cons">
          {CONTRIBUTIONS.map((c, i) => (
            <article key={c.n} className="ab-con ab-reveal" style={sd(i)}>
              <div className="ab-con-head">
                <span className="ab-con-tag">
                  Contribution <span className="ab-con-tag-n">/ {c.n}</span>
                </span>
                <span className="ab-con-rule" aria-hidden="true" />
                <span className="ab-con-cat">{c.category}</span>
              </div>

              <h3 className="ab-con-title">{c.title}</h3>

              <div className="ab-con-grid">
                <Field k="Built">{c.built}</Field>
                <Field k="Why">{c.why}</Field>

                <div className="ab-con-impact">
                  <span className="ab-fk">Impact</span>
                  {/* the only figure on the page, and the only one on record */}
                  {c.figure && <span className="ab-con-figure">{c.figure}</span>}
                  <p className="ab-con-impactv">{c.impact}</p>
                </div>
              </div>

              {c.tech && (
                <p className="ab-con-tech">
                  <span className="ab-fk">Technology</span>
                  <span className="ab-con-techv">
                    {c.tech.map((t, k) => (
                      <span key={t}>
                        {k > 0 && (
                          <span className="ab-sep" aria-hidden="true">
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
          ))}
        </div>
      </Sec>

      {/* ════════════════════════════════════ 05 · engineering depth */}
      <section className="ab-depth" aria-labelledby="ab-depth-title">
        <div className="ab-inner">
          <h2 id="ab-depth-title" className="ab-depth-title ab-reveal">
            <span className="ab-l">From</span>
            <span className="ab-l ab-em">interface</span>
            <span className="ab-l ab-quiet">to</span>
            <span className="ab-l">infrastructure.</span>
          </h2>

          <div ref={depthRef} className="ab-strata">
            {/* the line draws against scroll rather than on a timer */}
            <span className="ab-strata-line" aria-hidden="true">
              <span className="ab-strata-fill" />
            </span>

            {DEPTH.map((d, i) => (
              <div key={d.n} className="ab-layer ab-reveal" style={sd(i)}>
                <span className="ab-layer-node" aria-hidden="true" />
                <span className="ab-layer-n">{d.n}</span>
                <h3 className="ab-layer-name">{d.layer}</h3>
                <p className="ab-dots ab-layer-items">
                  {d.items.map((t, k) => (
                    <span key={t}>
                      {k > 0 && (
                        <span className="ab-sep" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ 06 · principles */}
      <Sec index="How I build" title="Five rules that don't bend." id="prin">
        <ol className="ab-prins">
          {PRINCIPLES.map((p, i) => (
            <li key={p.n} className="ab-prin ab-reveal" style={sd(i)}>
              <span className="ab-prin-n" aria-hidden="true">
                {p.n}
              </span>
              <div className="ab-prin-body">
                <h3 className="ab-prin-label">{p.label}</h3>
                <p className="ab-prin-text">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="ab-note">
          <Link href="/approach" prefetch={true} className="ab-note-link">
            Approach
          </Link>{' '}
          shows where each of these lands in the process.
        </p>
      </Sec>

      {/* ════════════════════════════════════════ 07 · human element */}
      <section className="ab-human" aria-labelledby="ab-human-title">
        {PORTRAIT && (
          <div className="ab-human-plate" aria-hidden="true">
            <Image
              src={PORTRAIT.src}
              alt=""
              aria-hidden="true"
              sizes="(min-width: 1080px) 64rem, 150vw"
              className="ab-human-img"
              style={{ objectFit: 'cover', objectPosition: '50% 12%' }}
            />
          </div>
        )}

        <div className="ab-inner ab-human-inner">
          <h2 id="ab-human-title" className="ab-human-title ab-reveal">
            <span className="ab-l">The systems are</span>
            <span className="ab-l ab-quiet">technical.</span>
            <span className="ab-l ab-gap">The responsibility</span>
            <span className="ab-l">
              is <span className="ab-em">human.</span>
            </span>
          </h2>

          <p className="ab-human-body ab-reveal">
            Somebody depends on the thing being right. A retrieval system that invents an
            answer, a workflow that quietly drops a step, a platform that fails at the
            wrong moment — none of those are technical inconveniences. They are
            somebody&apos;s decision, or afternoon, or job. Controlled prompts, audit
            trails, fallback paths and explainable reasoning are how you take that
            seriously.
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════ 08 · proof */}
      <section className="ab-proof" aria-labelledby="ab-proof-title">
        <div className="ab-inner">
          <h2 id="ab-proof-title" className="ab-proof-title ab-reveal">
            <span className="ab-l">The work</span>
            <span className="ab-l">speaks too.</span>
          </h2>

          <p className="ab-proof-lede ab-reveal">
            The architecture behind each of the four systems above — written up in full
            on the Work page.
          </p>

          <ul className="ab-proofs">
            {PROOF.map(({ title, category, Visual }, i) => (
              <li key={title} className="ab-proof-item ab-reveal" style={sd(i)}>
                <Link href="/work" prefetch={true} className="ab-proof-link">
                  <span className="ab-proof-cat">{category}</span>
                  <span className="ab-proof-name">{title}</span>
                  <span className="ab-proof-vis" aria-hidden="true">
                    <Visual />
                  </span>
                  <span className="ab-proof-go" aria-hidden="true">
                    View system &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════ 09 · close */}
      <section className="ab-cta" aria-labelledby="ab-cta-title">
        <div className="ab-inner">
          <span className="ab-meta ab-reveal">
            <span className="ab-meta-index">Contact</span>
            <span className="ab-meta-rule" aria-hidden="true" />
          </span>

          <h2 id="ab-cta-title" className="ab-cta-title ab-reveal">
            <span className="ab-l">Build something</span>
            <span className="ab-l">
              that <span className="ab-em">holds up.</span>
            </span>
          </h2>

          <p className="ab-cta-lede ab-reveal">
            If you&apos;re working on a system where architecture, product, and AI need to
            come together, let&apos;s talk.
          </p>

          <div className="ab-cta-actions ab-reveal">
            <Link href="/contact" prefetch={true} className="ab-btn">
              <span className="ab-btn-label">Let&apos;s build</span>
              <span className="ab-btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>

            <Link href="/work" prefetch={true} className="ab-ghost">
              <span className="ab-ghost-text">View the work</span>
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <p className="ab-field">
      <span className="ab-fk">{k}</span>
      <span className="ab-fv">{children}</span>
    </p>
  )
}

/** A section: narrow index column against a wide content column. */
function Sec({
  index,
  title,
  id,
  children,
}: {
  index: string
  title: string
  id: string
  children: React.ReactNode
}) {
  return (
    <section className="ab-sec" aria-labelledby={'ab-h-' + id}>
      <div className="ab-inner ab-sec-inner">
        <div className="ab-sec-index ab-reveal">
          <span className="ab-index">{index}</span>
        </div>
        <div className="ab-sec-content">
          <h2 id={'ab-h-' + id} className="ab-sec-title ab-reveal">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  )
}

import ClosingSection from '@/components/ClosingSection'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-500">

      {/* ─────────────────────────────────────────────────────────
          HERO — Identity. Raw, confident, editorial.
      ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center section-padding pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">

        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-1/4 right-0 w-[55%] h-[130%] opacity-[0.025] dark:opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse at top right, #5ce1e6, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-charcoal-dark to-transparent" />
        </div>

        {/* Vertical edge label — sm+ only */}
        <div className="absolute top-1/2 right-5 sm:right-7 lg:right-10 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4 pointer-events-none">
          <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-neutral-300 dark:text-neutral-700 [writing-mode:vertical-rl] rotate-180">
            Est. 2019
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-neutral-200 dark:via-neon-cyan/20 to-transparent" />
        </div>

        <div className="container-max w-full">
          <div className="space-y-7 sm:space-y-10 lg:space-y-12">

            {/* Pre-label */}
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600">
              The engineer behind the work
            </p>

            {/* Name */}
            <div className="relative">
              <h1 className="about-name text-[17vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] font-medium text-charcoal dark:text-neutral-100 leading-[0.87] tracking-[-0.03em] relative">
                <span className="relative z-10 block">Vijay</span>
                <span className="absolute inset-0 about-name-glow opacity-0 dark:opacity-100 pointer-events-none" />
              </h1>
            </div>

            {/* Role + tagline */}
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <p className="about-role text-lg sm:text-2xl md:text-3xl font-normal text-neutral-600 dark:text-neutral-300 leading-snug">
                Solution Architect &{' '}
                <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.35)]">
                  Principal Engineer
                </span>
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Five years designing and building AI systems and full-stack
                applications that operate in production. Serious engineering
                for serious problems.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 sm:gap-x-14 gap-y-5">
              {[
                { value: '5+', label: 'Years Building' },
                { value: 'AI', label: 'Systems & Agents' },
                { value: '∞',  label: 'Production First' },
              ].map((s) => (
                <div key={s.label} className="space-y-1.5">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-charcoal dark:text-neon-cyan tracking-tight dark:drop-shadow-[0_0_14px_rgba(92,225,230,0.3)]">
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark rounded-lg font-medium text-sm sm:text-base transition-all duration-150 hover:opacity-90 dark:hover:shadow-neon-glow"
              >
                Start a project
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center sm:justify-start text-sm sm:text-base text-neutral-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neon-cyan transition-colors duration-200 border border-neutral-200 dark:border-neutral-700 sm:border-0 rounded-lg sm:rounded-none px-4 py-3.5 sm:px-0 sm:py-0 sm:border-b sm:border-transparent sm:hover:border-neutral-300 dark:sm:hover:border-neon-cyan/40 sm:pb-0.5"
              >
                See the work →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          BELIEFS — The manifesto. What drives every decision.
          Single separator: border-t in light / neon pseudo in dark
      ───────────────────────────────────────────────────────── */}
      <section className="section-padding py-20 sm:py-28 lg:py-36 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="container-max">

          <p className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600 mb-12 sm:mb-16">
            What I believe
          </p>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {[
              'Systems must earn trust before they earn features.',
              'Reliability is architecture — not an afterthought.',
              'Code that cannot be read cannot be maintained.',
              'Every abstraction must justify its existence.',
            ].map((belief, i) => (
              <div
                key={i}
                className="group flex items-start gap-5 sm:gap-8 lg:gap-10 py-7 sm:py-9 lg:py-11"
              >
                <span className="shrink-0 text-xs font-mono font-medium text-neutral-300 dark:text-neutral-700 pt-1 sm:pt-2 tabular-nums">
                  0{i + 1}
                </span>
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-charcoal dark:text-neutral-100 leading-[1.2] tracking-tight group-hover:dark:text-neon-cyan transition-colors duration-500">
                  {belief}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          EXPERIENCE — Visual timeline.
          Single separator: border-t in light / neon pseudo in dark
      ───────────────────────────────────────────────────────── */}
      <section className="section-padding py-20 sm:py-28 lg:py-36 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="container-max">

          <div className="grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-10 lg:gap-20 xl:gap-24">

            {/* Left label */}
            <div className="lg:pt-1.5">
              <p className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600 mb-2">
                How I got here
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-charcoal dark:text-neutral-100">
                Experience
              </h2>
            </div>

            {/* Right: Timeline */}
            <div>
              {[
                {
                  period: 'Now',
                  focus: 'AI Systems & Agents',
                  detail:
                    'Building RAG pipelines, LLM integrations, and multi-agent workflows for enterprise clients. Controlled prompts, audit trails, and explainable reasoning — designed for teams that need to trust their AI.',
                },
                {
                  period: '3 – 5 yrs',
                  focus: 'Full-Stack Architecture',
                  detail:
                    'End-to-end systems from React frontends to Python and Java backends. Designed for maintainability and real production loads — not demos.',
                },
                {
                  period: '1 – 3 yrs',
                  focus: 'Enterprise Integration',
                  detail:
                    'SAP, ERP, and legacy system integrations. Data synchronisation across boundaries. Working with constraints that billions of dollars of business logic depend on.',
                },
                {
                  period: 'Foundation',
                  focus: 'Backend Engineering',
                  detail:
                    'RESTful and GraphQL APIs, concurrent systems, data integrity under load. Where the discipline of correctness was built.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative pl-7 sm:pl-10 pb-10 sm:pb-12 last:pb-0 border-l border-neutral-200 dark:border-neutral-800 last:border-transparent"
                >
                  {/* Node */}
                  <div className="absolute -left-[5px] top-0.5 w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neon-cyan/50 ring-4 ring-white dark:ring-charcoal-dark" />

                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                      {item.period}
                    </p>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-charcoal dark:text-neutral-100">
                      {item.focus}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          CAPABILITIES — The four areas. Scannable, specific.
          Single separator: border-t in light / neon pseudo in dark
      ───────────────────────────────────────────────────────── */}
      <section className="section-padding py-20 sm:py-28 lg:py-36 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="container-max">

          <div className="mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600 mb-2 sm:mb-3">
              What I build
            </p>
            <h2 className="about-section-title text-xl sm:text-2xl md:text-4xl font-medium text-charcoal dark:text-neutral-100 relative">
              <span className="relative z-10">Capability areas</span>
              <span className="absolute inset-0 about-title-underline opacity-0 dark:opacity-100" />
            </h2>
          </div>

          {/* 2×2 grid — single col on mobile, two col on sm+ */}
          <div className="grid sm:grid-cols-2 gap-px bg-neutral-100 dark:bg-neutral-800/40 rounded-2xl overflow-hidden">
            {[
              {
                num: '01',
                title: 'AI Systems & RAG Pipelines',
                text: 'Retrieval-augmented generation that answers from enterprise documents. LLM integration with controlled prompts, clear context boundaries, and fallback mechanisms.',
                tags: ['Python', 'LangChain', 'Vector DBs', 'LLMs', 'Agents'],
              },
              {
                num: '02',
                title: 'Full-Stack Architecture',
                text: 'End-to-end systems from interface to database. React, Next.js, TypeScript frontend. Python, Java or Node.js backend. Architecture that supports growth without rewrites.',
                tags: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
              },
              {
                num: '03',
                title: 'Backend Systems & APIs',
                text: 'RESTful and GraphQL APIs designed for clarity and reliability. Concurrent systems that maintain data integrity under load and fail predictably.',
                tags: ['FastAPI', 'Java', 'GraphQL', 'PostgreSQL', 'Redis'],
              },
              {
                num: '04',
                title: 'System Design & Integration',
                text: 'Designing systems that integrate with existing infrastructure. SAP and ERP integrations, data synchronisation across boundaries, solutions that respect legacy constraints.',
                tags: ['SAP', 'ERP', 'System Design', 'APIs', 'Legacy'],
              },
            ].map((cap) => (
              <div
                key={cap.num}
                className="about-capability-item bg-white dark:bg-charcoal-dark p-6 sm:p-8 lg:p-10 space-y-4 group"
              >
                <span className="block text-xs font-mono font-medium text-neutral-300 dark:text-neutral-700">
                  {cap.num}
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-medium text-charcoal dark:text-neutral-100 leading-tight group-hover:dark:text-neon-cyan transition-colors duration-500 relative">
                  <span className="relative z-10">{cap.title}</span>
                  <span className="absolute inset-0 about-capability-glow opacity-0 dark:opacity-100 pointer-events-none" />
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {cap.text}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/70 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          CLOSING — Personal. Direct. No noise.
          Single separator: border-t in light / neon pseudo in dark
      ───────────────────────────────────────────────────────── */}
      <ClosingSection className="section-padding py-20 sm:py-28 lg:py-36 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="container-max">
          <div className="max-w-3xl space-y-8 sm:space-y-10">

            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 leading-[1.2] tracking-tight">
              If you need systems that are{' '}
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.25)]">
                built correctly
              </span>
              , maintained clearly, and scaled reliably — let&apos;s work together.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark rounded-lg font-medium text-sm sm:text-base transition-all duration-150 hover:opacity-90 dark:hover:shadow-neon-glow"
              >
                Start a conversation
              </Link>
              <Link
                href="/approach"
                className="inline-flex items-center justify-center sm:justify-start text-sm sm:text-base text-neutral-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neon-cyan transition-colors duration-200 border border-neutral-200 dark:border-neutral-700 sm:border-0 rounded-lg px-4 py-3.5 sm:px-0 sm:py-0"
              >
                Read the approach →
              </Link>
            </div>

          </div>
        </div>
      </ClosingSection>

    </div>
  )
}

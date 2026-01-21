import ApproachScrollContent from '@/components/ApproachScrollContent'
import ClosingSection from '@/components/ClosingSection'

const principles = [
    {
      title: 'How we think',
      highlight: 'think',
      description: [
        'We work at the intersection of software engineering and AI. Every system we build — whether it\'s a traditional web application or an AI-powered knowledge assistant — needs to be reliable, explainable, and production-ready.',
        'We don\'t build demos or experiments. We build systems that teams can trust, maintain, and scale.',
      ],
    },
    {
      title: 'Engineering discipline',
      highlight: 'Engineering',
      description: [
        'We write code that makes sense months later. We think about how features fit into the bigger picture, not just what works right now. We consider tradeoffs, edge cases, and long-term maintenance from the start.',
        'Every system includes error handling, observability, and clear documentation. No shortcuts, no technical debt, no surprises.',
      ],
    },
    {
      title: 'Production-first mindset',
      highlight: 'Production-first',
      description: [
        'We design systems for production from day one. That means security, scalability, and observability are built in, not added later.',
        'For AI systems, this means controlled prompts, clear context boundaries, fallback mechanisms, and audit trails. For web applications, it means clean architecture, secure APIs, and scalable infrastructure.',
      ],
    },
    {
      title: 'Systems thinking',
      highlight: 'Systems',
      description: [
        'We understand that every system is part of a larger context. We think about how components interact, how data flows, and how the system will evolve. We design for change, not just for today.',
      ],
    },
  ]

export default function Approach() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-500">
      {/* Zone A — Opening Philosophy */}
      <section className="section-padding px-8 sm:px-6 pt-20 pb-20 sm:pt-24 sm:pb-32 lg:pt-24 lg:pb-40 xl:pt-24 xl:pb-48">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8 services-zone-a">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.1] tracking-tight">
                How we{' '}
                <br className="hidden sm:block" />
                <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.15)]">
                  approach systems
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                These are not methodologies. They are principles, revealed in sequence.
                <br className="hidden sm:block" />
                <span className="text-base sm:text-lg text-neutral-500 dark:text-neutral-500 mt-2 block">
                  Scroll to explore each principle.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone B — Principles */}
      <section className="relative">
        <div className="container-max">
          <div className="max-w-4xl mx-auto px-8 sm:px-6 lg:px-0">
            <ApproachScrollContent principles={principles} />
          </div>
        </div>
      </section>

      {/* Zone C — Closing Philosophy */}
      <ClosingSection className="section-padding px-8 sm:px-6 py-20 sm:py-32 lg:py-40 xl:py-48">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              These principles guide every system we build.
              <br className="hidden sm:block" />
              They are not{' '}
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.2)]">
                optional
              </span>
              .
            </p>
          </div>
        </div>
      </ClosingSection>
    </div>
  )
}

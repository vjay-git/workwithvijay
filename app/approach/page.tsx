import ApproachScrollContent from '@/components/ApproachScrollContent'
import ClosingSection from '@/components/ClosingSection'
import { AnimatedDataFlow, AnimatedSystemLayers, AnimatedNeuralNetwork, AnimatedCodeFlow } from '@/components/ApproachAnimations'

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
      {/* Zone A — Opening Philosophy with Animated Visuals */}
      <section className="section-padding px-8 sm:px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            {/* Header Content */}
            <div className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
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

            {/* Animated Visuals Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/30 dark:to-neutral-800/20">
                <AnimatedDataFlow className="w-full max-w-[120px] sm:max-w-[140px]" />
                <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                  Data Flow
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/30 dark:to-neutral-800/20">
                <AnimatedSystemLayers className="w-full max-w-[120px] sm:max-w-[140px]" />
                <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                  Architecture
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/30 dark:to-neutral-800/20">
                <AnimatedNeuralNetwork className="w-full max-w-[120px] sm:max-w-[140px]" />
                <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                  AI Systems
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/30 dark:to-neutral-800/20">
                <AnimatedCodeFlow className="w-full max-w-[120px] sm:max-w-[140px]" />
                <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                  Engineering
                </p>
              </div>
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

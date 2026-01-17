import ServicesScrollContent from '@/components/ServicesScrollContent'
import ClosingSection from '@/components/ClosingSection'

const modes = [
    {
      phase: 'First',
      title: 'The Interface',
      subtitle: 'Where systems meet people',
      description:
        'Every system begins with how it presents itself. The interface is not decoration—it is the first contract between intention and experience. We build interfaces that feel inevitable, where every interaction reinforces purpose.',
      examples: 'Marketing sites, portfolio experiences, brand-driven web.',
    },
    {
      phase: 'Second',
      title: 'The Operations',
      subtitle: 'Where systems sustain themselves',
      description:
        'Behind every interface lives the machinery of operations. This is where systems prove their worth—not in moments of launch, but in the daily rhythm of use. We build operational platforms that anticipate need and reduce friction.',
      examples: 'Management systems, admin dashboards, internal tools.',
    },
    {
      phase: 'Third',
      title: 'The Product',
      subtitle: 'Where systems become essential',
      description:
        'A product is a system that users return to. It is not a feature set—it is a relationship. We build products that become indispensable by solving problems so completely that alternatives feel unnecessary.',
      examples: 'SaaS platforms, custom applications, scalable systems.',
    },
    {
      phase: 'Beyond',
      title: 'The Unmapped',
      subtitle: 'Where systems define new categories',
      description:
        'The most interesting work exists where categories break down. When requirements don\'t fit existing patterns, that\'s where new systems are born. We build solutions that don\'t yet have names.',
      examples: 'Tailored solutions, evolving requirements, new product ideas.',
    },
  ]

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-500">
      {/* Zone A — Opening Philosophy */}
      <section className="section-padding px-8 sm:px-6 py-20 sm:py-32 lg:py-40 xl:py-48">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8 services-zone-a">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.1] tracking-tight">
                How we think about{' '}
                <br className="hidden sm:block" />
                <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.15)]">
                  building systems
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                These are not services. They are modes of thinking, revealed in sequence.
                <br className="hidden sm:block" />
                <span className="text-base sm:text-lg text-neutral-500 dark:text-neutral-500 mt-2 block">
                  Scroll to explore each lens.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone B — Modes of Thinking */}
      <section className="relative">
        <div className="container-max">
          <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-0">
            <ServicesScrollContent modes={modes} />
          </div>
        </div>
      </section>

      {/* Zone C — Closing Philosophy */}
      <ClosingSection className="section-padding px-8 sm:px-6 py-20 sm:py-32 lg:py-40 xl:py-48">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              If your system doesn't fit these categories,
              <br className="hidden sm:block" />
              that's usually where we do our{' '}
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.2)]">
                best work
              </span>
              .
            </p>
          </div>
        </div>
      </ClosingSection>
    </div>
  )
}

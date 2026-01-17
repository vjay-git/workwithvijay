import ClosingSection from '@/components/ClosingSection'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-500">
      {/* Presence Section — Editorial, Asymmetrical */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Photo — Large, asymmetrical, material-like */}
        <div className="absolute inset-0 -right-[25%] sm:-right-[20%] md:-right-[15%] lg:-right-[10%] xl:-right-[5%] w-[70%] sm:w-[60%] md:w-[55%] lg:w-[50%] xl:w-[45%] h-full">
          <div className="about-photo w-full h-full" />
        </div>

        {/* Text Content — Typography-led, asymmetrical */}
        <div className="relative z-10 section-padding py-20 sm:py-32 lg:py-40 xl:py-48 w-full">
          <div className="container-max">
            <div className="max-w-2xl lg:max-w-3xl ml-0 lg:ml-8 xl:ml-16">
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                {/* Name — Large, quiet, confident */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-medium text-charcoal dark:text-neutral-100 leading-[0.92] tracking-[-0.02em]">
                  Vijay
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  {/* Role — Secondary, not subtitle-styled */}
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 font-normal leading-tight">
                    Solution Architect & Principal Engineer
                  </p>
                  {/* Experience — Contextual, not highlighted */}
                  <p className="text-base sm:text-lg md:text-xl text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-xl">
                    Designing and building AI and full-stack systems for the last five years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="section-padding py-20 sm:py-32 lg:py-40 xl:py-48">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                How systems are approached
              </h2>
              <div className="space-y-6 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  Systems are designed for correctness first. Every decision begins with understanding what the system must do, how it must behave, and what can go wrong. This clarity informs architecture, implementation, and maintenance.
                </p>
                <p>
                  Reliability is built in from the start, not added later. Error handling, observability, and graceful degradation are architectural decisions, not afterthoughts. Systems must operate correctly under expected conditions and fail predictably when conditions change.
                </p>
                <p>
                  Clarity over complexity. Code should explain itself. Documentation should explain why, not just what. Future maintainers should understand decisions, not just implementations.
                </p>
                <p>
                  Every abstraction, every pattern, every dependency must earn its place. Simple systems are easier to reason about, easier to test, and easier to change. Complexity that doesn't serve a purpose is removed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience — Narrative Form */}
      <section className="section-padding py-20 sm:py-32 lg:py-40 xl:py-48 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                Experience
              </h2>
              <div className="space-y-6 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  Over the last five years, I've designed and built AI systems that operate on real business data. RAG pipelines that provide accurate answers from enterprise documents. Agent workflows that automate complex processes. Systems that make decisions with clear audit trails and explainable reasoning.
                </p>
                <p>
                  I've architected full-stack applications from interface to database. Systems where the frontend and backend are designed together, where data flows are intentional, and where the architecture supports both current needs and future growth.
                </p>
                <p>
                  I've worked in production environments where systems must operate reliably under load. Where errors must be handled gracefully. Where observability is essential for understanding system behavior. Where deployments must not disrupt operations.
                </p>
                <p>
                  I've integrated with enterprise systems, handled data synchronization across boundaries, and maintained consistency where it matters. I've worked with legacy systems that businesses depend on daily, understanding their constraints and designing solutions that respect them.
                </p>
                <p>
                  The focus has always been on building systems that are correct, reliable, and maintainable. Systems that teams can trust, that scale when needed, and that remain clear as they evolve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Areas */}
      <section className="section-padding py-20 sm:py-32 lg:py-40 xl:py-48 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                Capability areas
              </h2>
              <div className="space-y-10 sm:space-y-12">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-charcoal dark:text-neutral-100 mb-4">
                    AI systems & RAG pipelines
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Retrieval-augmented generation systems that provide accurate answers from enterprise documents. Agent workflows that automate complex processes. LLM integration with controlled prompts, clear context boundaries, and fallback mechanisms. Systems built with Python, using frameworks like LangChain where appropriate, designed for explainability and auditability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-charcoal dark:text-neutral-100 mb-4">
                    Full-stack application architecture
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    End-to-end system design from user interface to data persistence. React and Next.js for frontend systems. TypeScript for type safety across the stack. Backend services in Python, Java, or Node.js depending on requirements. PostgreSQL or MongoDB for data persistence. Architecture that supports maintainability, testability, and scalability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-charcoal dark:text-neutral-100 mb-4">
                    Backend systems & APIs
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    RESTful and GraphQL APIs designed for clarity and reliability. Systems that handle concurrent operations, maintain data integrity under load, and scale without requiring fundamental rewrites. Clean architecture, secure endpoints, and infrastructure that supports growth.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-charcoal dark:text-neutral-100 mb-4">
                    System design & integration
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Designing systems that integrate with existing infrastructure. Data synchronization across system boundaries. Working with enterprise systems and legacy platforms. Solutions that respect constraints while delivering value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <ClosingSection className="section-padding py-20 sm:py-32 lg:py-40 xl:py-48 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              If you need systems that are{' '}
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.2)]">
                built correctly
              </span>
              , maintained clearly, and scaled reliably, let's work together.
            </p>
          </div>
        </div>
      </ClosingSection>
    </div>
  )
}

'use client'

import Hero from '@/components/Hero'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import ParallaxBackground from '@/components/ParallaxBackground'
import ParallaxLayer from '@/components/ParallaxLayer'

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Parallax Background Layers - Only visible in dark mode */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none z-0">
        <ParallaxBackground />
      </div>

      {/* Content - Above parallax layers */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

      {/* What We Do - Capability Snapshot */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-white dark:bg-charcoal-dark transition-colors duration-300 relative"
      >
        {/* Parallax Decorative Separator */}
        <ParallaxLayer speed={0.02} mobileSpeed={0.006} className="absolute top-0 left-0 right-0 h-px pointer-events-none">
          <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent dark:opacity-100 opacity-0"></div>
        </ParallaxLayer>
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-16 lg:mb-20 text-center tracking-tight">
              What we do
            </h2>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Product Engineering
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Full stack applications with production-grade architecture. Secure APIs, scalable infrastructure, and complete ownership from frontend to backend.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">Enterprise AI</span>{' '}& Data Systems
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  RAG pipelines, vector databases, and controlled LLM integrations designed for enterprise data. Built for accuracy, security, and real-world use.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  SAP AI Chatbots
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Natural language interfaces to SAP data. Convert questions to SQL queries with safety guardrails, access controls, and enterprise-ready deployment.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  AI Agents & Automation
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Agent-based workflows that automate complex processes. Clear decision boundaries, fallback mechanisms, and comprehensive audit trails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Flagship Solution - SAP Data Chatbot */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 relative"
      >
        {/* Parallax Decorative Separator */}
        <ParallaxLayer speed={0.018} mobileSpeed={0.005} className="absolute top-0 left-0 right-0 h-px pointer-events-none">
          <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent dark:opacity-100 opacity-0"></div>
        </ParallaxLayer>
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-500 dark:text-neon-cyan/60 uppercase tracking-wider">
                Flagship Solution
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-12 lg:mb-16 leading-tight tracking-tight">
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.3)]">SAP Data Chatbot</span>
            </h2>
            <div className="space-y-10 lg:space-y-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 mb-4 leading-tight">
                  Problem
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                  SAP data is hard to access. Business users need answers from complex ERP systems, but SQL queries require technical expertise. Traditional reporting tools are slow and inflexible.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 mb-4 leading-tight">
                  Solution
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                  Natural language interface that converts questions to SQL queries. Built with safety guardrails, access controls, query validation, and explainable results. Enterprise-ready deployment with monitoring and audit trails.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 mb-4 leading-tight">
                  Enterprise Ready
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                  Security-first design with role-based access, query sanitization, and result filtering. Production monitoring, error handling, and compliance-ready architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How We Work - Trust Builder */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-white dark:bg-charcoal-dark transition-colors duration-300 relative dark:before:content-[''] dark:before:absolute dark:before:top-0 dark:before:left-0 dark:before:right-0 dark:before:h-[1px] dark:before:bg-gradient-to-r dark:before:from-transparent dark:before:via-neon-cyan/30 dark:before:to-transparent"
      >
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-16 lg:mb-20 text-center tracking-tight">
              How we work
            </h2>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Production-first mindset
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  We design systems for production from day one. Security, scalability, and observability are built in, not added later.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  System design over demos
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  We don't build experiments. We build systems that teams can trust, maintain, and scale in real production environments.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Security & guardrails
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Every AI system includes access controls, input validation, output filtering, and audit trails. Safety is not optional.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Ownership & reliability
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  We take responsibility for outcomes. Clear communication, comprehensive documentation, and long-term support are standard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Proof of Seriousness */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 relative"
      >
        {/* Parallax Decorative Separator */}
        <ParallaxLayer speed={0.016} mobileSpeed={0.005} className="absolute top-0 left-0 right-0 h-px pointer-events-none">
          <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent dark:opacity-100 opacity-0"></div>
        </ParallaxLayer>
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-12 lg:mb-16 text-center tracking-tight">
              Built for{' '}<span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">enterprise</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
              We work with enterprise data, SAP systems, and production environments. Our AI systems include guardrails, access controls, and monitoring built in.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                  Enterprise Data
                </p>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Secure handling of sensitive business data with proper access controls and audit trails.
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                  SAP Systems
                </p>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Direct integration with SAP ERP systems, understanding complex data models and business logic.
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                  AI Guardrails
                </p>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Query validation, result filtering, and safety mechanisms to prevent errors and unauthorized access.
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                  Production Ready
                </p>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Systems designed for 24/7 operation with monitoring, error handling, and scalability built in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact / CTA */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-white dark:bg-charcoal-dark transition-colors duration-300 relative"
      >
        {/* Parallax Decorative Separator */}
        <ParallaxLayer speed={0.02} mobileSpeed={0.006} className="absolute top-0 left-0 right-0 h-px pointer-events-none">
          <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent dark:opacity-100 opacity-0"></div>
        </ParallaxLayer>
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-8 lg:mb-10 leading-tight tracking-tight">
              Let's discuss your{' '}<span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.3)]">system</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12 lg:mb-16 max-w-xl mx-auto">
              Whether you're exploring AI features, scaling an existing system, or building something new, we help teams build intelligent products that are reliable, explainable, and production-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                href="/contact"
                prefetch={true}
                className="inline-block px-10 py-4 sm:py-5 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark rounded-lg font-medium text-base sm:text-lg transition-all duration-150 hover:opacity-90 dark:hover:shadow-neon-glow touch-manipulation min-h-[52px] flex items-center justify-center"
              >
                Get in touch
              </Link>
              <Link
                href="/work"
                prefetch={true}
                className="inline-block px-10 py-4 sm:py-5 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-neutral-200 rounded-lg font-medium text-base sm:text-lg transition-all duration-150 hover:border-charcoal dark:hover:border-neon-cyan hover:bg-neutral-50 dark:hover:bg-neutral-900 touch-manipulation min-h-[52px] flex items-center justify-center"
              >
                View our work
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
      </div>
    </div>
  )
}

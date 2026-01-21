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
              Full Stack AI Applications
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
              We build complete AI-powered applications from frontend to backend. Every project leverages the latest technologies and best practices for production-ready systems.
            </p>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">RAG Systems</span> & Knowledge Bases
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Retrieval-augmented generation systems with vector databases, semantic search, and controlled LLM integration. Built for accuracy, context awareness, and enterprise security.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">AI Agents</span> & Workflows
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Multi-agent systems with orchestration, decision boundaries, and autonomous workflows. Includes fallback mechanisms, error handling, and comprehensive audit trails.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">Enterprise Integrations</span>
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Natural language interfaces to enterprise systems, text-to-SQL conversion, and secure data access. SAP, ERP, and database integrations with safety guardrails.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">Modern Tech Stack</span>
                </h3>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Next.js, React, TypeScript, Python, FastAPI, PostgreSQL, vector databases, and cloud infrastructure. We use the latest tools and frameworks for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack & Approach */}
      <AnimatedSection
        className="section-fade section-padding py-24 sm:py-32 lg:py-40 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 relative"
      >
        {/* Parallax Decorative Separator */}
        <ParallaxLayer speed={0.018} mobileSpeed={0.005} className="absolute top-0 left-0 right-0 h-px pointer-events-none">
          <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent dark:opacity-100 opacity-0"></div>
        </ParallaxLayer>
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-12 lg:mb-16 text-center tracking-tight">
              Built with <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.3)]">Latest Technologies</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
              We stay current with the latest frameworks, libraries, and AI tools to deliver cutting-edge solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Frontend
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                  <li>Next.js 14+ (App Router)</li>
                  <li>React 18+ with TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Server Components</li>
                  <li>Modern UI patterns</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Backend & AI
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                  <li>Python & FastAPI</li>
                  <li>LLM APIs (OpenAI, Anthropic)</li>
                  <li>Vector databases (Pinecone, Weaviate)</li>
                  <li>LangChain & LlamaIndex</li>
                  <li>REST & GraphQL APIs</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                  Infrastructure
                </h3>
                <ul className="space-y-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                  <li>PostgreSQL & Redis</li>
                  <li>Cloud deployment (AWS, Vercel)</li>
                  <li>Docker & containerization</li>
                  <li>CI/CD pipelines</li>
                  <li>Monitoring & observability</li>
                </ul>
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
              From RAG systems to AI agents, from enterprise integrations to custom applications—we build full-stack AI solutions using the latest technologies. Let's discuss your project.
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

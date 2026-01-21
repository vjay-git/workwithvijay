'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger animation on mount - use requestAnimationFrame for immediate visibility
    requestAnimationFrame(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('hero-visible')
      }
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="hero-section section-padding pt-10 pb-20 sm:pt-12 sm:pb-28 md:pt-12 md:pb-32 lg:pt-12 lg:pb-40"
      aria-label="Introduction"
    >
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Identity - Primary */}
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.05] mb-8 sm:mb-10 lg:mb-12 tracking-tight">
            Product & <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.3)]">AI Engineering Studio</span>
          </h1>

          {/* Secondary - Capabilities */}
          <p className="hero-capability text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-10 leading-relaxed">
            Modern tech stack · <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_4px_rgba(92,225,230,0.2)]">RAG systems</span> · AI agents · LLM integrations · Vector databases · Production-ready architecture
          </p>

          {/* Value - What we do */}
          <p className="hero-value text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-12 sm:mb-16 leading-relaxed max-w-2xl">
            We build end-to-end AI applications using the latest technologies. From intelligent frontends to scalable backends, we deliver production-ready systems that solve real business problems.
          </p>

          {/* Primary Actions - Thumb-reachable */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/contact"
              prefetch={true}
              className="hero-cta-primary inline-block text-center px-10 py-4 sm:py-5 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark rounded-lg font-medium text-base sm:text-lg transition-all duration-150 hover:opacity-90 dark:hover:shadow-neon-glow touch-manipulation min-h-[52px] flex items-center justify-center"
              aria-label="Discuss your system"
            >
              Discuss your system
            </Link>
            <Link
              href="/work"
              prefetch={true}
              className="hero-cta-secondary inline-block text-center px-10 py-4 sm:py-5 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-neutral-200 rounded-lg font-medium text-base sm:text-lg transition-all duration-150 hover:border-charcoal dark:hover:border-neon-cyan hover:bg-neutral-50 dark:hover:bg-neutral-900 touch-manipulation min-h-[52px] flex items-center justify-center"
              aria-label="View our work"
            >
              View our work
            </Link>
          </div>

          {/* Subtle About Link - Elegant, integrated with neon animations */}
          <div className="hero-actions mt-8 sm:mt-10 flex items-center">
            <Link
              href="/about"
              prefetch={true}
              className="group about-engineer-link inline-flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neon-cyan transition-all duration-300 relative pl-0.5"
              aria-label="About the engineer"
            >
              <span className="relative border-b border-transparent group-hover:border-neutral-400 dark:group-hover:border-neon-cyan/40 dark:group-hover:shadow-[0_1px_4px_rgba(92,225,230,0.2)] transition-all duration-300 pb-0.5 leading-relaxed">
                <span className="relative z-10">About the engineer</span>
                <span className="absolute inset-0 about-engineer-shimmer opacity-0 dark:group-hover:opacity-100"></span>
              </span>
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 dark:group-hover:text-neon-cyan dark:group-hover:drop-shadow-[0_0_4px_rgba(92,225,230,0.4)] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

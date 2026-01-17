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
      className="hero-section section-padding py-20 sm:py-28 md:py-32 lg:py-40"
      aria-label="Introduction"
    >
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Identity - Primary */}
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.05] mb-8 sm:mb-10 lg:mb-12 tracking-tight">
            Product Engineering & <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.3)]">Enterprise AI</span>
          </h1>

          {/* Secondary - Capabilities */}
          <p className="hero-capability text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-10 leading-relaxed">
            Full stack development · SAP data intelligence · Text-to-SQL · <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_4px_rgba(92,225,230,0.2)]">RAG & AI agents</span>
          </p>

          {/* Value - What we do */}
          <p className="hero-value text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-12 sm:mb-16 leading-relaxed max-w-2xl">
            We build production-ready systems for teams that need reliable AI, secure data access, and scalable architecture.
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

          {/* Subtle About Link - Elegant, integrated */}
          <div className="hero-actions mt-8 sm:mt-10">
            <Link
              href="/about"
              prefetch={true}
              className="group inline-flex items-center gap-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-colors duration-150"
              aria-label="About the engineer"
            >
              <span className="border-b border-transparent group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors duration-300">
                About the engineer
              </span>
              <svg
                className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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

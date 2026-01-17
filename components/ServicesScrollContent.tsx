'use client'

import { useEffect, useRef, useState } from 'react'

interface Mode {
  phase: string
  title: string
  subtitle: string
  description: string
  examples: string
}

interface ServicesScrollContentProps {
  modes: Mode[]
}

export default function ServicesScrollContent({ modes }: ServicesScrollContentProps) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex: number | null = null
      let closestDistance = Infinity

      // Check all scroll-driven sections (index 1+)
      sectionRefs.current.forEach((ref, refIndex) => {
        if (!ref) return

        const rect = ref.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        const isInViewport = rect.bottom > 0 && rect.top < window.innerHeight

        if (isInViewport && distance < closestDistance) {
          closestDistance = distance
          closestIndex = refIndex
        }
      })

      setFocusedIndex(closestIndex)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    setTimeout(handleScroll, 100)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="space-y-[40vh] sm:space-y-[50vh] md:space-y-[60vh] lg:space-y-[70vh] xl:space-y-[80vh] py-20 sm:py-32">
      {/* First Section — Static, immutable */}
      <article className="service-mode service-mode-first">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          <div className="opacity-100">
            <div className="flex items-center gap-4 sm:gap-6 mb-4">
              <span className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 dark:text-neon-cyan/40">
                {modes[0].phase}
              </span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800 dark:bg-gradient-to-r dark:from-transparent dark:via-neon-cyan/10 dark:to-transparent"></div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.1] tracking-tight">
              The{' '}
              <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.25)]">
                {modes[0].title.replace('The ', '')}
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 italic">
              {modes[0].subtitle}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {modes[0].description}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-500 pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {modes[0].examples}
            </p>
          </div>
        </div>
      </article>

      {/* Scroll-driven sections (1+) */}
      {modes.slice(1).map((mode, index) => {
        const refIndex = index
        const isFocused = focusedIndex === refIndex
        const isBefore = focusedIndex !== null && refIndex < focusedIndex
        const isAfter = focusedIndex !== null && refIndex > focusedIndex

        let opacity = 1
        let scale = 1
        let blur = 0

        if (isFocused) {
          opacity = 1
          scale = 1
          blur = 0
        } else if (isBefore) {
          opacity = 0.3
          scale = 0.97
          blur = 1
        } else if (isAfter) {
          opacity = 0.2
          scale = 0.95
          blur = 2.5
        } else {
          opacity = 0.25
          scale = 0.96
          blur = 1.5
        }

        return (
          <article
            key={index + 1}
            ref={(el) => {
              sectionRefs.current[refIndex] = el
            }}
            className="service-mode"
            style={{
              opacity,
              transform: `scale(${scale})`,
              filter: blur > 0 ? `blur(${blur}px)` : 'none',
            }}
          >
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              <div
                className={`services-phase-indicator ${
                  isFocused ? 'services-phase-visible' : 'services-phase-hidden'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6 mb-4">
                  <span className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 dark:text-neon-cyan/40">
                    {mode.phase}
                  </span>
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800 dark:bg-gradient-to-r dark:from-transparent dark:via-neon-cyan/10 dark:to-transparent"></div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-charcoal dark:text-neutral-100 leading-[1.1] tracking-tight">
                  The{' '}
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.25)]">
                    {mode.title.replace('The ', '')}
                  </span>
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 italic">
                  {mode.subtitle}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 max-w-3xl">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {mode.description}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-500 pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {mode.examples}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

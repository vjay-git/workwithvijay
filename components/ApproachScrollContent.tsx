'use client'

import { useEffect, useRef, useState } from 'react'
import { HowWeThinkDiagram, EngineeringDisciplineDiagram, ProductionFirstDiagram, SystemsThinkingDiagram } from './ApproachDiagrams'

interface Principle {
  title: string
  highlight: string
  description: string[]
}

interface ApproachScrollContentProps {
  principles: Principle[]
}

const diagramComponents = [
  HowWeThinkDiagram,
  EngineeringDisciplineDiagram,
  ProductionFirstDiagram,
  SystemsThinkingDiagram,
]

export default function ApproachScrollContent({ principles }: ApproachScrollContentProps) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex: number | null = null
      let closestDistance = Infinity

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
    <div className="space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-48 py-20 sm:py-32">
      {/* First Principle — Static, immutable */}
      <div className="relative">
        <article className="service-mode service-mode-first">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                How we{' '}
                <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">
                  {principles[0].highlight}
                </span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {principles[0].description.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end order-first md:order-last">
              <div className="w-full max-w-sm">
                {(() => {
                  const DiagramComponent = diagramComponents[0]
                  return <DiagramComponent className="w-full h-auto opacity-90 dark:opacity-100" />
                })()}
              </div>
            </div>
          </div>
        </article>
        
        {/* Boundary Line after first section */}
        <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 left-0 right-0 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/20 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-400 dark:bg-neon-cyan/40 rounded-full"></div>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-neutral-300 dark:bg-neon-cyan/30 rounded-full"></div>
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-neutral-300 dark:bg-neon-cyan/30 rounded-full"></div>
        </div>
      </div>

      {/* Scroll-driven principles (1+) */}
      {principles.slice(1).map((principle, index) => {
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
          opacity = 0.35
          scale = 0.97
          blur = 1
        } else if (isAfter) {
          opacity = 0.22
          scale = 0.95
          blur = 2.5
        } else {
          opacity = 0.28
          scale = 0.96
          blur = 1.5
        }

        const DiagramComponent = diagramComponents[index + 1]

        return (
          <div key={index + 1} className="relative">
            {/* Stylish Boundary Line */}
            <div className="absolute -top-12 sm:-top-16 md:-top-20 left-0 right-0 h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/20 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-400 dark:bg-neon-cyan/40 rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-neutral-300 dark:bg-neon-cyan/30 rounded-full"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 bg-neutral-300 dark:bg-neon-cyan/30 rounded-full"></div>
            </div>
            
            <article
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
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 sm:space-y-8 lg:space-y-10 order-2 md:order-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                    <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">
                      {principle.highlight}
                    </span>{' '}
                    {principle.title.replace(principle.highlight, '').trim()}
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    {principle.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start order-1 md:order-2 mb-6 md:mb-0">
                  <div 
                    className="w-full max-w-sm transition-opacity duration-700"
                    style={{
                      opacity: isFocused ? 1 : 0.6,
                    }}
                  >
                    <DiagramComponent className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}

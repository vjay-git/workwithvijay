'use client'

import { useEffect, useRef, useState } from 'react'

interface Principle {
  title: string
  highlight: string
  description: string[]
}

interface ApproachScrollContentProps {
  principles: Principle[]
}

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
    <div className="space-y-[35vh] sm:space-y-[45vh] md:space-y-[50vh] lg:space-y-[60vh] xl:space-y-[70vh] py-20 sm:py-32">
      {/* First Principle — Static, immutable */}
      <article className="service-mode service-mode-first">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
            How we{' '}
            <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">
              {principles[0].highlight}
            </span>
          </h2>
          <div className="space-y-4 sm:space-y-6 max-w-3xl">
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
      </article>

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
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-charcoal dark:text-neutral-100 leading-tight">
                <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">
                  {principle.highlight}
                </span>{' '}
                {principle.title.replace(principle.highlight, '').trim()}
              </h2>
              <div className="space-y-4 sm:space-y-6 max-w-3xl">
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
          </article>
        )
      })}
    </div>
  )
}

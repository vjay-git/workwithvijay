'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollDrivenSectionsProps {
  children: (focusedIndex: number | null) => ReactNode
  sectionCount: number
}

export default function ScrollDrivenSections({ children, sectionCount }: ScrollDrivenSectionsProps) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex: number | null = null
      let closestDistance = Infinity

      // Check all scroll-driven sections
      sectionRefs.current.forEach((ref, refIndex) => {
        if (!ref) return

        const rect = ref.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        // Section is in viewport if any part is visible
        const isInViewport = rect.bottom > 0 && rect.top < window.innerHeight

        if (isInViewport && distance < closestDistance) {
          closestDistance = distance
          closestIndex = refIndex
        }
      })

      setFocusedIndex(closestIndex)
    }

    // Throttle scroll events
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

    // Initial check after mount
    setTimeout(handleScroll, 100)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      {Array.from({ length: sectionCount }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el
          }}
        >
          {children(focusedIndex)}
        </div>
      ))}
    </>
  )
}

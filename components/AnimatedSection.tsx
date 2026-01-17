'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

export default function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ref = sectionRef.current
    if (!ref) return

    // Check if element is already in viewport (above fold)
    const rect = ref.getBoundingClientRect()
    const isAboveFold = rect.top < window.innerHeight + 100

    // If above fold, make visible immediately
    if (isAboveFold) {
      ref.classList.add('section-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px -100px 0px',
      }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={className}>
      {children}
    </section>
  )
}

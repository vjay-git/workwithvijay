'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface AnimatedDivProps {
  children: ReactNode
  className?: string
}

export default function AnimatedDiv({ children, className = '' }: AnimatedDivProps) {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ref = divRef.current
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
    <div ref={divRef} className={className}>
      {children}
    </div>
  )
}

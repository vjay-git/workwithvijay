'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ClosingSectionProps {
  children: ReactNode
  className?: string
}

export default function ClosingSection({ children, className = '' }: ClosingSectionProps) {
  const closingRef = useRef<HTMLElement | null>(null)
  const [closingVisible, setClosingVisible] = useState(false)

  useEffect(() => {
    if (!closingRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setClosingVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(closingRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={closingRef} className={className}>
      <div
        className={`services-zone-c ${closingVisible ? 'services-zone-c-visible' : ''}`}
      >
        {children}
      </div>
    </section>
  )
}

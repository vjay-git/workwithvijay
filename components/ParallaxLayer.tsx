'use client'

import { useEffect, useRef } from 'react'

interface ParallaxLayerProps {
  children: React.ReactNode
  speed: number // 0.01 to 0.08 (1% to 8%)
  className?: string
  mobileSpeed?: number // Reduced speed for mobile (default: 30% of speed)
}

export default function ParallaxLayer({
  children,
  speed,
  className = '',
  mobileSpeed,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReducedMotion = prefersReducedMotionMedia.matches
    
    if (prefersReducedMotion) {
      return
    }

    const layer = layerRef.current
    if (!layer) return

    // Determine if mobile (reduce parallax strength)
    const isMobile = window.innerWidth < 768
    const effectiveSpeed = isMobile ? (mobileSpeed ?? speed * 0.3) : speed

    let ticking = false

    const updateParallax = () => {
      if (!layer) return

      const rect = layer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate element's position relative to viewport
      const elementTop = rect.top
      const elementHeight = rect.height
      const elementCenter = elementTop + elementHeight / 2
      const viewportCenter = windowHeight / 2
      
      // Calculate distance from viewport center
      const distanceFromCenter = elementCenter - viewportCenter
      
      // Apply parallax offset (vertical only)
      const offset = distanceFromCenter * effectiveSpeed
      
      // Use transform3d for hardware acceleration
      layer.style.transform = `translate3d(0, ${offset}px, 0)`
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    // Initial calculation
    updateParallax()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateParallax, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateParallax)
      // Reset transform on cleanup
      if (layer) {
        layer.style.transform = ''
      }
    }
  }, [speed, mobileSpeed])

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

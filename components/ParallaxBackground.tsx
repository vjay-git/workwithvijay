'use client'

import ParallaxLayer from './ParallaxLayer'

interface ParallaxBackgroundProps {
  className?: string
}

/**
 * ParallaxBackground - Creates layered background parallax effect
 * Represents computational depth: data layers, processing layers, system abstraction
 */
export default function ParallaxBackground({ className = '' }: ParallaxBackgroundProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Background Layer - Deepest (4-6% speed) */}
      <ParallaxLayer speed={0.05} mobileSpeed={0.015}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-dark to-charcoal-dark"></div>
      </ParallaxLayer>

      {/* Mid Layer - Light Field 1 (2-3% speed) */}
      <ParallaxLayer speed={0.025} mobileSpeed={0.008}>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-neon-cyan/3 blur-3xl"></div>
      </ParallaxLayer>

      {/* Foreground Layer - Light Field 2 (1-2% speed) */}
      <ParallaxLayer speed={0.015} mobileSpeed={0.005}>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-neon-cyan/2 blur-3xl"></div>
      </ParallaxLayer>
    </div>
  )
}

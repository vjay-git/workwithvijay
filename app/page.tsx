'use client'

import Hero from '@/components/Hero'
import IntroGate from '@/components/experience/IntroGate'
import SystemMap from '@/components/SystemMap'
import StackField from '@/components/StackField'
import MethodLedger from '@/components/MethodLedger'
import ClosingCall from '@/components/ClosingCall'
import ParallaxBackground from '@/components/ParallaxBackground'

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* The cinematic entrance. Renders nothing unless it decides to play, and
          never gates the hero below it - see components/experience/IntroGate. */}
      <IntroGate />

      {/* Parallax Background Layers - Only visible in dark mode */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none z-0">
        <ParallaxBackground />
      </div>

      {/* Content - Above parallax layers */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

      {/* The System - the hero environment continued downward */}
      <SystemMap />

      {/* The Stack - one layer deeper than The System */}
      <StackField />

      {/* Method - the operating layer (the old "How we work" and
          "Built for enterprise" grids, consolidated) */}
      <MethodLedger />

      {/* Closing - the signal terminates */}
      <ClosingCall />

      </div>
    </div>
  )
}

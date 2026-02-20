'use client'

import { useEffect, useRef, useState } from 'react'
import { RAGSystemDiagram, AgentWorkflowDiagram, ScalableArchitectureDiagram, ATSOrchestratorDiagram } from '@/components/SystemDiagrams'

interface System {
  name: string
  problem: string
  outcome: string
  diagram: React.ComponentType<{ className?: string }>
}

const systems: System[] = [
  {
    name: 'AI Knowledge Assistant',
    problem: 'Teams needed accurate answers from internal documents without hallucinations.',
    outcome: 'Reliable answers, reduced search time by 60%, production-ready deployment with monitoring.',
    diagram: RAGSystemDiagram,
  },
  {
    name: 'Agent-Based Workflow Automation',
    problem: 'Complex multi-step processes required manual coordination and were error-prone.',
    outcome: 'Automated workflows reduced manual work by 70%, improved accuracy, and maintained full audit trails.',
    diagram: AgentWorkflowDiagram,
  },
  {
    name: 'Scalable Web Platform',
    problem: 'Application needed to handle high traffic and complex business logic while maintaining performance.',
    outcome: 'Handled 10x traffic growth, reduced page load times by 40%, maintained 99.9% uptime.',
    diagram: ScalableArchitectureDiagram,
  },
  {
    name: 'Agentic Orchestration Platform — ATS Optimizer',
    problem: 'Job seekers struggled to get resumes past ATS filters — manual keyword matching was slow, inconsistent, and left candidates guessing.',
    outcome: 'Multi-agent system parses, scores, and rewrites resumes automatically. Candidates receive ATS-ready output with explainable scoring in seconds.',
    diagram: ATSOrchestratorDiagram,
  },
]

export default function Work() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
    <div className="min-h-screen bg-white dark:bg-charcoal-dark transition-colors duration-300 relative">
      {/* Subtle background light field — Dark mode only */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-neon-cyan/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-neon-cyan/2 blur-3xl"></div>
      </div>
      <div className="relative z-10">
        {/* Opening Section — Compact Context */}
        <section className="section-padding pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div className="container-max">
            <div className="max-w-4xl">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light tracking-tight">
                Each engagement solves a real operational or intelligence problem.
              </p>
            </div>
          </div>
        </section>

        {/* Work as Systems — Primary Section */}
        <section className="section-padding py-8 sm:py-12 md:py-16">
          <div className="container-max">
            <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
              {systems.map((system, index) => {
                const isFocused = focusedIndex === index
                const isHovered = hoveredIndex === index
                const DiagramComponent = system.diagram

                // Subtle focus effect - less dramatic
                const opacity = isFocused || isHovered ? 1 : 0.85
                const scale = isFocused || isHovered ? 1 : 0.98

                return (
                  <article
                    key={index}
                    ref={(el) => {
                      sectionRefs.current[index] = el
                    }}
                    className="work-system transition-all duration-700 ease-out"
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                      willChange: 'opacity, transform',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onTouchStart={() => setHoveredIndex(index)}
                    onTouchEnd={() => setHoveredIndex(null)}
                  >
                    {/* Visual Background Field */}
                    <div className="relative mb-8 sm:mb-10 md:mb-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/30 rounded-xl sm:rounded-2xl -z-10"></div>
                      
                      {/* Two-column layout: Text + Visual */}
                      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12">
                        {/* Left: Text Content */}
                        <div className="flex flex-col justify-center order-2 md:order-1">
                          {/* System Name */}
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 leading-[1.05] tracking-tight mb-5 sm:mb-6 md:mb-8">
                            <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.25)]">
                              {system.name}
                            </span>
                          </h2>

                          {/* Problem Context */}
                          <div className="mb-5 sm:mb-6 md:mb-8">
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2.5 sm:mb-3 md:mb-4 tracking-widest uppercase">
                              Problem
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {system.problem}
                            </p>
                          </div>

                          {/* Outcome — Always visible, subtle emphasis on focus */}
                          <div
                            className={`transition-all duration-500 ease-out ${
                              isFocused || isHovered
                                ? 'opacity-100'
                                : 'opacity-90'
                            }`}
                          >
                            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2.5 sm:mb-3 md:mb-4 tracking-widest uppercase">
                              Outcome
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {system.outcome}
                            </p>
                          </div>
                        </div>

                        {/* Right: System Diagram */}
                        <div className="flex items-center justify-center md:justify-end order-1 md:order-2 mb-4 md:mb-0">
                          <div
                            className={`transition-all duration-700 ease-out w-full max-w-xs sm:max-w-sm ${
                              isFocused || isHovered
                                ? 'opacity-100 scale-100'
                                : 'opacity-70 scale-95'
                            }`}
                          >
                            <DiagramComponent className="w-full h-auto" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Separator */}
                    {index < systems.length - 1 && (
                      <div className="pt-8 sm:pt-10 md:pt-12 relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-300 dark:bg-neon-cyan/20 rounded-full"></div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Closing Section — Trust Signal */}
        <section className="section-padding pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-20 sm:pb-24 md:pb-32 lg:pb-40">
          <div className="container-max">
            <div className="max-w-4xl">
              <div className="pt-12 sm:pt-16 md:pt-20 border-t border-neutral-200 dark:border-neutral-800 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neon-cyan/20 to-transparent"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-400 dark:bg-neon-cyan/40 rounded-full"></div>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  We enjoy solving problems that require{' '}
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.2)]">
                    deep technical understanding
                  </span>
                  ,{' '}
                  <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.2)]">
                    architectural clarity
                  </span>
                  , and systems that work reliably in production.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import AnimatedDiv from '@/components/AnimatedDiv'

interface Project {
  title: string
  problem: string
  system: string
  outcome: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: 'AI Knowledge Assistant (RAG System)',
    problem: 'Teams needed accurate answers from internal documents without hallucinations.',
    system: 'Built a retrieval-augmented generation pipeline using embeddings, vector search, and controlled LLM prompts with clear context boundaries.',
    outcome: 'Reliable answers, reduced search time by 60%, production-ready deployment with monitoring.',
    technologies: ['Python', 'LLM APIs', 'Vector DB', 'Next.js'],
  },
  {
    title: 'Agent-Based Workflow Automation',
    problem: 'Complex multi-step processes required manual coordination and were error-prone.',
    system: 'Designed and implemented an agent-based system with clear decision boundaries, fallback mechanisms, and comprehensive audit trails.',
    outcome: 'Automated workflows reduced manual work by 70%, improved accuracy, and maintained full audit trails.',
    technologies: ['Python', 'AI Agents', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Scalable Web Platform',
    problem: 'Application needed to handle high traffic and complex business logic while maintaining performance.',
    system: 'Built a scalable architecture with optimized data pipelines, caching strategies, clean API design, and observability built-in.',
    outcome: 'Handled 10x traffic growth, reduced page load times by 40%, maintained 99.9% uptime.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'Java'],
  },
]

export default function Work() {
  return (
    <div className="section-padding px-8 sm:px-6 py-16 lg:py-24 bg-white dark:bg-charcoal-dark transition-colors duration-300">
      <div className="container-max">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal dark:text-neutral-100 mb-12">
            Work
          </h1>

          <div className="space-y-12 lg:space-y-16">
            {projects.map((project, index) => (
              <AnimatedDiv
                key={index}
                className="section-fade"
              >
                <article className="border-b border-neutral-200 dark:border-neutral-800 pb-12 last:border-b-0 last:pb-0 transition-colors duration-300 relative dark:before:content-[''] dark:before:absolute dark:before:bottom-0 dark:before:left-0 dark:before:right-0 dark:before:h-[1px] dark:before:bg-gradient-to-r dark:before:from-transparent dark:before:via-neon-cyan/20 dark:before:to-transparent">
                <h2 className="text-xl sm:text-2xl font-medium text-charcoal dark:text-neutral-100 mb-6">
                  {index === 0 ? (
                    <>
                      <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">AI Knowledge Assistant</span>{' '}(RAG System)
                    </>
                  ) : index === 1 ? (
                    <>
                      <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">Agent-Based</span>{' '}Workflow Automation
                    </>
                  ) : (
                    <>
                      <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_6px_rgba(92,225,230,0.25)]">Scalable</span>{' '}Web Platform
                    </>
                  )}
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-charcoal dark:text-neutral-200 mb-2">Problem</p>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal dark:text-neutral-200 mb-2">System</p>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.system}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal dark:text-neutral-200 mb-2">Outcome</p>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 dark:border dark:border-neutral-800 rounded-sm transition-colors duration-300"
                    >
                      {tech}
                    </span>
                    ))}
                </div>
                </article>
              </AnimatedDiv>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 transition-colors duration-300 relative dark:before:content-[''] dark:before:absolute dark:before:top-0 dark:before:left-0 dark:before:right-0 dark:before:h-[1px] dark:before:bg-gradient-to-r dark:before:from-transparent dark:before:via-neon-cyan/20 dark:before:to-transparent">
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every project is different, but our approach is consistent: understand the problem, 
              design the right architecture, and deliver systems that are <span className="dark:text-neon-cyan dark:drop-shadow-[0_0_4px_rgba(92,225,230,0.2)]">reliable, explainable, and production-ready</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

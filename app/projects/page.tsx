import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies and project outcomes from Full Stack & AI Systems Engineer work. Real results, production-ready applications including RAG systems, AI agents, and LLM-powered applications.',
}

interface Project {
  title: string
  problem: string
  solution: string
  outcome: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: 'AI Knowledge Assistant (RAG System)',
    problem: 'Teams needed accurate answers from internal documents without hallucinations.',
    solution: 'Built a retrieval-augmented generation pipeline using embeddings, vector search, and controlled LLM prompts.',
    outcome: 'Reliable answers, reduced search time, production-ready deployment.',
    technologies: ['Python', 'LLM APIs', 'Vector DB', 'Next.js'],
  },
  {
    title: 'Agent-Based Workflow Automation',
    problem: 'Complex multi-step processes required manual coordination and were error-prone.',
    solution: 'Designed and implemented an agent-based system with clear decision boundaries and fallback mechanisms.',
    outcome: 'Automated workflows reduced manual work by 70%, improved accuracy, and maintained audit trails.',
    technologies: ['Python', 'AI Agents', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Scalable Web Platform',
    problem: 'Application needed to handle high traffic and complex business logic while maintaining performance.',
    solution: 'Built a scalable architecture with optimized data pipelines, caching strategies, and clean API design.',
    outcome: 'Handled 10x traffic growth, reduced page load times by 40%, maintained 99.9% uptime.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'Java'],
  },
]

export default function Projects() {
  return (
    <div className="section-padding pt-20 pb-16 sm:pt-24 sm:pb-16 lg:pt-24 lg:pb-24">
      <div className="container-max">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal mb-12">
            Projects
          </h1>

          <div className="space-y-12 lg:space-y-16">
            {projects.map((project, index) => (
              <article
                key={index}
                className="border-b border-neutral-200 pb-12 last:border-b-0 last:pb-0"
              >
                <h2 className="text-xl sm:text-2xl font-medium text-charcoal mb-6">
                  {project.title}
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-2">Problem</p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-2">Solution</p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-2">Outcome</p>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm text-neutral-600 bg-neutral-100 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-neutral-200">
            <p className="text-base text-neutral-600 leading-relaxed">
              Every project is different, but the approach is consistent: understand the problem, 
              design the right architecture, and deliver systems that are reliable, explainable, and production-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

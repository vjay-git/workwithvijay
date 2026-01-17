import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills and expertise: Frontend Engineering, Backend & Systems, AI & Intelligent Systems, Product & Reliability. Full Stack & AI Systems Engineer capabilities.',
}

interface SkillGroup {
  title: string
  description?: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    description: 'React, Next.js, TypeScript',
    skills: [
      'Performance optimization',
      'Accessibility',
      'Mobile-first design',
    ],
  },
  {
    title: 'Backend & Systems',
    description: 'Python, Java',
    skills: [
      'API design',
      'Authentication & authorization',
      'Data pipelines',
    ],
  },
  {
    title: 'AI & Intelligent Systems',
    description: 'Production AI systems',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'Vector databases',
      'LLM orchestration',
      'Agent-based workflows',
      'Prompt & context engineering',
    ],
  },
  {
    title: 'Product & Reliability',
    skills: [
      'Scalable architecture',
      'Error handling & observability',
      'Security-aware design',
    ],
  },
]

export default function Skills() {
  return (
    <div className="section-padding py-16 lg:py-24">
      <div className="container-max">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal mb-12">
            Skills
          </h1>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium text-charcoal mb-1">{group.title}</h2>
                  {group.description && (
                    <p className="text-sm text-neutral-500">{group.description}</p>
                  )}
                </div>
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-base text-neutral-600"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-neutral-200">
            <p className="text-base text-neutral-600 leading-relaxed">
              These capabilities span from user interfaces to intelligent backends. The focus is always on systems that are reliable, explainable, and production-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

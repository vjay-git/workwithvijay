import type { Metadata } from 'next'
import WorkArchive from '@/components/WorkArchive'

export const metadata: Metadata = {
  title: 'AI Projects & Case Studies — RAG, Agents, Platforms',
  description:
    'Selected AI projects: RAG knowledge systems, AI agents, orchestration and production platforms built around real operational and product problems.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'AI Projects & Case Studies — RAG, Agents, Platforms',
    description: 'Selected AI projects: RAG knowledge systems, AI agents, orchestration and production platforms built around real operational and product problems.',
    url: '/work',
    images: ['/opengraph-image'],
  },
}

export default function Work() {
  return <WorkArchive />
}

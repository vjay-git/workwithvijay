import type { Metadata } from 'next'
import AboutProfile from '@/components/AboutProfile'

export const metadata: Metadata = {
  title: 'About Vijay — AI & Full-Stack Engineer',
  description:
    'Meet Vijay, the engineer behind COLLAB WITH VIJAY: AI systems, RAG, AI agents, full-stack architecture, backend APIs and enterprise integration.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Vijay — AI & Full-Stack Engineer',
    description: 'Meet Vijay, the engineer behind COLLAB WITH VIJAY: AI systems, RAG, AI agents, full-stack architecture, backend APIs and enterprise integration.',
    url: '/about',
    images: ['/opengraph-image'],
  },
}

export default function About() {
  return <AboutProfile />
}

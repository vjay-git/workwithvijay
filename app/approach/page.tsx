import type { Metadata } from 'next'
import ApproachProcess from '@/components/ApproachProcess'

export const metadata: Metadata = {
  title: 'How We Build AI Products — Engineering Approach',
  description:
    'The engineering process behind every AI system we build: discover, architect, build, validate, ship and evolve — so AI projects reach production.',
  alternates: { canonical: '/approach' },
  openGraph: {
    title: 'How We Build AI Products — Engineering Approach',
    description: 'The engineering process behind every AI system we build: discover, architect, build, validate, ship and evolve — so AI projects reach production.',
    url: '/approach',
    images: ['/opengraph-image'],
  },
}

export default function Approach() {
  return <ApproachProcess />
}

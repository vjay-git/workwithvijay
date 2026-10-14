import type { Metadata } from 'next'
import ServicesLayers from '@/components/ServicesLayers'

export const metadata: Metadata = {
  title: 'AI Engineering Services — RAG, Agents, Chatbots, Full-Stack',
  description:
    'AI engineering services across four layers: interface, intelligence (RAG, AI agents, LLM systems), operations and infrastructure. Built for production.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Engineering Services — RAG, Agents, Chatbots, Full-Stack',
    description: 'AI engineering services across four layers: interface, intelligence (RAG, AI agents, LLM systems), operations and infrastructure. Built for production.',
    url: '/services',
    images: ['/opengraph-image'],
  },
}

export default function Services() {
  return <ServicesLayers />
}

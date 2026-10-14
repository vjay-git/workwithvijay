import type { Metadata } from 'next'
import ContactConsole from '@/components/ContactConsole'

export const metadata: Metadata = {
  title: "Contact — Start Your AI Project",
  description:
    "Planning an AI project? Tell us what you're building — RAG, AI agents, chatbots or LLM apps. Email or WhatsApp Vijay directly.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: "Contact — Start Your AI Project",
    description: "Planning an AI project? Tell us what you're building — RAG, AI agents, chatbots or LLM apps. Email or WhatsApp Vijay directly.",
    url: '/contact',
    images: ['/opengraph-image'],
  },
}

export default function Contact() {
  return <ContactConsole />
}

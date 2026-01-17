import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: {
    default: 'Work With Vijay | Product & AI Engineering Studio',
    template: '%s | workwithvijay.com',
  },
  description: 'Product and AI engineering studio specializing in full stack development, RAG systems, and AI agents. A small, senior team that builds serious systems.',
  keywords: [
    'Product Engineering',
    'AI Engineering',
    'RAG Systems',
    'AI Agents',
    'Full Stack Development',
    'LLM Engineering',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Python Developer',
    'Java Developer',
    'Engineering Studio',
    'AI Systems',
    'Retrieval-Augmented Generation',
  ],
  authors: [{ name: 'Work With Vijay' }],
  creator: 'Work With Vijay',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://workwithvijay.com',
    siteName: 'workwithvijay.com',
    title: 'Work With Vijay | Product & AI Engineering Studio',
    description: 'Product and AI engineering studio specializing in full stack development, RAG systems, and AI agents.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work With Vijay | Product & AI Engineering Studio',
    description: 'Product and AI engineering studio specializing in full stack development, RAG systems, and AI agents.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
  icons: {
    icon: '/wwv.png',
    shortcut: '/wwv.png',
    apple: '/wwv.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured data - Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Work With Vijay',
              url: 'https://workwithvijay.com',
              description: 'Product and AI engineering studio specializing in full stack development, RAG systems, and AI agents.',
              foundingDate: '2024',
              knowsAbout: [
                'Product Engineering',
                'Full Stack Development',
                'RAG Systems',
                'Retrieval-Augmented Generation',
                'AI Agents',
                'LLM Engineering',
                'AI Systems',
                'React',
                'Next.js',
                'TypeScript',
                'Python',
                'Java',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-50 text-charcoal dark:bg-charcoal-dark dark:text-neutral-100 transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-14 md:pt-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

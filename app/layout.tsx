import type { Metadata } from 'next'
import { SITE_HOST, SITE_URL } from '@/lib/site'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Display grotesk for the hero's architectural typography. Tight apertures and
// low stroke contrast hold up at 200px+ where a UI font falls apart.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

// Real mono for system metadata / telemetry - the interface voice.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // Without metadataBase, Next resolves relative OG/Twitter asset URLs against
  // localhost in dev and warns in build. It is also the anchor every canonical
  // in the app derives from.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'COLLAB WITH VIJAY | Product & AI Engineering Studio',
    template: `%s | ${SITE_HOST}`,
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
  authors: [{ name: 'COLLAB WITH VIJAY' }],
  creator: 'COLLAB WITH VIJAY',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_HOST,
    title: 'COLLAB WITH VIJAY | Product & AI Engineering Studio',
    description: 'Product and AI engineering studio specializing in full stack development, RAG systems, and AI agents.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COLLAB WITH VIJAY | Product & AI Engineering Studio',
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
    icon: '/mark.png',
    shortcut: '/mark.png',
    apple: '/mark.png',
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
              name: 'COLLAB WITH VIJAY',
              url: SITE_URL,
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
      <body className={`${archivo.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-neutral-50 text-charcoal dark:bg-charcoal-dark dark:text-neutral-100 transition-colors duration-300`}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

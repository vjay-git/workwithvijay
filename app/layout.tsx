import type { Metadata } from 'next'
import {
  CONTACT_EMAIL,
  SITE_CITY,
  SITE_COUNTRY,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
  WHATSAPP_NUMBER,
} from '@/lib/site'
import { SERVICES } from '@/lib/services'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import SiteCursor from '@/components/SiteCursor'
import WhatsAppBadge from '@/components/WhatsAppBadge'

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

const DEFAULT_TITLE = 'AI Development Services — RAG, AI Agents & LLM Apps | COLLAB WITH VIJAY'
const DEFAULT_DESCRIPTION =
  'Hire a senior AI engineering studio to build RAG systems, AI agents, custom AI chatbots and LLM applications that are ready for production. Based in Hyderabad, working worldwide.'

export const metadata: Metadata = {
  // Without metadataBase, Next resolves relative OG/Twitter asset URLs against
  // localhost in dev and warns in build. It is also the anchor every canonical
  // in the app derives from.
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Vijay', url: `${SITE_URL}/about` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  // No `alternates.canonical` here on purpose: set in the root layout it would
  // be inherited by every page that forgets its own and point them all at the
  // home page. Each page declares its own.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
  // Google Search Console "HTML tag" verification. Set the env var on Netlify
  // to the content="..." value Search Console gives you, then redeploy.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    // The C from the wordmark and its cyan dot. SVG first so it stays sharp at
    // every tab size; the PNG is the fallback for browsers that skip SVG icons.
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '256x256' },
    ],
    shortcut: '/favicon.png',
    // Opaque ground: iOS composites transparency onto black, which would eat
    // the mark's rounded corners.
    apple: '/apple-icon.png',
  },
}

// Site-wide structured data. The business node carries the contact details so
// Google can show them, and every service page points its provider at its @id.
const SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: 'Collab With Vijay',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: DEFAULT_DESCRIPTION,
      slogan: 'AI products built for production.',
      email: CONTACT_EMAIL,
      telephone: `+${WHATSAPP_NUMBER}`,
      // City-level address, no street: the studio has no public office, and
      // Google accepts locality-only addresses for service-area businesses.
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CITY,
        addressRegion: SITE_REGION,
        addressCountry: SITE_COUNTRY,
      },
      areaServed: [
        { '@type': 'City', name: SITE_CITY },
        { '@type': 'Country', name: 'India' },
        'Worldwide',
      ],
      founder: { '@id': `${SITE_URL}/#vijay` },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        telephone: `+${WHATSAPP_NUMBER}`,
        url: `${SITE_URL}/contact`,
        availableLanguage: ['English'],
      },
      knowsAbout: [
        'AI Development',
        'Retrieval-Augmented Generation',
        'RAG Systems',
        'AI Agents',
        'AI Chatbots',
        'LLM Applications',
        'Text-to-SQL',
        'Workflow Automation',
        'Full Stack Development',
        'Next.js',
        'Python',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI engineering services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            url: `${SITE_URL}/services/${s.slug}`,
          },
        })),
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#vijay`,
      name: 'Vijay',
      jobTitle: 'AI & Full-Stack Engineer',
      url: `${SITE_URL}/about`,
      worksFor: { '@id': `${SITE_URL}/#business` },
      homeLocation: { '@type': 'Place', name: `${SITE_CITY}, India` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#business` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured data - business, founder and website for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SITE_SCHEMA),
          }}
        />
      </head>
      <body className={`${archivo.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-neutral-50 text-charcoal dark:bg-charcoal-dark dark:text-neutral-100 transition-colors duration-300`}>
        <ThemeProvider>
          {/* One cursor for the whole site, above every other plane. */}
          <SiteCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppBadge />
        </ThemeProvider>
      </body>
    </html>
  )
}

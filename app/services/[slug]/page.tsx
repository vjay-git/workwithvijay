import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, getService } from '@/lib/services'
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from '@/lib/site'

/**
 * One landing page per searched-for service. Fully static and server-rendered:
 * every word is in the first HTML response, which is the whole point of these
 * pages. Styling lives under .svc in globals.css and borrows the hero's tokens.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) return {}
  const path = `/services/${service.slug}`
  return {
    // absolute: these titles are written as complete search titles already.
    title: { absolute: service.title },
    description: service.description,
    alternates: { canonical: path },
    // A segment's openGraph replaces the parent's wholesale, image included.
    openGraph: {
      title: service.title,
      description: service.description,
      url: path,
      images: ['/opengraph-image'],
    },
    twitter: { title: service.title, description: service.description },
  }
}

export default async function ServiceLanding({ params }: Props) {
  const service = getService((await params).slug)
  if (!service) notFound()

  const url = `${SITE_URL}/services/${service.slug}`
  const others = SERVICES.filter((s) => s.slug !== service.slug)
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Vijay, I found your ${service.name} page and I'd like to talk about a project.`,
  )}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.description,
        url,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: 'Worldwide',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <article className="svc">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="svc-inner">
        <nav className="svc-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.name}</span>
        </nav>

        <header className="svc-head">
          <h1 className="svc-title">{service.h1}</h1>
          <p className="svc-lede">{service.lede}</p>
          <div className="svc-actions">
            <Link href="/contact" className="svc-cta">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <a href={wa} className="svc-ghost" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <section className="svc-section" aria-labelledby="svc-for">
          <h2 id="svc-for" className="svc-h2">
            <span className="svc-index">01</span>Is this you?
          </h2>
          <ul className="svc-problems">
            {service.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="svc-section" aria-labelledby="svc-get">
          <h2 id="svc-get" className="svc-h2">
            <span className="svc-index">02</span>What we build
          </h2>
          <ol className="svc-deliverables">
            {service.deliverables.map((d) => (
              <li key={d.name}>
                <h3>{d.name}</h3>
                <p>{d.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="svc-section" aria-labelledby="svc-stack">
          <h2 id="svc-stack" className="svc-h2">
            <span className="svc-index">03</span>Typical stack
          </h2>
          <ul className="svc-stack">
            {service.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="svc-note">
            See how this comes together in <Link href="/work">selected work</Link> and the{' '}
            <Link href="/approach">engineering approach</Link>.
          </p>
        </section>

        <section className="svc-section" aria-labelledby="svc-faq">
          <h2 id="svc-faq" className="svc-h2">
            <span className="svc-index">04</span>Questions
          </h2>
          <div className="svc-faqs">
            {service.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="svc-close" aria-labelledby="svc-close">
          <h2 id="svc-close" className="svc-close-title">
            Tell us what you&apos;re building.
          </h2>
          <p className="svc-lede">
            A short message is enough to start. You&apos;ll hear back from Vijay directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(service.name + ' enquiry')}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <div className="svc-actions">
            <Link href="/contact" className="svc-cta">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <a href={wa} className="svc-ghost" target="_blank" rel="noopener noreferrer">
              WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <nav className="svc-related" aria-label="Related services">
          <p className="svc-index">More from {SITE_NAME}</p>
          <ul>
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name} →</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}

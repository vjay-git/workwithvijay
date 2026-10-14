import Link from 'next/link'
import Logo from './Logo'
import { CONTACT_EMAIL, SITE_HOST } from '@/lib/site'
import { SERVICES } from '@/lib/services'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100 dark:bg-charcoal-dark border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="container-max section-padding py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Logo - smaller, quieter, signature-like */}
            <Logo size="sm" className="opacity-70 dark:opacity-90" />
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <p>© {currentYear} {SITE_HOST}</p>
              <p className="mt-1">Product & AI Engineering Studio</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 inline-block hover:text-charcoal dark:hover:text-neutral-200 transition-subtle"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          {/* Crawlable links to every service landing page, from every page. */}
          <nav aria-label="Services">
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-subtle"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer navigation">
            <div className="flex space-x-6">
              <Link
                href="/"
                prefetch={true}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-subtle"
              >
                Home
              </Link>
              <Link
                href="/about"
                prefetch={true}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-subtle"
              >
                About
              </Link>
              <Link
                href="/contact"
                prefetch={true}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-subtle"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}

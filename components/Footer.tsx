import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100 dark:bg-charcoal-dark border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="container-max section-padding py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-3">
            {/* Logo - smaller, quieter, signature-like */}
            <Logo size="sm" variant="footer" className="opacity-70 dark:opacity-90" />
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <p>© {currentYear} workwithvijay.com</p>
              <p className="mt-1">Product & AI Engineering Studio</p>
            </div>
          </div>
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

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Approach', href: '/approach' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  // Handle scroll behavior: subtle recede on scroll down, reappear on scroll up (like gravity)
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = currentScrollY - lastScrollY

          // Check if scrolled past threshold - controls logo centering
          setIsScrolled(currentScrollY > 10)

          // Subtle recede on scroll down, reappear on scroll up
          if (scrollDelta > 0 && currentScrollY > 100) {
            // Scrolling down past threshold - subtly recede (never fully hide)
            setIsVisible(false)
          } else if (scrollDelta < 0 || currentScrollY < 50) {
            // Scrolling up or near top - fully visible
            setIsVisible(true)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Premium navbar - psychological anchor, floating pane of glass */}
      <header 
        className={`sticky top-0 left-0 right-0 z-30 transition-all duration-200 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-85 translate-y-[-4px]'
        }`}
      >
        <nav
          className={`relative border-b transition-all duration-200 ease-out ${
            isScrolled
              ? 'bg-neutral-50/95 backdrop-blur-md border-neutral-200/80 dark:bg-charcoal-dark/75 dark:backdrop-blur-2xl dark:border-neutral-800/30 dark:shadow-[0_1px_0_rgba(92,225,230,0.03),0_4px_24px_rgba(0,0,0,0.4)]'
              : 'bg-neutral-50/80 backdrop-blur-sm border-neutral-200 dark:bg-charcoal-dark/65 dark:backdrop-blur-xl dark:border-neutral-800/20 dark:shadow-[0_1px_0_rgba(92,225,230,0.02),0_2px_16px_rgba(0,0,0,0.3)]'
          }`}
          aria-label="Main navigation"
        >
          {/* Safe area top padding for iOS notch */}
          <div className="pt-safe">
            <div className="flex items-center justify-between h-20 md:h-24 px-4 md:px-6">
              {/* Left: Mobile menu trigger - hidden when scrolled */}
              <div className={`flex items-center transition-all duration-500 ease-out ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <button
                  type="button"
                  className="md:hidden p-2 -ml-2 text-neutral-600 hover:text-charcoal dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200 touch-manipulation focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50"
                  aria-expanded={sidebarOpen}
                  aria-label="Open navigation menu"
                  aria-controls="sidebar-navigation"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </button>
              </div>

              {/* Center: Logo - quiet, restrained, optical alignment */}
              <div className={`flex-1 flex transition-all duration-200 ease-out ${
                isScrolled 
                  ? 'justify-center' 
                  : 'justify-center md:justify-start'
              }`}>
                <Logo size="md" variant="navbar" className="flex-shrink-0" />
              </div>

              {/* Right: Desktop Navigation + Theme Toggle + CTA - hidden when scrolled */}
              <div className={`hidden md:flex items-center gap-6 transition-all duration-200 ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <nav className="flex items-center space-x-6" aria-label="Desktop navigation">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={`text-sm transition-colors duration-150 relative focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50 ${
                        isActive(item.href)
                          ? 'text-charcoal dark:text-neutral-100 font-medium after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 nav-underline'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200'
                      }`}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <ThemeToggle />
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-sm text-neutral-700 dark:text-neutral-300 dark:hover:text-neon-cyan/80 hover:text-charcoal dark:transition-colors duration-150 font-medium touch-manipulation"
                  aria-label="Discuss your system"
                >
                  Discuss your system
                </Link>
              </div>

              {/* Mobile: Theme Toggle + CTA - hidden when scrolled */}
              <div className={`md:hidden flex items-center gap-2 transition-all duration-200 ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <ThemeToggle />
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-sm text-neutral-700 dark:text-neutral-300 dark:hover:text-neon-cyan/80 hover:text-charcoal dark:transition-colors duration-150 font-medium touch-manipulation"
                  aria-label="Discuss your system"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

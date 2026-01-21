'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Sidebar from './Sidebar'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Approach', href: '/approach' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll behavior with smooth transitions
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = currentScrollY - lastScrollY

          setIsScrolled(currentScrollY > 20)

          // Smooth visibility transitions
          if (scrollDelta > 0 && currentScrollY > 100) {
            setIsVisible(false)
          } else if (scrollDelta < 0 || currentScrollY < 50) {
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
      {/* Premium Futuristic Navbar */}
      <header 
        className={`navbar-header sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full'
        }`}
      >
        <nav
          ref={navRef}
          className={`navbar-glass relative transition-all duration-500 ease-out ${
            isScrolled
              ? 'navbar-scrolled'
              : 'navbar-top'
          }`}
          aria-label="Main navigation"
        >
          {/* Ambient glow effect - bottom border */}
          <div className="navbar-glow absolute bottom-0 left-0 right-0 h-px"></div>
          
          {/* Gradient overlay for depth */}
          <div className="navbar-gradient absolute inset-0 pointer-events-none"></div>

          {/* Safe area top padding for iOS notch */}
          <div className="pt-safe">
            <div className="flex items-center justify-between h-20 md:h-24 px-4 md:px-6 lg:px-8">
              {/* Left: Mobile menu trigger */}
              <div className={`flex items-center transition-all duration-500 ease-out ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <button
                  type="button"
                  className="navbar-menu-btn md:hidden p-2 -ml-2 rounded-lg transition-all duration-300 touch-manipulation focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50"
                  aria-expanded={sidebarOpen}
                  aria-label="Open navigation menu"
                  aria-controls="sidebar-navigation"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg
                    className="h-5 w-5 text-neutral-600 dark:text-neutral-400 transition-colors duration-300"
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

              {/* Center: Logo with pulse animation */}
              <div className={`flex-1 flex transition-all duration-500 ease-out ${
                isScrolled 
                  ? 'justify-center' 
                  : 'justify-center md:justify-start'
              }`}>
                <div className={`navbar-logo ${mounted ? 'navbar-logo-visible' : ''}`}>
                  <Logo size="md" variant="navbar" className="flex-shrink-0 navbar-logo-pulse" />
                </div>
              </div>

              {/* Right: Desktop Navigation + Theme Toggle + CTA */}
              <div className={`hidden md:flex items-center gap-4 lg:gap-6 transition-all duration-500 ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <nav className="flex items-center space-x-1 lg:space-x-2" aria-label="Desktop navigation">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={`navbar-link group relative px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50 ${
                        mounted ? 'navbar-link-visible' : 'navbar-link-hidden'
                      }`}
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        transitionDelay: `${index * 50}ms`
                      }}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      <span className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-charcoal dark:text-neutral-100 dark:text-neon-cyan dark:drop-shadow-[0_0_8px_rgba(92,225,230,0.5)]'
                          : 'text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neon-cyan'
                      }`}>
                        {item.name}
                      </span>
                      
                      {/* Active underline with glow */}
                      {isActive(item.href) && (
                        <span className="navbar-active-indicator absolute bottom-0 left-0 right-0 h-px"></span>
                      )}
                      
                      {/* Hover background glow */}
                      <span className="navbar-hover-bg absolute inset-0 rounded-lg opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  ))}
                </nav>
                
                {/* Theme Toggle */}
                <div className={`${mounted ? 'navbar-link-visible' : 'navbar-link-hidden'}`} style={{ transitionDelay: '250ms' }}>
                  <ThemeToggle />
                </div>
                
                {/* CTA Button */}
                <Link
                  href="/contact"
                  prefetch={true}
                  className={`navbar-cta group relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 touch-manipulation focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50 ${
                    mounted ? 'navbar-link-visible' : 'navbar-link-hidden'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                  aria-label="Start a project"
                >
                  <span className="relative z-10">Start Project</span>
                  <span className="navbar-cta-glow absolute inset-0 rounded-lg opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="navbar-cta-border absolute inset-0 rounded-lg"></span>
                </Link>
              </div>

              {/* Mobile: Theme Toggle + CTA */}
              <div className={`md:hidden flex items-center gap-3 transition-all duration-500 ${
                isScrolled ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'
              }`}>
                <ThemeToggle />
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-sm text-neutral-700 dark:text-neutral-300 dark:hover:text-neon-cyan hover:text-charcoal transition-all duration-300 font-medium touch-manipulation px-3 py-2 rounded-lg dark:hover:bg-neon-cyan/5"
                  aria-label="Contact"
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

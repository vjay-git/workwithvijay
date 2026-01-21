'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Approach', href: '/approach' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return

    const touchEndX = e.touches[0].clientX
    const touchEndY = e.touches[0].clientY
    const deltaX = touchStartX.current - touchEndX
    const deltaY = touchStartY.current - touchEndY

    // Only handle horizontal swipes (more horizontal than vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
      // Swipe left to close
      onClose()
    }
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  // Handle navigation item click
  const handleNavClick = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="sidebar-backdrop fixed inset-0 bg-charcoal/20 dark:bg-charcoal-dark/40 z-40 md:hidden transition-colors duration-200"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      {isOpen && (
        <aside
          ref={sidebarRef}
          id="sidebar-navigation"
          className="sidebar-panel fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-neutral-50/95 dark:bg-charcoal-dark/95 backdrop-blur-2xl z-50 md:hidden flex flex-col shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_80px_rgba(92,225,230,0.1)] border-r border-neutral-200/50 dark:border-neon-cyan/20 transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Ambient glow on border */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent dark:opacity-100 opacity-0"></div>
        {/* Identity Area - Top with Logo Only */}
        <div className="pt-safe pb-2 px-6 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
          <div className="flex items-center justify-between pt-1 pb-1">
            {/* Logo - centered, wider and shorter */}
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className="logo-container flex items-center transition-opacity duration-300 hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50"
                aria-label="Work With Vijay - Home"
              >
                <img
                  src={theme === 'dark' ? '/wwvdarkmode.png' : '/wwv.png'}
                  alt="Work With Vijay"
                  className="h-8 w-48 transition-opacity duration-500 opacity-100"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </Link>
            </div>
            {/* Close button - top right */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:focus-visible:outline-neon-cyan/50"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 overflow-y-auto" aria-label="Main navigation">
          <ul className="space-y-2 px-6">
            {navigation.map((item, index) => (
              <li 
                key={item.name}
                className="sidebar-nav-item"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                  transform: 'translateX(-20px)'
                }}
              >
                <Link
                  href={item.href}
                  prefetch={true}
                  onClick={handleNavClick}
                  className={`group block min-h-[44px] px-4 py-3 rounded-lg text-base transition-all duration-300 relative overflow-hidden ${
                    isActive(item.href)
                      ? 'bg-neutral-100 dark:bg-neutral-900/50 text-charcoal dark:text-neutral-100 dark:text-neon-cyan font-medium dark:shadow-[0_0_12px_rgba(92,225,230,0.15)]'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900/30 hover:text-charcoal dark:hover:text-neon-cyan'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.href) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neon-cyan to-transparent dark:opacity-100 opacity-0"></span>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/0 to-transparent dark:group-hover:via-neon-cyan/5 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Section - Bottom */}
        <div className="pt-6 pb-safe px-6 border-t border-neutral-200/50 dark:border-neon-cyan/20 space-y-3 transition-colors duration-300">
          <Link
            href="/contact"
            prefetch={true}
            onClick={handleNavClick}
            className="group relative block w-full min-h-[44px] px-6 py-3 bg-charcoal dark:bg-neon-cyan/10 dark:border dark:border-neon-cyan/30 text-neutral-50 dark:text-neon-cyan text-center rounded-lg font-medium transition-all duration-300 hover:opacity-90 dark:hover:bg-neon-cyan/15 dark:hover:border-neon-cyan/50 dark:hover:shadow-[0_0_20px_rgba(92,225,230,0.3)] overflow-hidden"
          >
            <span className="relative z-10">Start Project</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent dark:group-hover:via-neon-cyan/10 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <a
            href="mailto:hello@workwithvijay.com"
            onClick={handleNavClick}
            className="block text-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-charcoal dark:hover:text-neutral-200 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
            aria-label="Send email to hello@workwithvijay.com"
          >
            hello@workwithvijay.com
          </a>
        </div>
      </aside>
      )}
    </>
  )
}

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
          className="sidebar-panel fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-neutral-50 dark:bg-charcoal-dark z-50 md:hidden flex flex-col shadow-lg dark:shadow-2xl transition-colors duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
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
          <ul className="space-y-1 px-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  prefetch={true}
                  onClick={handleNavClick}
                  className={`block min-h-[44px] px-4 py-3 rounded-lg text-base transition-colors duration-150 relative ${
                    isActive(item.href)
                      ? 'bg-neutral-100 dark:bg-neutral-900 text-charcoal dark:text-neutral-100 font-medium dark:after:content-[""] dark:after:absolute dark:after:left-0 dark:after:top-0 dark:after:bottom-0 dark:after:w-[2px] dark:after:bg-neon-cyan dark:after:shadow-neon-soft'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-charcoal dark:hover:text-neutral-100'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Section - Bottom */}
        <div className="pt-6 pb-safe px-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3 transition-colors duration-300">
          <Link
            href="/contact"
            prefetch={true}
            onClick={handleNavClick}
            className="block w-full min-h-[44px] px-6 py-3 bg-charcoal dark:bg-neon-cyan text-neutral-50 dark:text-charcoal-dark text-center rounded-lg font-medium transition-all duration-150 hover:opacity-90 dark:hover:shadow-neon-glow"
          >
            Discuss your system
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

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Approach', href: '/approach' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isActive = (href: string) => pathname === href

  // Two states only: integrated at the top, compressed once moving. The navbar
  // responds to movement rather than hiding itself.
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Magnetic control - listener lives on the element, so it only runs while
  // the pointer is actually over it.
  const onCtaMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--nx', ((e.clientX - (r.left + r.width / 2)) * 0.16).toFixed(1) + 'px')
    el.style.setProperty('--ny', ((e.clientY - (r.top + r.height / 2)) * 0.2).toFixed(1) + 'px')
  }
  const onCtaLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty('--nx', '0px')
    e.currentTarget.style.setProperty('--ny', '0px')
  }

  return (
    <>
      <header className={'nav-root' + (scrolled ? ' is-scrolled' : '')}>
        <div className="nav-inner">
          <Logo />

          {/* desktop */}
          <div className="nav-cluster">
            <nav className="nav-links" aria-label="Main navigation">
              {NAV.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={'nav-link' + (isActive(item.href) ? ' is-active' : '')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span className="nav-link-dot" aria-hidden="true" />
                  <span className="nav-link-label">{item.name}</span>
                  <span className="nav-link-signal" aria-hidden="true" />
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <Link
              href="/contact"
              prefetch={true}
              className="nav-cta"
              onPointerMove={onCtaMove}
              onPointerLeave={onCtaLeave}
              aria-label="Start a project"
            >
              <span className="nav-cta-signal" aria-hidden="true" />
              <span className="nav-cta-label">Start Project</span>
              <span className="nav-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          {/* mobile */}
          <div className="nav-mobile">
            <ThemeToggle />
            <button
              type="button"
              className="nav-menu"
              aria-expanded={menuOpen}
              aria-controls="nav-overlay"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="nav-menu-label">Menu</span>
              <span className="nav-menu-mark" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
        <span className="nav-hairline" aria-hidden="true" />
      </header>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

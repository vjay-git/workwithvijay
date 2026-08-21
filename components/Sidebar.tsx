'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Approach', href: '/approach' },
  { name: 'Contact', href: '/contact' },
]

/**
 * Mobile navigation as a full-screen environment rather than a dropdown -
 * the same system voice as the hero, at reading scale.
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // aria-modal promises the rest of the page is unreachable, so Tab has to
      // cycle inside the overlay.
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('sidebar-open')
    // Move focus into the overlay so the keyboard doesn't stay behind it.
    const t = window.setTimeout(() => closeRef.current?.focus(), 60)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('sidebar-open')
      window.clearTimeout(t)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      id="nav-overlay"
      ref={panelRef}
      className="navover"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div className="navover-ground" aria-hidden="true" />
      <div className="navover-grid" aria-hidden="true" />

      <div className="navover-top">
        <span className="navover-meta">
          <span className="navover-meta-index">01</span>
          <span className="navover-meta-rule" aria-hidden="true" />
          NAVIGATION
        </span>
        <button ref={closeRef} type="button" className="navover-close" onClick={onClose}>
          Close
          <span className="navover-close-mark" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <nav className="navover-nav" aria-label="Mobile navigation">
        {NAV.map((item, i) => (
          <Link
            key={item.name}
            href={item.href}
            prefetch={true}
            onClick={onClose}
            className={'navover-item' + (pathname === item.href ? ' is-active' : '')}
            style={{ animationDelay: 60 + i * 55 + 'ms' }}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <span className="navover-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="navover-label">{item.name}</span>
            <span className="navover-dot" aria-hidden="true" />
          </Link>
        ))}
      </nav>

      <div className="navover-foot">
        <Link href="/contact" prefetch={true} onClick={onClose} className="navover-cta">
          <span className="navover-cta-label">Start Project</span>
          <span className="navover-cta-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
        <span className="navover-foot-meta">RAG / AGENTS / LLM</span>
      </div>
    </div>
  )
}

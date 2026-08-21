'use client'

import Link from 'next/link'
import { useRef } from 'react'

/**
 * The terminal state. The signal that has run through every section since the
 * hero arrives here, meets a node, and stops - the machine closing rather than
 * a page ending. Carries the hero's control so the first and last actions on
 * the page are visibly the same object.
 */
export default function ClosingCall() {
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // Magnetic pull, listener on the element so it only runs while over it.
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--nx', ((e.clientX - (r.left + r.width / 2)) * 0.18).toFixed(1) + 'px')
    el.style.setProperty('--ny', ((e.clientY - (r.top + r.height / 2)) * 0.22).toFixed(1) + 'px')
  }
  const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty('--nx', '0px')
    e.currentTarget.style.setProperty('--ny', '0px')
  }

  return (
    <section className="close" aria-labelledby="close-title">
      <div className="close-ground" aria-hidden="true" />
      <div className="close-grid" aria-hidden="true" />

      <div className="close-inner">
        <span className="close-meta">
          <span className="close-meta-index">05</span>
          <span className="close-meta-rule" aria-hidden="true" />
          Contact
        </span>

        <h2 id="close-title" className="close-title">
          Let&apos;s discuss
          <br />
          your system.
        </h2>

        <p className="close-lede">
          From retrieval to deployment —{' '}
          <span className="close-lede-em">tell us what you&apos;re building.</span>
        </p>

        <div className="close-actions">
          <Link
            ref={ctaRef}
            href="/contact"
            prefetch={true}
            className="close-cta"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <span className="close-cta-field" aria-hidden="true" />
            <span className="close-cta-signal" aria-hidden="true" />
            <span className="close-cta-label">Start a project</span>
            <span className="close-cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>

          <Link href="/work" prefetch={true} className="close-ghost">
            <span className="close-ghost-text">View work</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* the signal terminates - end of the machine */}
        <span className="close-terminus" aria-hidden="true">
          <span className="close-terminus-line" />
          <span className="close-terminus-node" />
        </span>
      </div>
    </section>
  )
}

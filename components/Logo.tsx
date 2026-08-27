'use client'

import Link from 'next/link'

/**
 * Brand lockup: COLLAB WITH VIJAY.
 *
 * The approved wordmark, drawn from the traced master (see scripts/trace-logo.js).
 * It is painted as a CSS mask rather than an <img> or inline SVG for three
 * reasons: the ink follows `currentColor`, so one cached 32KB file serves both
 * themes; nothing inlines 32KB of path data into every page; and the accent dot
 * stays a real element that can respond to interaction.
 *
 * The dot is positioned from the artwork's own geometry - make-wordmarks.js
 * prints those percentages, so the CSS and the SVG cannot drift apart.
 */

interface LogoProps {
  size?: 'sm' | 'md'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      prefetch={true}
      className={`brand brand-${size} ${className}`}
      aria-label="COLLAB WITH VIJAY - Home"
    >
      <span className="brand-lockup" aria-hidden="true">
        <span className="brand-wordmark" />
        <span className="brand-dot" />
      </span>
    </Link>
  )
}

'use client'

import Link from 'next/link'

/**
 * Brand lockup: a system mark plus a live-type wordmark.
 *
 * Rendered as text rather than an image so it stays crisp at any size, follows
 * the theme tokens, and can carry interaction. The mark is the site's own
 * visual language reduced to 24px - a node with a signal passing through it,
 * inside an implied system frame.
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
      aria-label="workwithvijAI - Home"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" strokeLinecap="square">
          {/* implied system frame */}
          <path className="brand-mark-frame" d="M3.5 8.5V3.5H8.5" />
          <path className="brand-mark-frame" d="M20.5 15.5v5h-5" />
          {/* signal path */}
          <path className="brand-mark-path" d="M4.5 12h15" />
          {/* the travelling signal, parked off-path until hover */}
          <path className="brand-mark-signal" d="M4.5 12h15" />
          {/* node */}
          <circle className="brand-mark-node" cx="12" cy="12" r="2.4" />
        </svg>
      </span>

      <span className="brand-word">
        <span className="brand-word-main">workwithvij</span>
        <span className="brand-word-ai">
          AI
          <span className="brand-word-rule" aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}

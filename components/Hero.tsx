'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import HeroField from './HeroField'
import HeroPointer from './HeroPointer'

/** The payoff line is addressable per letter, so it answers to proximity. */
const PAYOFF = 'PRODUCTION.'.split('')

export default function Hero() {
  const { theme } = useTheme()
  const scopeRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const evaluate = () => setInteractive(fine.matches && !reduced.matches)
    evaluate()
    fine.addEventListener('change', evaluate)
    reduced.addEventListener('change', evaluate)
    return () => {
      fine.removeEventListener('change', evaluate)
      reduced.removeEventListener('change', evaluate)
    }
  }, [])

  // Scroll response: the composition settles as the page leaves. Written as a
  // custom property so every plane can scale it differently in CSS.
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const apply = () => {
      const h = scope.offsetHeight || 1
      const t = Math.max(0, Math.min(1, window.scrollY / h))
      scope.style.setProperty('--sy', (t * -54).toFixed(1) + 'px')
      scope.style.setProperty('--sf', (1 - t * 0.85).toFixed(3))
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={scopeRef}
      className={'hero-stage' + (interactive ? ' is-interactive' : '')}
      aria-label="Introduction"
    >
      <div className="hero-ground" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <HeroField theme={theme} pointerRef={pointerRef} />

      {interactive && (
        <HeroPointer scopeRef={scopeRef} wordRef={wordRef} pointerRef={pointerRef} />
      )}

      <div className="hero-frame">
        <div className="hero-rail">
          <span className="hero-meta hero-fade" style={{ animationDelay: '560ms' }}>
            <span className="hero-meta-index">01</span>
            <span className="hero-meta-rule" aria-hidden="true" />
            PRODUCT &amp; AI ENGINEERING STUDIO
          </span>
        </div>

        <div ref={typeRef} className="hero-typeblock">
          {/* One lockup, three lines, one size. The claim is a sentence, so it
              is set as one - not as a headline with a floating fragment. */}
          <h1 className="hero-type">
            <span className="hero-line">
              <span className="hero-word">AI PRODUCTS</span>
            </span>{' '}
            <span className="hero-line">
              {/* The axis in HeroField anchors to this line's right edge - it
                  is the short line, so the empty side is genuinely empty. */}
              <span className="hero-word hero-word-axis">BUILT FOR</span>
            </span>{' '}
            {/* PRODUCTION. is a physical object: every letter is addressable,
                so the payoff answers to proximity rather than to :hover. */}
            <span className="hero-line">
              {/* No aria-label here: it is prohibited on a generic <span> and
                  engines increasingly ignore it, which would drop the word from
                  the heading's accessible name. The letters' own text names it. */}
              <span ref={wordRef} className="hero-word-eng">
                {PAYOFF.map((ch, i) => (
                  <span
                    key={i}
                    className="hero-eng-letter"
                    style={{ animationDelay: 380 + i * 26 + 'ms' }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-lower">
          <p className="hero-value-line hero-fade" style={{ animationDelay: '860ms' }}>
            We build RAG systems, AI agents and LLM applications{' '}
            <span className="hero-value-em">
              that are secure, scalable and ready for real users.
            </span>
          </p>

          {/* One row, one hierarchy. The primary action carries the signature
              device - a signal travelling a path - and nothing else does. */}
          <div className="hero-actions hero-fade" style={{ animationDelay: '940ms' }}>
            <Link href="/contact" prefetch={true} className="hero-cta">
              <span className="hero-cta-label">LET&apos;S BUILD</span>
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
              <span className="hero-cta-rule" aria-hidden="true">
                <span className="hero-cta-signal" />
              </span>
            </Link>

            <span className="hero-actions-quiet">
              <Link href="/work" prefetch={true} className="hero-ghost">
                <span className="hero-ghost-text">VIEW WORK</span>
                <span aria-hidden="true">→</span>
              </Link>

              {/* The route back to the person behind the studio. Deliberately
                  the same weight as VIEW WORK - a way out, not a third button. */}
              <Link href="/about" prefetch={true} className="hero-ghost">
                <span className="hero-ghost-text">THE ENGINEER</span>
                <span aria-hidden="true">→</span>
              </Link>
            </span>
          </div>
        </div>

        <div className="hero-rail hero-rail-bottom">
          <span className="hero-meta hero-meta-dim hero-fade" style={{ animationDelay: '1000ms' }}>
            SCROLL
            <span className="hero-scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

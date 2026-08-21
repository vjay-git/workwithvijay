'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import HeroField from './HeroField'
import HeroPointer from './HeroPointer'

const ENG = 'ENGINEERING'.split('')

/** Surfaced only inside the scan field that follows the cursor. */
const SCAN = ['RAG', 'VECTOR', 'AGENT', 'LLM', 'SYSTEM']

export default function Hero() {
  const { theme } = useTheme()
  const scopeRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
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
        <HeroPointer
          scopeRef={scopeRef}
          typeRef={typeRef}
          wordRef={wordRef}
          ctaRef={ctaRef}
          pointerRef={pointerRef}
        />
      )}

      <div className="hero-frame">
        <div className="hero-rail">
          <span className="hero-meta hero-fade" style={{ animationDelay: '560ms' }}>
            <span className="hero-meta-index">01</span>
            <span className="hero-meta-rule" aria-hidden="true" />
            AI PRODUCT ENGINEERING
          </span>
          <span className="hero-meta hero-fade" style={{ animationDelay: '640ms' }}>
            <span className="hero-pulse-dot" aria-hidden="true" />
            SYSTEM ONLINE
          </span>
        </div>

        <div ref={typeRef} className="hero-typeblock">
          <h1 className="hero-type">
            <span className="hero-line hero-line-1">
              <span className="hero-word hero-word-product">PRODUCT</span>
              <span className="hero-slash" aria-hidden="true">
                /
              </span>
            </span>

            {/* AI - a system designation, not a second heading. Drifts on its
                own cycle, independent of the mass below it. */}
            <span className="hero-line hero-line-2">
              <span className="hero-ai-mark" aria-hidden="true">
                <i className="hero-ai-tick hero-ai-tick-tl" />
                <i className="hero-ai-tick hero-ai-tick-br" />
              </span>
              <span className="hero-word hero-word-ai">AI</span>
            </span>

            {/* ENGINEERING is a physical object: every letter is addressable,
                so the word can respond to proximity rather than to :hover. */}
            <span className="hero-line hero-line-3">
              {/* No aria-label here: it is prohibited on a generic <span> and
                  engines increasingly ignore it, which would drop ENGINEERING
                  from the heading's accessible name entirely. The letters'
                  own text names the heading instead. */}
              <span ref={wordRef} className="hero-word-eng">
                {ENG.map((ch, i) => (
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

          {/* Scan field - a travelling hairline plus local readouts, masked to
              a disc at the cursor. Nothing here is ever permanently visible. */}
          <div className="hero-scan" aria-hidden="true">
            <span className="hero-scan-line" />
            <div className="hero-scan-tokens">
              {SCAN.map((t) => (
                <span key={t} className="hero-scan-token">
                  <i />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-lower">
          <p className="hero-value-line hero-fade" style={{ animationDelay: '860ms' }}>
            RAG systems, AI agents and LLM infrastructure —{' '}
            <span className="hero-value-em">engineered for production, not demos.</span>
          </p>

          <div className="hero-actions hero-fade" style={{ animationDelay: '940ms' }}>
            <Link ref={ctaRef} href="/contact" prefetch={true} className="hero-cta">
              <span className="hero-cta-field" aria-hidden="true" />
              <span className="hero-cta-signal" aria-hidden="true" />
              <span className="hero-cta-label">LET&apos;S BUILD</span>
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link href="/work" prefetch={true} className="hero-ghost">
              <span className="hero-ghost-text">VIEW WORK</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-rail hero-rail-bottom">
          <span className="hero-meta hero-meta-dim hero-fade" style={{ animationDelay: '1000ms' }}>
            RAG / AGENTS / LLM
          </span>
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

'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Decides whether the cinematic intro runs, and never blocks the page either way.
 *
 * The architecture rule this whole feature rests on: THE DOM HERO IS ALWAYS
 * RENDERED. It is in the markup from the first byte, in its final accessible
 * form. This gate only ever draws an overlay on top of it and then takes the
 * overlay away.
 *
 * That single decision is what makes the fallbacks trivial instead of a matrix:
 *   - reduced motion   -> never mount; the hero is already there
 *   - no WebGL         -> never mount; the hero is already there
 *   - repeat visit     -> mount the condensed cut
 *   - fetch/parse fails-> unmount; the hero is already there
 *   - JS disabled      -> nothing here runs at all; the hero is already there
 *
 * There is no state in which the user waits on this component to see the site.
 */

const IntroCanvas = dynamic(() => import('./IntroCanvas'), { ssr: false })

const SEEN_KEY = 'cwv:intro-seen'

type Mode = 'idle' | 'full' | 'brief' | 'off'

function probeWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function IntroGate() {
  const [mode, setMode] = useState<Mode>('idle')
  const [showSkip, setShowSkip] = useState(false)
  const [lit, setLit] = useState(false)
  const skipRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Decided synchronously on mount, before anything heavy is imported.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setMode('off')
    if (!probeWebGL()) return setMode('off')

    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      // Private mode or blocked storage: treat as a first visit rather than
      // failing. Worst case the user sees the full intro twice.
    }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small = window.innerWidth < 820
    document.documentElement.dataset.intro = 'running'
    document.documentElement.style.setProperty('--intro-reveal', '0')
    setMode(seen ? 'brief' : 'full')
    if (coarse || small) document.documentElement.dataset.introCompact = '1'

    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* nothing to do */
    }
  }, [])

  // Offered, not thrust: if it appeared instantly it would read as an apology
  // for the thing the user has not seen yet.
  useEffect(() => {
    if (mode !== 'full' && mode !== 'brief') return
    const t = window.setTimeout(() => setShowSkip(true), mode === 'brief' ? 250 : 700)
    return () => window.clearTimeout(t)
  }, [mode])

  const release = useCallback(() => {
    document.documentElement.style.setProperty('--intro-reveal', '1')
    // Marked done rather than removed: the attribute keeps the hero's own
    // entrance keyframes suppressed for the rest of the visit. Removing it here
    // let them restart from zero the instant the intro handed over.
    document.documentElement.dataset.intro = 'done'
    delete document.documentElement.dataset.introCompact
    setMode('off')
    setShowSkip(false)
  }, [])

  const onReveal = useCallback((v: number) => {
    document.documentElement.style.setProperty('--intro-reveal', v.toFixed(3))
  }, [])

  const registerSkip = useCallback((fn: () => void) => {
    skipRef.current = fn
  }, [])

  // The 3D chunk plus the geometry is a real download. Rather than hold a black
  // screen while it lands, the mark is on screen immediately as flat CSS - the
  // same artwork, the same position - and the WebGL version takes over
  // underneath it. The viewer sees the logo from the first paint either way.
  const onLit = useCallback(() => setLit(true), [])

  // Escape is the keyboard equivalent of the skip control, so the intro is not
  // a trap for anyone not using a pointer.
  useEffect(() => {
    if (mode !== 'full' && mode !== 'brief') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skipRef.current?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode])

  // Belt and braces: if anything wedges, the page is handed over anyway. The
  // film is ~4.2s; this is far enough past it to never fire on a healthy run.
  useEffect(() => {
    if (mode !== 'full' && mode !== 'brief') return
    const t = window.setTimeout(release, 9000)
    return () => window.clearTimeout(t)
  }, [mode, release])

  useEffect(() => () => {
    // On unmount the page must be left usable, whatever stage we were at.
    document.documentElement.style.setProperty('--intro-reveal', '1')
    document.documentElement.dataset.intro = 'done'
  }, [])

  if (mode !== 'full' && mode !== 'brief') return null

  const compact =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820)

  return (
    <div className="intro-root" role="presentation">
      <div className={'intro-poster' + (lit ? ' is-lit' : '')} aria-hidden="true">
        <span className="intro-poster-mark" />
        <span className="intro-poster-dot" />
      </div>

      <IntroCanvas
        compact={compact}
        brief={mode === 'brief'}
        onReveal={onReveal}
        onDone={release}
        onLit={onLit}
        registerSkip={registerSkip}
      />

      {showSkip && (
        <button type="button" className="intro-skip" onClick={() => skipRef.current?.()}>
          <span className="intro-skip-label">SKIP</span>
          <span className="intro-skip-arrow" aria-hidden="true">
            →
          </span>
          <span className="intro-skip-rule" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

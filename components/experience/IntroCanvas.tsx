'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import IntroScene, { splitPaths } from './IntroScene'
import { buildIntroTimeline, createIntroState, type IntroState } from './introTimeline'

/**
 * Mounts the WebGL layer and runs the timeline.
 *
 * This component is loaded lazily and only ever rendered when IntroGate has
 * already decided the intro should play, so nothing here runs on a reduced
 * motion visit, a repeat visit that opted out, or a machine without WebGL.
 *
 * Everything animation-heavy lives on refs and a plain mutable object. The only
 * React state is `ready`, which flips exactly once.
 */

interface Props {
  compact: boolean
  brief: boolean
  onReveal: (v: number) => void
  onDone: () => void
  /** Fires once the WebGL mark is actually on screen, so the flat poster can go. */
  onLit: () => void
  registerSkip: (fn: () => void) => void
}

export default function IntroCanvas({ compact, brief, onReveal, onDone, onLit, registerSkip }: Props) {
  const state = useMemo<IntroState>(() => createIntroState(), [])
  const [paths, setPaths] = useState<ReturnType<typeof splitPaths> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const doneRef = useRef(false)

  // Geometry source. A plain fetch + parse rather than useLoader, so a failure
  // is a caught error that hands the page over, not a thrown suspense boundary.
  useEffect(() => {
    let cancelled = false
    fetch('/collab-logo-traced.svg')
      .then((r) => {
        if (!r.ok) throw new Error('logo ' + r.status)
        return r.text()
      })
      .then((text) => {
        if (cancelled) return
        const parsed = new SVGLoader().parse(text)
        const split = splitPaths(parsed)
        if (!split.collab.length) throw new Error('no collab glyphs')
        setPaths(split)
      })
      .catch(() => { if (!cancelled) onDone() })
    return () => { cancelled = true }
  }, [onDone])

  // The timeline starts only once the geometry is real, so the first frame the
  // user sees is the mark - never an empty stage waiting for a fetch.
  useEffect(() => {
    if (!paths) return
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onReveal(1)
      onDone()
    }
    const tl = buildIntroTimeline(state, { compact, brief, onReveal, onComplete: finish })
    tlRef.current = tl

    const wrap = wrapRef.current
    const applyFade = () => { if (wrap) wrap.style.opacity = String(state.fade) }
    tl.eventCallback('onUpdate', () => {
      onReveal(state.reveal)
      applyFade()
    })
    tl.play()

    // Skipping is not a cut. It runs the rest of the film fast, so the user who
    // opts out still lands in the same place, just sooner.
    registerSkip(() => {
      if (doneRef.current) return
      // Pause first: tweening .progress while the timeline is still advancing
      // its own playhead makes the two fight, and the run-out takes three times
      // as long as it should.
      tl.pause()
      gsap.to(tl, {
        progress: 1,
        duration: 0.34,
        ease: 'power2.in',
        onUpdate: () => { onReveal(state.reveal); applyFade() },
        onComplete: finish,
      })
    })

    // A backgrounded tab must not keep a WebGL context spinning.
    const onVis = () => (document.hidden ? tl.pause() : tl.play())
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      tl.kill()
    }
  }, [paths, compact, brief, state, onReveal, onDone, registerSkip])

  if (!paths) return null

  return (
    <div ref={wrapRef} className="intro-canvas">
      <Canvas
        // Capped hard on mobile: a 3x DPR phone rendering a full-screen scene
        // at native resolution is where this kind of intro actually dies.
        dpr={compact ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !compact,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ fov: 34, position: [0, 0, 9.2] }}
        // The timeline owns time; R3F should not also be invalidating frames.
        frameloop="always"
        onCreated={() => {
          // Two frames, not one: the first can land before the geometry has been
          // uploaded, which would cross-fade the poster out onto an empty stage.
          requestAnimationFrame(() => requestAnimationFrame(onLit))
        }}
      >
        <IntroScene state={state} paths={paths} compact={compact} />
      </Canvas>
    </div>
  )
}

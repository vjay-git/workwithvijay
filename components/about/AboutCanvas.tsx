'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutScene from './AboutScene'
import {
  clamp01,
  createAboutState,
  measureAnchors,
  type Anchors,
  type AboutState,
} from './aboutState'

/**
 * The WebGL layer: mounts the context, measures the page, and drives one number.
 *
 * ScrollTrigger owns exactly one thing here - `state.progress`, the camera's
 * position on the rail. Every other act value (the frame expanding, the cards
 * arriving, the stack, the calm through the rules, the emptiness at the climax)
 * is DERIVED from that progress and the measured DOM anchors, in `derive`.
 *
 * That is a deliberate choice over one ScrollTrigger per section. Twelve
 * triggers with their own starts and ends is twelve things to keep in sync with
 * copy that will change; one trigger plus anchors measured off the real layout
 * stays correct through a rewrite, a font swap, or a phone in landscape.
 *
 * The existing rAF pass in AboutProfile is left completely alone. It owns
 * --ab-grid, --ab-por and --ab-depth and has done since before this layer
 * existed; replacing working code to make the diagram tidier is not a change,
 * it is a risk.
 */

interface Props {
  compact: boolean
  onReady: () => void
}

/** Smoothstep from a to b. */
function ramp(v: number, a: number, b: number) {
  if (b <= a) return v >= b ? 1 : 0
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/** In over [a,b], out over [c,d]. */
function windowed(v: number, a: number, b: number, c: number, d: number) {
  return ramp(v, a, b) * (1 - ramp(v, c, d))
}

/**
 * Turns one scroll position into the seven act values the scene reads.
 *
 * Written against the anchors rather than hard-coded fractions, so the acts
 * land on the sections they are named after even when the sections move.
 */
function derive(s: AboutState, a: Anchors) {
  const p = s.progress
  const at = (k: string, fallback: number) => (a[k] ? a[k].frac : fallback)

  const hero = at('hero', 0)
  const s0 = at('stage-0', 0.16)
  const s4 = at('stage-4', 0.4)
  const c0 = at('con-0', 0.5)
  const c3 = at('con-3', 0.62)
  const l0 = at('layer-0', 0.7)
  const l5 = at('layer-5', 0.78)
  const calm = at('calm', 0.84)
  const human = at('human', 0.9)
  const out = at('out', 0.97)

  // The hinge of the page: the frame stops being a picture frame and becomes
  // the mouth of the corridor, across the gap between the hero and stage 01.
  s.expand = ramp(p, hero + 0.012, s0 - 0.005)

  // The corridor is only the corridor's business. It arrives with the frame
  // and it is gone before the first contribution card, rather than lingering
  // behind a section it has nothing to say about.
  s.journey = s.expand * (1 - ramp(p, s4 + 0.015, c0 - 0.035))

  s.cards = windowed(p, c0 - 0.055, c0 - 0.008, c3 + 0.02, c3 + 0.07)
  s.stack = windowed(p, l0 - 0.05, l0 - 0.005, l5 + 0.015, l5 + 0.06)

  // Calm is one-way. Once the rules start, the corridor is behind us and
  // nothing should bring it back.
  s.calm = ramp(p, Math.min(calm, l5 + 0.02) - 0.05, calm - 0.005)

  s.human = windowed(p, human - 0.09, human - 0.02, human + 0.05, human + 0.12)
  s.out = ramp(p, out - 0.06, out)

  // Belt and braces for a page shorter than the corridor: the journey must
  // never still be arriving once the reader is past stage 05.
  if (p > s4 + 0.05) s.expand = Math.min(s.expand, 1)
}

export default function AboutCanvas({ compact, onReady }: Props) {
  const state = useMemo<AboutState>(() => createAboutState(), [])
  const [anchors, setAnchors] = useState<Anchors>({})
  const [loop, setLoop] = useState<'always' | 'never'>('always')
  const anchorsRef = useRef<Anchors>({})

  /* ---- measurement: the page, then the scene ---------------------------- */

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ab')
    if (!root) return

    gsap.registerPlugin(ScrollTrigger)

    const remeasure = () => {
      const next = measureAnchors(root)
      anchorsRef.current = next
      setAnchors(next)
      state.figure = root.querySelector<HTMLElement>('[data-ab-portrait]')
      derive(state, next)
    }

    remeasure()

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        state.progress = self.progress
        derive(state, anchorsRef.current)
      },
      onRefresh: remeasure,
    })

    // Fonts swapping is the one thing that moves the anchors after first paint
    // and that ScrollTrigger does not already watch for itself (it refreshes on
    // resize and on load on its own).
    //
    // A ResizeObserver on .ab was the obvious answer and the wrong one: the
    // contribution cards open on hover by animating grid-template-rows, which
    // changes the height of .ab on every frame of a 700ms transition. The
    // observer would have fired ~40 full document refreshes per hover, each one
    // re-measuring twenty elements and re-rendering the scene tree - on the
    // page's headline interaction.
    let cancelled = false
    const onFonts = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(onFonts).catch(() => {})

    onReady()

    return () => {
      cancelled = true
      trigger.kill()
    }
  }, [state, onReady])

  /* ---- a hidden tab must not keep a WebGL context spinning -------------- */

  useEffect(() => {
    const onVis = () => setLoop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* ---- the theme the scene has to live in ------------------------------- */

  useEffect(() => {
    const read = () => {
      state.dark = document.documentElement.classList.contains('dark')
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [state])

  /* ---- hover on the contribution cards ---------------------------------- */

  // Listened for here rather than pushed from AboutProfile, so the DOM page
  // carries no knowledge of this layer and stays deletable in one line.
  useEffect(() => {
    if (compact) return
    const root = document.querySelector<HTMLElement>('.ab')
    if (!root) return
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-ab-anchor^="con-"]')
    )
    const offs: (() => void)[] = []
    cards.forEach((el, i) => {
      const on = () => {
        state.hovered = i
      }
      const off = () => {
        if (state.hovered === i) state.hovered = -1
      }
      el.addEventListener('pointerenter', on)
      el.addEventListener('pointerleave', off)
      el.addEventListener('focusin', on)
      el.addEventListener('focusout', off)
      offs.push(() => {
        el.removeEventListener('pointerenter', on)
        el.removeEventListener('pointerleave', off)
        el.removeEventListener('focusin', on)
        el.removeEventListener('focusout', off)
      })
    })
    return () => offs.forEach((f) => f())
  }, [state, compact])

  return (
    <div className="ab-stage" aria-hidden="true">
      <Canvas
        // Capped hard on a phone. A 3x-DPR device rendering a full-screen scene
        // at native resolution is where a page like this actually dies.
        dpr={compact ? [1, 1.5] : [1, 1.75]}
        gl={{
          // alpha, and no scene background: the page owns its own colour, has a
          // light theme, and .ab-ground has to show through underneath.
          alpha: true,
          antialias: !compact,
          powerPreference: 'high-performance',
        }}
        camera={{ fov: 34, position: [0, 0, 9] }}
        frameloop={loop}
        style={{ pointerEvents: 'none' }}
      >
        <AboutScene state={state} anchors={anchors} compact={compact} />
      </Canvas>
    </div>
  )
}

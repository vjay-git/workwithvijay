'use client'

import { useEffect } from 'react'

/**
 * Hero interaction layer. One pointer listener, one rAF, and everything
 * downstream expressed as CSS custom properties - the per-letter response in
 * ENGINEERING, the parallax base, and --cursor-open for the site cursor.
 *
 * It draws nothing. The cursor itself is components/SiteCursor, mounted once
 * in the root layout; this component only tells it how far to open.
 *
 * Deliberately short. The magnetic CTA and the scan-field lens were removed
 * with the devices they belonged to; what remains is proximity, which is the
 * one interaction the composition actually needs.
 *
 * Letter geometry is read from offsetLeft/offsetWidth, which are layout values
 * and therefore immune to the entrance transform; element rects are cached and
 * refreshed on scroll/resize/animationend so pointermove never forces layout.
 */

interface Props {
  scopeRef: React.RefObject<HTMLElement | null>
  wordRef: React.RefObject<HTMLElement | null>
  pointerRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

export default function HeroPointer({ scopeRef, wordRef, pointerRef }: Props) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    const root = document.documentElement

    let rScope = scope.getBoundingClientRect()
    let rWord: DOMRect | null = null

    let letters: HTMLElement[] = []
    let centres: number[] = []
    let current: number[] = []

    const measure = () => {
      rScope = scope.getBoundingClientRect()
      rWord = wordRef.current ? wordRef.current.getBoundingClientRect() : null

      const word = wordRef.current
      if (word) {
        letters = Array.from(word.querySelectorAll<HTMLElement>('.hero-eng-letter'))
        // offsetLeft is a layout value - unaffected by the entrance transform
        centres = letters.map((el) => el.offsetLeft + el.offsetWidth / 2)
        if (current.length !== letters.length) current = letters.map(() => 0)
      }
    }
    measure()

    const client = { x: -9999, y: -9999 }
    const eased = { x: 0, y: 0 }
    const prev = { x: -9999, y: -9999 }
    let inside = false
    let raf = 0
    let running = false
    let letterMax = 0
    let targetMax = 0
    let open = 0

    const frame = () => {
      const x = client.x - rScope.left
      const y = client.y - rScope.top

      eased.x += (x - eased.x) * 0.17
      eased.y += (y - eased.y) * 0.17

      // Parallax base. Each plane multiplies this by its own depth factor in
      // CSS, so the ratios live with the design rather than in JS.
      scope.style.setProperty('--px', (inside ? (x / rScope.width - 0.5) * -120 : 0).toFixed(1) + 'px')
      scope.style.setProperty('--py', (inside ? (y / rScope.height - 0.5) * -70 : 0).toFixed(1) + 'px')

      // ---- ENGINEERING responds letter by letter --------------------------
      letterMax = 0
      targetMax = 0
      if (rWord && letters.length) {
        const wx = client.x - rWord.left
        const wy = client.y - rWord.top
        const midY = rWord.height * 0.5
        const R = Math.max(210, rWord.height * 1.6)
        for (let i = 0; i < letters.length; i++) {
          const dx = wx - centres[i]
          const dy = (wy - midY) * 0.55
          const d = Math.hypot(dx, dy)
          const target = inside && d < R ? Math.pow(1 - d / R, 2) : 0
          if (target > targetMax) targetMax = target
          current[i] += (target - current[i]) * 0.16
          const v = current[i]
          if (v > letterMax) letterMax = v
          // The entrance keyframe resolves to translateY(var(--ty)), so the
          // fill state and the interaction share one transform without fighting.
          letters[i].style.setProperty('--ty', (v * -9).toFixed(2) + 'px')
          letters[i].style.setProperty('--p', v.toFixed(3))
        }
      }

      // The ring opens over the word - the cursor acknowledges the one object
      // on the page that can be touched, and nothing else. Published on <html>
      // so the site cursor can scale in CSS, independent of either rAF.
      open += (letterMax - open) * 0.15
      root.style.setProperty('--cursor-open', open.toFixed(3))

      const moved = Math.abs(client.x - prev.x) > 0.01 || Math.abs(client.y - prev.y) > 0.01
      prev.x = client.x
      prev.y = client.y
      // Settle against the TARGETS. The old test compared open to letterMax
      // and let `inside` excuse letterMax entirely, so the stop condition was
      // a relationship between two lagging values rather than arrival - it
      // could park a small residual lift. That residual used to die with the
      // hero; the ring now outlives it, so the loop has to actually arrive.
      const settled =
        Math.abs(eased.x - x) < 0.15 &&
        Math.abs(eased.y - y) < 0.15 &&
        Math.abs(letterMax - targetMax) < 0.004 &&
        Math.abs(open - letterMax) < 0.004
      if (!moved && settled) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      client.x = e.clientX
      client.y = e.clientY
      const within =
        e.clientX >= rScope.left &&
        e.clientX <= rScope.right &&
        e.clientY >= rScope.top &&
        e.clientY <= rScope.bottom

      if (within !== inside) {
        inside = within
        if (within) {
          eased.x = e.clientX - rScope.left
          eased.y = e.clientY - rScope.top
        }
      }
      pointerRef.current = {
        x: e.clientX - rScope.left,
        y: e.clientY - rScope.top,
        active: within,
      }
      start()
    }

    let measureRaf = 0
    const remeasure = () => {
      cancelAnimationFrame(measureRaf)
      measureRaf = requestAnimationFrame(() => {
        measure()
        start() // let letters settle against the corrected geometry
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', remeasure, { passive: true })
    window.addEventListener('resize', remeasure)
    // The headline is transformed while its entrance runs, and
    // getBoundingClientRect reports the transformed box - so the first
    // measurement is stale until the boot settles.
    const onSettled = (e: Event) => {
      // Per letter, not per container: animationend bubbles, and the first
      // event arrives while the later letters are still travelling.
      const el = e.target as HTMLElement | null
      if (el && el.classList && el.classList.contains('hero-eng-letter')) {
        el.classList.add('is-settled')
      }
      remeasure()
    }
    scope.addEventListener('animationend', onSettled)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(measureRaf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', remeasure)
      window.removeEventListener('resize', remeasure)
      scope.removeEventListener('animationend', onSettled)
      // The hero is leaving; the cursor it was opening must close.
      root.style.setProperty('--cursor-open', '0')
    }
  }, [scopeRef, wordRef, pointerRef])

  return null
}

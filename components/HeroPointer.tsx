'use client'

import { useEffect, useRef } from 'react'

/**
 * Interaction layer. One pointer listener, one rAF, and everything downstream
 * expressed as CSS custom properties - the cursor, the per-letter response in
 * ENGINEERING, the scan field, the parallax base and the magnetic CTA.
 *
 * Letter geometry is read from offsetLeft/offsetWidth, which are layout values
 * and therefore immune to the entrance transform; element rects are cached and
 * refreshed on scroll/resize/animationend so pointermove never forces layout.
 */

interface Props {
  scopeRef: React.RefObject<HTMLElement | null>
  typeRef: React.RefObject<HTMLElement | null>
  wordRef: React.RefObject<HTMLElement | null>
  ctaRef: React.RefObject<HTMLElement | null>
  pointerRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

export default function HeroPointer({ scopeRef, typeRef, wordRef, ctaRef, pointerRef }: Props) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = scopeRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!scope || !dot || !ring) return

    let rScope = scope.getBoundingClientRect()
    let rType: DOMRect | null = null
    let rWord: DOMRect | null = null
    let rCta: DOMRect | null = null

    let letters: HTMLElement[] = []
    let centres: number[] = []
    let current: number[] = []

    const measure = () => {
      rScope = scope.getBoundingClientRect()
      rType = typeRef.current ? typeRef.current.getBoundingClientRect() : null
      rWord = wordRef.current ? wordRef.current.getBoundingClientRect() : null
      rCta = ctaRef.current ? ctaRef.current.getBoundingClientRect() : null

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
    let magnet = 0
    let magnetTarget = 0
    let lens = 0
    let lensTarget = 0
    let letterMax = 0

    const frame = () => {
      const type = typeRef.current
      const cta = ctaRef.current

      const x = client.x - rScope.left
      const y = client.y - rScope.top

      eased.x += (x - eased.x) * 0.17
      eased.y += (y - eased.y) * 0.17
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)'
      ring.style.transform =
        'translate3d(' + eased.x + 'px,' + eased.y + 'px,0) translate(-50%,-50%) scale(' +
        (1 + magnet * 1.35).toFixed(3) + ')'

      // Parallax base. Each plane multiplies this by its own depth factor in
      // CSS, so the ratios live with the design rather than in JS.
      scope.style.setProperty('--px', (inside ? (x / rScope.width - 0.5) * -120 : 0).toFixed(1) + 'px')
      scope.style.setProperty('--py', (inside ? (y / rScope.height - 0.5) * -70 : 0).toFixed(1) + 'px')

      // ---- ENGINEERING responds letter by letter --------------------------
      letterMax = 0
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
          current[i] += (target - current[i]) * 0.16
          const v = current[i]
          if (v > letterMax) letterMax = v
          // The entrance keyframe resolves to translateY(var(--ty)), so the
          // fill state and the interaction share one transform without fighting.
          letters[i].style.setProperty('--ty', (v * -9).toFixed(2) + 'px')
          letters[i].style.setProperty('--p', v.toFixed(3))
        }
      }

      // ---- scan field ------------------------------------------------------
      if (type && rType) {
        const lx = client.x - rType.left
        const ly = client.y - rType.top
        const over =
          inside && lx > -80 && ly > -40 && lx < rType.width + 80 && ly < rType.height + 40
        lensTarget = over ? 1 : 0
        lens += (lensTarget - lens) * 0.12
        type.style.setProperty('--lx', lx.toFixed(1) + 'px')
        type.style.setProperty('--ly', ly.toFixed(1) + 'px')
        type.style.setProperty('--lens', lens.toFixed(3))
        if (rWord) {
          // Anchor the scan rail to the word itself so it reads as passing
          // through the letters regardless of how the vh clamps land.
          type.style.setProperty(
            '--scan-y',
            (rWord.top - rType.top + rWord.height * 0.6).toFixed(1) + 'px'
          )
        }
      }

      // ---- magnetic CTA ----------------------------------------------------
      if (cta && rCta) {
        const dx = client.x - (rCta.left + rCta.width / 2)
        const dy = client.y - (rCta.top + rCta.height / 2)
        const d = Math.hypot(dx, dy)
        const R = Math.max(rCta.width, 200)
        const pull = inside && d < R ? 1 - d / R : 0
        magnetTarget = pull
        magnet += (pull - magnet) * 0.15
        cta.style.setProperty('--mag-x', (dx * pull * 0.26).toFixed(2) + 'px')
        cta.style.setProperty('--mag-y', (dy * pull * 0.26).toFixed(2) + 'px')
        cta.style.setProperty('--mag', magnet.toFixed(3))
      }

      const moved = Math.abs(client.x - prev.x) > 0.01 || Math.abs(client.y - prev.y) > 0.01
      prev.x = client.x
      prev.y = client.y
      const settled =
        Math.abs(eased.x - x) < 0.15 &&
        Math.abs(eased.y - y) < 0.15 &&
        Math.abs(magnet - magnetTarget) < 0.004 &&
        Math.abs(lens - lensTarget) < 0.004 &&
        (inside ? true : letterMax < 0.004)
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
        dot.style.opacity = within ? '1' : '0'
        ring.style.opacity = within ? '1' : '0'
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
    }
  }, [scopeRef, typeRef, wordRef, ctaRef, pointerRef])

  return (
    <div className="hero-cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="hero-cursor-ring" />
      <div ref={dotRef} className="hero-cursor-dot" />
    </div>
  )
}

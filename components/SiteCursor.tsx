'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The cursor, for the whole site.
 *
 * It used to live inside the hero, which meant it was clipped by
 * .hero-stage { overflow: hidden } and died at the fold. It is now a fixed
 * layer mounted once in the root layout: viewport coordinates, above every
 * other plane, additive over the native cursor (nothing sets `cursor: none`).
 *
 * The dot tracks raw pointer position; the ring eases behind it. The ring's
 * scale is NOT driven from here - it reads --cursor-open off <html>, which
 * HeroPointer writes while the pointer is over ENGINEERING. Keeping that in
 * CSS means this rAF can idle the moment the pointer settles without freezing
 * a scale animation that is still running somewhere else.
 */
export default function SiteCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Pointing devices only, and only where motion is welcome.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const evaluate = () => setEnabled(fine.matches && !reduced.matches)
    evaluate()
    fine.addEventListener('change', evaluate)
    reduced.addEventListener('change', evaluate)
    return () => {
      fine.removeEventListener('change', evaluate)
      reduced.removeEventListener('change', evaluate)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const client = { x: -9999, y: -9999 }
    const eased = { x: -9999, y: -9999 }
    const prev = { x: -9999, y: -9999 }
    let shown = false
    let raf = 0
    let running = false

    const frame = () => {
      eased.x += (client.x - eased.x) * 0.17
      eased.y += (client.y - eased.y) * 0.17

      dot.style.transform =
        'translate3d(' + client.x + 'px,' + client.y + 'px,0) translate(-50%,-50%)'
      ring.style.transform =
        'translate3d(' + eased.x + 'px,' + eased.y + 'px,0) translate(-50%,-50%)'

      const moved =
        Math.abs(client.x - prev.x) > 0.01 || Math.abs(client.y - prev.y) > 0.01
      prev.x = client.x
      prev.y = client.y
      const settled =
        Math.abs(eased.x - client.x) < 0.15 && Math.abs(eased.y - client.y) < 0.15
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

    const show = () => {
      shown = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      shown = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      client.x = e.clientX
      client.y = e.clientY
      if (!shown) {
        // Arriving, or returning after a fade-out: park both marks on the
        // pointer. Snapping on every hidden->shown edge rather than only the
        // first is what stops the ring travelling across the viewport when
        // the reader leaves at one corner and comes back at another.
        eased.x = e.clientX
        eased.y = e.clientY
        prev.x = e.clientX
        prev.y = e.clientY
        show()
      }
      start()
    }

    // Leaving the window, or losing it, should take the cursor with it. The
    // way back in is onMove - so there is no pointerover listener firing on
    // every element boundary just to undo this.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) hide()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    window.addEventListener('blur', hide)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('blur', hide)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="site-cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="site-cursor-ring">
        <div className="site-cursor-ring-inner" />
      </div>
      <div ref={dotRef} className="site-cursor-dot" />
    </div>
  )
}

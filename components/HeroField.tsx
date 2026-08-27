'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's one graphic device: a signal travelling a path.
 *
 * This is the logo reduced to the scale of a screen - the brand mark is a node
 * with a signal passing through it, and the hero draws the same statement
 * across the empty half of the composition. There is deliberately nothing else
 * here. No node cloud, no orbital arcs, no drifting motes, no plus-mark
 * coordinates: together those said "futuristic website" rather than this one.
 *
 * One canvas, one axis, three stations, one signal.
 */

interface Props {
  theme: 'light' | 'dark'
  pointerRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

/** Station positions along the axis, as a fraction of its length. */
const STATIONS = [0.42, 0.68, 0.94]

/** One pass every 11s: present, but never asking to be watched. */
const CYCLE = 11000
/** Fraction of the cycle the signal is actually in flight. */
const RUN = 0.55

export default function HeroField({ theme, pointerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const host = canvas.parentElement
    if (!host) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let w = 0
    let h = 0
    let raf = 0
    let looping = false
    let onScreen = true
    let startedAt = 0
    const smooth = { x: -9999, y: -9999 }

    // The rect is refreshed on animationend, because the lockup is transformed
    // while its entrance runs and getBoundingClientRect reports the transform.
    let axisY = 0
    let axisX0 = 0
    const measureAxis = () => {
      const box = host.getBoundingClientRect()
      // The short middle line: the space to its right is the composition's
      // real void, so the axis runs out of the type rather than across it.
      const anchor = host.querySelector<HTMLElement>('.hero-word-axis')
      if (!anchor) {
        axisY = box.height * 0.45
        axisX0 = box.width * 0.45
        return
      }
      const r = anchor.getBoundingClientRect()
      axisY = r.top - box.top + r.height * 0.54
      axisX0 = r.right - box.left + Math.min(72, box.width * 0.06)
    }

    const palette = () =>
      themeRef.current === 'dark'
        ? { ink: '226, 232, 235', accent: '124, 226, 232' }
        : { ink: '22, 27, 30', accent: '0, 132, 156' }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureAxis()
    }

    const draw = (now: number) => {
      if (!startedAt) startedAt = now
      const elapsed = now - startedAt
      const reduced = motionQuery.matches
      const t = reduced ? CYCLE * 0.34 : elapsed
      const reveal = reduced ? 1 : Math.min(1, elapsed / 1100)
      const c = palette()

      const p = pointerRef.current
      if (p.active && !reduced) {
        if (smooth.x < -9000) {
          smooth.x = p.x
          smooth.y = p.y
        }
        smooth.x += (p.x - smooth.x) * 0.1
        smooth.y += (p.y - smooth.y) * 0.1
      }
      // Same base the CSS planes use; this plane sits at depth 0.4.
      const ox = p.active && !reduced ? (smooth.x / w - 0.5) * -120 * 0.4 : 0
      const oy = p.active && !reduced ? (smooth.y / h - 0.5) * -70 * 0.4 : 0

      ctx.clearRect(0, 0, w, h)

      const ay = axisY + oy
      const x0 = axisX0 + ox
      const x1 = w * 0.985 + ox
      if (x1 <= x0) {
        if (reduced) looping = false
        else raf = requestAnimationFrame(draw)
        return
      }

      // The path: a hairline fading toward the edge, so the empty side gains
      // scale without being filled in.
      const grad = ctx.createLinearGradient(x0, 0, x1, 0)
      grad.addColorStop(0, 'rgba(' + c.ink + ',' + 0.18 * reveal + ')')
      grad.addColorStop(1, 'rgba(' + c.ink + ',0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x0, ay)
      ctx.lineTo(x1, ay)
      ctx.stroke()

      // The signal, and the stations it lights as it passes.
      const phase = reduced ? 0.34 : (t % CYCLE) / CYCLE
      const head = phase < RUN ? phase / RUN : -1

      for (const f of STATIONS) {
        const x = x0 + (x1 - x0) * f
        const near = head >= 0 ? Math.max(0, 1 - Math.abs(head - f) * 11) : 0
        ctx.fillStyle =
          near > 0.02
            ? 'rgba(' + c.accent + ',' + (0.25 + near * 0.7).toFixed(3) + ')'
            : 'rgba(' + c.ink + ',' + (0.22 * reveal).toFixed(3) + ')'
        ctx.beginPath()
        ctx.arc(x, ay, 1.4 + near * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      if (head >= 0) {
        // A short trail behind the head, drawn as a fading stroke rather than
        // a string of dots - one object, not a particle system.
        const hx = x0 + (x1 - x0) * head
        const tx = Math.max(x0, hx - (x1 - x0) * 0.09)
        if (hx > tx) {
          const trail = ctx.createLinearGradient(tx, 0, hx, 0)
          trail.addColorStop(0, 'rgba(' + c.accent + ',0)')
          trail.addColorStop(1, 'rgba(' + c.accent + ',' + (0.55 * reveal).toFixed(3) + ')')
          ctx.strokeStyle = trail
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(tx, ay)
          ctx.lineTo(hx, ay)
          ctx.stroke()
        }
        ctx.fillStyle = 'rgba(' + c.accent + ',' + (0.85 * reveal).toFixed(3) + ')'
        ctx.beginPath()
        ctx.arc(hx, ay, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      if (reduced) {
        looping = false
        return
      }
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (looping || !onScreen || document.hidden) return
      looping = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      looping = false
      cancelAnimationFrame(raf)
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        if (!looping) requestAnimationFrame(draw)
      }, 160)
    }

    const io = new IntersectionObserver(
      (e) => {
        onScreen = e[0] ? e[0].isIntersecting : true
        if (onScreen) start()
        else stop()
      },
      { threshold: 0 }
    )
    const onVis = () => (document.hidden ? stop() : start())
    const onMotion = () => {
      startedAt = 0
      stop()
      if (motionQuery.matches) requestAnimationFrame(draw)
      else start()
    }

    const onAnimEnd = () => {
      measureAxis()
      if (!looping) requestAnimationFrame(draw)
    }

    resize()
    io.observe(host)
    host.addEventListener('animationend', onAnimEnd)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    motionQuery.addEventListener('change', onMotion)
    start()

    return () => {
      stop()
      io.disconnect()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      host.removeEventListener('animationend', onAnimEnd)
      document.removeEventListener('visibilitychange', onVis)
      motionQuery.removeEventListener('change', onMotion)
    }
  }, [pointerRef])

  return <canvas ref={canvasRef} className="hero-plane" aria-hidden="true" />
}

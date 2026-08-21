'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's spatial environment - three physical depth planes, one rAF loop.
 *
 *   FAR    distant structures, optically blurred, barely moving
 *   MID    isolated nodes, coordinate marks, travelling signals
 *   FRONT  a handful of motes that pass IN FRONT of the typography
 *
 * There are deliberately NO connections between nodes. A mesh of joined dots
 * is the generic "AI network" look; this is a sparse computational space that
 * only resolves when you look at it. Total visible elements: ~21.
 */

interface Props {
  theme: 'light' | 'dark'
  pointerRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

function prng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Node {
  nx: number
  ny: number
  depth: number
  nextAt: number
  activeAt: number
  dx: number
  dy: number
}

interface Signal {
  path: number
  t: number
  speed: number
  wait: number
}

interface Mote {
  nx: number
  ny: number
  r: number
  phase: number
  amp: number
}

// Quadratic bezier routes. The path itself is never drawn - only the signal
// travelling along it, so the space reads as active without a visible web.
const PATHS: [number, number, number, number, number, number][] = [
  [-0.05, 0.2, 0.45, 0.06, 1.05, 0.3],
  [1.05, 0.62, 0.55, 0.92, -0.05, 0.7],
  [0.2, -0.05, 0.86, 0.5, 0.3, 1.05],
]

export default function HeroField({ theme, pointerRef }: Props) {
  const farRef = useRef<HTMLCanvasElement>(null)
  const midRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const far = farRef.current
    const mid = midRef.current
    const front = frontRef.current
    if (!far || !mid || !front) return
    const fc = far.getContext('2d')
    const mc = mid.getContext('2d')
    const nc = front.getContext('2d')
    if (!fc || !mc || !nc) return
    const host = far.parentElement
    if (!host) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let w = 0
    let h = 0
    let raf = 0
    let looping = false
    let onScreen = true
    let frame = 0
    let startedAt = 0
    const smooth = { x: -9999, y: -9999 }

    // Anchors the right-hand axis to the AI line, which is where the real
    // negative space is. Rect is refreshed on animationend because the word is
    // transformed while its entrance runs.
    let axisY = 0
    let axisX0 = 0
    const measureAxis = () => {
      const ai = host.querySelector<HTMLElement>('.hero-word-ai')
      const box = host.getBoundingClientRect()
      if (!ai) {
        axisY = box.height * 0.42
        axisX0 = box.width * 0.45
        return
      }
      const r = ai.getBoundingClientRect()
      axisY = r.top - box.top + r.height * 0.52
      axisX0 = r.right - box.left + Math.min(64, box.width * 0.05)
    }

    let nodes: Node[] = []
    let signals: Signal[] = []
    let motes: Mote[] = []
    let crosses: { nx: number; ny: number }[] = []

    const palette = () => {
      const dark = themeRef.current === 'dark'
      return dark
        ? { ink: '226, 232, 235', accent: '124, 226, 232' }
        : { ink: '22, 27, 30', accent: '0, 132, 156' }
    }

    const build = () => {
      const rand = prng(20260820)
      const narrow = w < 720

      // Five isolated nodes, placed clear of the headline's left mass.
      const seeds: [number, number][] = [
        [0.74, 0.16],
        [0.9, 0.44],
        [0.62, 0.78],
        [0.34, 0.12],
        [0.86, 0.88],
      ]
      nodes = seeds.slice(0, narrow ? 3 : 5).map(([nx, ny], i) => ({
        nx,
        ny,
        depth: 0.45 + rand() * 0.55,
        nextAt: 1200 + i * 2400,
        activeAt: -9999,
        dx: 0,
        dy: 0,
      }))

      crosses = (
        narrow
          ? [
              [0.82, 0.3],
              [0.5, 0.9],
            ]
          : [
              [0.82, 0.3],
              [0.5, 0.92],
              [0.96, 0.68],
              [0.28, 0.24],
              [0.68, 0.55],
            ]
      ).map(([nx, ny]) => ({ nx, ny }))

      signals = (narrow ? [0] : [0, 1, 2]).map((p, i) => ({
        path: p,
        t: rand(),
        speed: 0.000075 + rand() * 0.00006,
        wait: i * 900,
      }))

      motes = Array.from({ length: narrow ? 3 : 5 }, () => ({
        nx: 0.12 + rand() * 0.82,
        ny: 0.15 + rand() * 0.72,
        r: 1 + rand() * 1.3,
        phase: rand() * Math.PI * 2,
        amp: 8 + rand() * 16,
      }))
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      for (const [cv, cx] of [
        [far, fc],
        [mid, mc],
        [front, nc],
      ] as [HTMLCanvasElement, CanvasRenderingContext2D][]) {
        cv.width = Math.round(w * dpr)
        cv.height = Math.round(h * dpr)
        cv.style.width = w + 'px'
        cv.style.height = h + 'px'
        cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      build()
      measureAxis()
    }

    /** FAR - two arcs and a schematic fragment. Redrawn rarely; CSS blurs it. */
    const drawFar = (t: number, reveal: number, ox: number, oy: number) => {
      const c = palette()
      fc.clearRect(0, 0, w, h)
      const spin = t * 0.0000075
      const cx = w * 1.02 + ox
      const cy = h * 0.4 + oy

      fc.lineWidth = 1.25
      for (let i = 0; i < 2; i++) {
        const r = w * (0.52 + i * 0.23)
        const a0 = Math.PI * (0.72 + i * 0.06) + spin * (i ? -1 : 1)
        fc.strokeStyle = 'rgba(' + c.ink + ',' + (0.1 - i * 0.028) * reveal + ')'
        fc.beginPath()
        fc.arc(cx, cy, r, a0, a0 + Math.PI * 0.42)
        fc.stroke()
      }

      // Angular schematic fragment - a piece of a plan, not a network.
      const frag: [number, number][] = [
        [0.04, 0.9],
        [0.17, 0.9],
        [0.23, 0.79],
        [0.39, 0.79],
        [0.44, 0.7],
      ]
      fc.strokeStyle = 'rgba(' + c.ink + ',' + 0.085 * reveal + ')'
      fc.beginPath()
      frag.forEach(([nx, ny], i) => {
        const x = nx * w + ox
        const y = ny * h + oy
        if (i === 0) fc.moveTo(x, y)
        else fc.lineTo(x, y)
      })
      fc.stroke()
    }

    const draw = (now: number) => {
      if (!startedAt) startedAt = now
      const elapsed = now - startedAt
      const reduced = motionQuery.matches
      const t = reduced ? 4200 : elapsed
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
      const px = p.active ? smooth.x : -9999
      const py = p.active ? smooth.y : -9999
      // Same base the CSS planes use; each plane applies its own depth factor.
      //   far 0.15  |  mid 0.4  |  type 0.05 (CSS)  |  grid 0.2 (CSS)  |  front 0.75
      const baseX = p.active && !reduced ? (smooth.x / w - 0.5) * -120 : 0
      const baseY = p.active && !reduced ? (smooth.y / h - 0.5) * -70 : 0

      if (frame % 6 === 0 || reduced) drawFar(t, reveal, baseX * 0.15, baseY * 0.15)

      // ---- MID -------------------------------------------------------------
      mc.clearRect(0, 0, w, h)

      // coordinate marks
      mc.lineWidth = 1
      mc.strokeStyle = 'rgba(' + c.ink + ',' + 0.16 * reveal + ')'
      for (const cr of crosses) {
        const x = cr.nx * w + baseX * 0.4
        const y = cr.ny * h + baseY * 0.4
        mc.beginPath()
        mc.moveTo(x - 4, y)
        mc.lineTo(x + 4, y)
        mc.moveTo(x, y - 4)
        mc.lineTo(x, y + 4)
        mc.stroke()
      }

      // Right-hand axis. One faint line reaching for the edge gives the empty
      // side scale without filling it - the negative space stays negative.
      {
        const ay = axisY + baseY * 0.4
        const x0 = axisX0 + baseX * 0.4
        const x1 = w * 0.985 + baseX * 0.4
        if (x1 > x0) {
          const grad = mc.createLinearGradient(x0, 0, x1, 0)
          grad.addColorStop(0, 'rgba(' + c.ink + ',' + 0.16 * reveal + ')')
          grad.addColorStop(1, 'rgba(' + c.ink + ',0)')
          mc.strokeStyle = grad
          mc.lineWidth = 1
          mc.beginPath()
          mc.moveTo(x0, ay)
          mc.lineTo(x1, ay)
          mc.stroke()

          // one signal every ~9s, flaring the points it passes
          const cycle = 9000
          const ph = reduced ? 0.34 : ((t % cycle) / cycle)
          const head = ph < 0.62 ? ph / 0.62 : -1
          for (let k = 0; k < 3; k++) {
            const f = 0.42 + k * 0.26
            const x = x0 + (x1 - x0) * f
            const near = head >= 0 ? Math.max(0, 1 - Math.abs(head - f) * 11) : 0
            mc.fillStyle =
              near > 0.02
                ? 'rgba(' + c.accent + ',' + (0.25 + near * 0.7).toFixed(3) + ')'
                : 'rgba(' + c.ink + ',' + (0.22 * reveal).toFixed(3) + ')'
            mc.beginPath()
            mc.arc(x, ay, 1.4 + near * 1.6, 0, Math.PI * 2)
            mc.fill()
          }
          if (head >= 0) {
            const hx = x0 + (x1 - x0) * head
            mc.fillStyle = 'rgba(' + c.accent + ',' + (0.8 * reveal).toFixed(3) + ')'
            mc.beginPath()
            mc.arc(hx, ay, 1.7, 0, Math.PI * 2)
            mc.fill()
          }
        }
      }

      // travelling signals - short trail, no visible route
      for (const s of signals) {
        if (!reduced) {
          if (s.wait > 0) {
            s.wait -= 16.7
          } else {
            s.t += s.speed * 16.7
            if (s.t > 1) {
              s.t = 0
              s.wait = 1400 + ((s.path * 977) % 2600)
              s.path = (s.path + 1) % PATHS.length
            }
          }
        }
        if (s.wait > 0) continue
        const [x0, y0, x1, y1, x2, y2] = PATHS[s.path]
        for (let k = 0; k < 9; k++) {
          const tt = s.t - k * 0.012
          if (tt < 0) continue
          const u = 1 - tt
          let x = (u * u * x0 + 2 * u * tt * x1 + tt * tt * x2) * w
          let y = (u * u * y0 + 2 * u * tt * y1 + tt * tt * y2) * h
          // bend gently toward the cursor
          if (p.active) {
            const d = Math.hypot(x - px, y - py)
            if (d < 240) {
              const pull = (1 - d / 240) ** 2 * 16
              x += ((px - x) / (d || 1)) * pull
              y += ((py - y) / (d || 1)) * pull
            }
          }
          const fade = (1 - k / 9) * Math.sin(Math.min(1, s.t) * Math.PI)
          mc.fillStyle = 'rgba(' + c.accent + ',' + (0.75 * fade * reveal).toFixed(3) + ')'
          mc.beginPath()
          mc.arc(x, y, k === 0 ? 1.9 : 1.2, 0, Math.PI * 2)
          mc.fill()
        }
      }

      // isolated nodes with occasional activation
      for (const n of nodes) {
        let x = n.nx * w + baseX * 0.4 * n.depth
        let y = n.ny * h + baseY * 0.4 * n.depth

        let near = 0
        if (p.active) {
          const dx = x - px
          const dy = y - py
          const d = Math.hypot(dx, dy)
          if (d < 200 && d > 0.001) {
            near = (1 - d / 200) ** 2
            const push = near * 13 * n.depth
            n.dx += ((dx / d) * push - n.dx) * 0.09
            n.dy += ((dy / d) * push - n.dy) * 0.09
          } else {
            n.dx += -n.dx * 0.07
            n.dy += -n.dy * 0.07
          }
        } else {
          n.dx += -n.dx * 0.07
          n.dy += -n.dy * 0.07
        }
        x += n.dx
        y += n.dy

        if (!reduced && t > n.nextAt) {
          n.activeAt = t
          n.nextAt = t + 6000 + Math.random() * 5000
        }
        const since = t - n.activeAt
        const act = since >= 0 && since < 1700 ? 1 - since / 1700 : 0

        if (act > 0) {
          mc.strokeStyle = 'rgba(' + c.accent + ',' + (act * 0.38).toFixed(3) + ')'
          mc.lineWidth = 1
          mc.beginPath()
          mc.arc(x, y, 4 + (1 - act) * 26, 0, Math.PI * 2)
          mc.stroke()
        }

        const a = (0.3 + n.depth * 0.22 + act * 0.45 + near * 0.4) * reveal
        const lit = act > 0.15 || near > 0.15
        mc.fillStyle = lit
          ? 'rgba(' + c.accent + ',' + Math.min(1, a + 0.25).toFixed(3) + ')'
          : 'rgba(' + c.ink + ',' + a.toFixed(3) + ')'
        mc.beginPath()
        mc.arc(x, y, 1.6 + n.depth * 1.5, 0, Math.PI * 2)
        mc.fill()

        if (near > 0.05) {
          mc.strokeStyle = 'rgba(' + c.accent + ',' + (near * 0.4).toFixed(3) + ')'
          mc.beginPath()
          mc.arc(x, y, 9 + near * 11, 0, Math.PI * 2)
          mc.stroke()
        }
      }

      // ---- FRONT -----------------------------------------------------------
      // Nearest plane: strongest parallax, drawn above the typography.
      nc.clearRect(0, 0, w, h)
      for (const m of motes) {
        const drift = reduced ? 0 : Math.sin(t * 0.00022 + m.phase) * m.amp
        const driftY = reduced ? 0 : Math.cos(t * 0.00017 + m.phase) * m.amp * 0.5
        const x = m.nx * w + drift + baseX * 0.75
        const y = m.ny * h + driftY + baseY * 0.75
        nc.fillStyle = 'rgba(' + c.accent + ',' + (0.5 * reveal).toFixed(3) + ')'
        nc.beginPath()
        nc.arc(x, y, m.r, 0, Math.PI * 2)
        nc.fill()
      }

      frame++
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

  return (
    <>
      <canvas ref={farRef} className="hero-plane hero-plane-far" aria-hidden="true" />
      <canvas ref={midRef} className="hero-plane hero-plane-mid" aria-hidden="true" />
      <canvas ref={frontRef} className="hero-plane hero-plane-front" aria-hidden="true" />
    </>
  )
}

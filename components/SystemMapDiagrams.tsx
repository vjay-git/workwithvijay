'use client'

import { useEffect, useRef } from 'react'

/**
 * Four capability diagrams. Each uses a genuinely different topology - a
 * fan-in chain, a loop, a hub, a stack - so they read as four stages of one
 * system rather than four copies of a template.
 *
 * Motion is anime.js, and it says one thing: THE SYSTEM ASSEMBLES, THEN IT
 * CARRIES A SIGNAL. On arrival the wires draw themselves, the nodes seat, the
 * labels resolve; then a signal runs the diagram's real route and each node it
 * passes flares as it goes. The flare timing is derived at runtime by sampling
 * the route and finding where each node actually sits on it, so the light and
 * the signal are in genuine sync rather than approximately staged.
 *
 * This is the hero's device - a signal travelling a path - at diagram scale,
 * and it is the only motion here. The old looping CSS dash was replaced rather
 * than joined: two signals on one path is the busy-ness we just removed.
 *
 * Everything degrades to a fully drawn, static diagram: reduced motion returns
 * before arming, and a failed module load unarms. anime.js is imported
 * dynamically, so it costs the home page nothing until this section mounts.
 */

const VB = '0 0 340 190'

/** How long the signal takes to travel one full route. */
const TRAVEL = 2600
/** Quiet interval between passes, so the loop never nags. */
const REST = 1500

type AnimeModule = typeof import('animejs')

function Label({
  x,
  y,
  children,
  anchor = 'middle',
}: {
  x: number
  y: number
  children: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text className="sysd-label" x={x} y={y} textAnchor={anchor}>
      {children}
    </text>
  )
}

/**
 * Locates each node on the route by sampling the path, so a flare fires at the
 * exact moment the signal reaches it. Nodes that sit off the route (a branch
 * that this pass does not travel) are left out rather than faked.
 */
function stationsOn(route: SVGPathElement, nodes: SVGCircleElement[]) {
  const len = route.getTotalLength()
  if (!len) return []
  const SAMPLES = 240
  const points: { x: number; y: number }[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const p = route.getPointAtLength((i / SAMPLES) * len)
    points.push({ x: p.x, y: p.y })
  }

  const found: { node: SVGCircleElement; r: number; at: number }[] = []
  for (const node of nodes) {
    const cx = Number(node.getAttribute('cx'))
    const cy = Number(node.getAttribute('cy'))
    const r = Number(node.getAttribute('r')) || 4
    let best = 0
    let bestD = Infinity
    for (let i = 0; i < points.length; i++) {
      const dx = points[i].x - cx
      const dy = points[i].y - cy
      const d = dx * dx + dy * dy
      if (d < bestD) {
        bestD = d
        best = i / SAMPLES
      }
    }
    // 5 user units of tolerance: on the wire, not merely near it.
    if (Math.sqrt(bestD) <= 5) found.push({ node, r, at: best })
  }
  return found
}

function build(root: SVGSVGElement, anime: AnimeModule) {
  const { createTimeline, stagger, svg, utils } = anime

  const draws = Array.from(root.querySelectorAll<SVGGeometryElement>('.sysd-draw'))
  const nodes = Array.from(root.querySelectorAll<SVGCircleElement>('.sysd-node'))
  const labels = Array.from(root.querySelectorAll<SVGTextElement>('.sysd-label'))
  const route = root.querySelector<SVGPathElement>('.sysd-signal')
  const head = root.querySelector<SVGCircleElement>('.sysd-head')
  if (!route || !head) return null

  const radii = nodes.map((n) => Number(n.getAttribute('r')) || 4)
  const stations = stationsOn(route, nodes)

  const wires = svg.createDrawable(draws)
  const [signal] = svg.createDrawable(route)

  // Off-state, applied before the stage is revealed so nothing flashes.
  utils.set(wires, { draw: '0 0' })
  utils.set(signal, { draw: '0 0' })
  utils.set(head, { opacity: 0 })
  utils.set(labels, { opacity: 0 })
  nodes.forEach((n) => utils.set(n, { r: 0 }))

  // ---- assembly: the diagram builds itself -------------------------------
  const intro = createTimeline({ autoplay: false })
  intro.add(wires, {
    draw: ['0 0', '0 1'],
    duration: 560,
    delay: stagger(80),
    ease: 'inOutQuad',
  }, 0)
  nodes.forEach((n, i) => {
    intro.add(n, { r: [0, radii[i]], duration: 420, ease: 'outBack' }, 220 + i * 80)
  })
  intro.add(labels, {
    opacity: [0, 1],
    duration: 440,
    delay: stagger(60),
    ease: 'outQuad',
  }, 380)

  // ---- the signal: one pass, then rest ----------------------------------
  const { translateX, translateY } = svg.createMotionPath(route)
  const loop = createTimeline({ loop: true, autoplay: false })

  loop.add(signal, { draw: ['0 0', '0 1'], duration: TRAVEL, ease: 'linear' }, 0)
  loop.add(head, { translateX, translateY, duration: TRAVEL, ease: 'linear' }, 0)
  loop.add(head, { opacity: [0, 1], duration: 180, ease: 'outQuad' }, 0)

  // Each station lights as the signal reaches it - derived, not choreographed.
  for (const s of stations) {
    loop.add(
      s.node,
      { r: [s.r, s.r * 2.15, s.r], duration: 520, ease: 'outQuad' },
      Math.max(0, s.at * TRAVEL - 130)
    )
  }

  // The trail retracts from the tail, so the route clears the way it filled.
  loop.add(head, { opacity: [1, 0], duration: 300, ease: 'inQuad' }, TRAVEL - 180)
  loop.add(signal, { draw: ['0 1', '1 1'], duration: 760, ease: 'inOutQuad' }, TRAVEL + 120)
  // Dead time before the next pass. Nothing animates; the timeline just waits.
  loop.add(head, { opacity: 0, duration: REST }, TRAVEL + 880)

  root.classList.remove('is-armed')

  let entered = false
  let onScreen = false

  const resume = () => {
    if (!entered || !onScreen || document.hidden) return
    loop.play()
  }
  const suspend = () => loop.pause()

  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (!e) return
      onScreen = e.isIntersecting
      if (!onScreen) {
        suspend()
        return
      }
      if (!entered) {
        entered = true
        intro.play()
        // The signal starts as the last label resolves, not before.
        window.setTimeout(resume, 900)
        return
      }
      resume()
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
  )
  io.observe(root)

  const onVis = () => (document.hidden ? suspend() : resume())
  document.addEventListener('visibilitychange', onVis)

  return () => {
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    intro.pause()
    loop.pause()
    // Detach every target, then restore the authored state by hand. Without
    // this a remount inherits whatever inline values the timelines stopped on
    // - a half-drawn wire, a node still at r="0".
    utils.remove(draws)
    utils.remove(nodes)
    utils.remove(labels)
    utils.remove(route)
    utils.remove(head)
    utils.set(wires, { draw: '0 1' })
    utils.set(signal, { draw: '0 1' })
    utils.set(labels, { opacity: 1 })
    utils.set(head, { opacity: 0 })
    nodes.forEach((n, i) => utils.set(n, { r: radii[i] }))
  }
}

/**
 * The shared shell. Arms the SVG (hidden), loads anime.js, then hands off. If
 * anything fails - reduced motion, a failed import, a missing route - the
 * diagram is simply shown as authored, fully drawn.
 */
function Sysd({ children }: { children: React.ReactNode }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let teardown: (() => void) | null = null
    const unarm = () => root.classList.remove('is-armed')

    root.classList.add('is-armed')

    import('animejs')
      .then((anime) => {
        if (cancelled) return unarm()
        try {
          teardown = build(root, anime)
        } catch {
          teardown = null
        }
        if (!teardown) unarm()
      })
      .catch(unarm)

    return () => {
      cancelled = true
      if (teardown) teardown()
      unarm()
    }
  }, [])

  return (
    <svg ref={ref} viewBox={VB} className="sysd" fill="none" aria-hidden="true">
      {children}
    </svg>
  )
}

/** 01 - documents fan in, then a linear retrieval chain. */
export function RagDiagram() {
  return (
    <Sysd>
      {[52, 78, 104].map((y, i) => (
        <rect key={i} className="sysd-doc sysd-draw" x="14" y={y} width="34" height="20" rx="2" />
      ))}

      {/* One <path> per segment: a drawable renders a multi-subpath `d` as a
          single dash run, which makes the pen jump between the branches. */}
      <path className="sysd-wire sysd-draw" d="M48 62 L110 95" />
      <path className="sysd-wire sysd-draw" d="M48 88 L110 95" />
      <path className="sysd-wire sysd-draw" d="M48 114 L110 95" />
      <path className="sysd-wire sysd-draw" d="M110 95 H175" />
      <path className="sysd-wire sysd-draw" d="M175 95 H240" />
      <path className="sysd-wire sysd-draw" d="M240 95 H305" />

      <path className="sysd-signal" d="M48 88 L110 95 H175 H240 H305" />

      {[110, 175, 240, 305].map((x) => (
        <circle key={x} className="sysd-node" cx={x} cy="95" r="4" />
      ))}
      <circle className="sysd-head" r="2.6" />

      <Label x={31} y={140}>DOCUMENTS</Label>
      <Label x={110} y={117}>EMBEDDINGS</Label>
      <Label x={175} y={80}>RETRIEVAL</Label>
      <Label x={240} y={117}>CONTEXT</Label>
      <Label x={305} y={80}>MODEL</Label>
    </Sysd>
  )
}

/** 02 - a loop: verification returns to reasoning before anything acts. */
export function AgentDiagram() {
  return (
    <Sysd>
      <path className="sysd-wire sysd-draw" d="M40 135 H110" />
      <path className="sysd-wire sysd-draw" d="M110 135 H185" />
      <path className="sysd-wire sysd-draw" d="M185 135 H255" />
      {/* the return arc is the whole point - agents that re-reason */}
      <path className="sysd-wire sysd-wire-soft sysd-draw" d="M255 135 C255 62 110 62 110 135" />
      <path className="sysd-wire sysd-draw" d="M255 135 L305 92" />

      <path className="sysd-signal" d="M40 135 H110 H185 H255 C255 62 110 62 110 135" />

      {[40, 110, 185, 255].map((x) => (
        <circle key={x} className="sysd-node" cx={x} cy="135" r="4" />
      ))}
      <circle className="sysd-node sysd-node-out" cx="305" cy="92" r="4" />
      <circle className="sysd-head" r="2.6" />

      <Label x={40} y={158}>INPUT</Label>
      <Label x={110} y={158}>REASON</Label>
      <Label x={185} y={158}>TOOL</Label>
      <Label x={255} y={158}>VERIFY</Label>
      <Label x={305} y={78}>ACTION</Label>
    </Sysd>
  )
}

/**
 * 03 - a radial hub. The shape itself says "one intelligence reaching into
 * several systems", so the diagram survives the hide-the-text test; a row of
 * boxes would have needed its labels to mean anything.
 */
export function IntegrationDiagram() {
  return (
    <Sysd>
      <path className="sysd-wire sysd-draw" d="M170 95 L62 46" />
      <path className="sysd-wire sysd-draw" d="M170 95 L62 146" />
      <path className="sysd-wire sysd-draw" d="M170 95 L292 95" />

      {/* one continuous route: a request arrives from the app, passes through
          the model, and reaches the data - the traffic the hub exists for */}
      <path className="sysd-signal" d="M62 46 L170 95 L292 95" />

      <circle className="sysd-node sysd-node-out" cx="170" cy="95" r="6.5" />
      <circle className="sysd-node" cx="62" cy="46" r="4" />
      <circle className="sysd-node" cx="62" cy="146" r="4" />
      <circle className="sysd-node" cx="292" cy="95" r="4" />
      <circle className="sysd-head" r="2.6" />

      <Label x={62} y={32}>APP</Label>
      <Label x={62} y={166}>API</Label>
      <Label x={292} y={80}>DATA</Label>
      <Label x={170} y={120}>AI</Label>
    </Sysd>
  )
}

/** 04 - strata: one signal passing down through every layer we own. */
export function FullStackDiagram() {
  const rows = ['INTERFACE', 'API', 'AI', 'DATA', 'INFRASTRUCTURE']
  return (
    <Sysd>
      {rows.map((r, i) => {
        const y = 30 + i * 33
        return (
          <g key={r}>
            <path className="sysd-wire sysd-draw" d={`M112 ${y} H312`} />
            <circle className="sysd-node" cx="196" cy={y} r="3.4" />
            <text className="sysd-label" x="100" y={y + 3} textAnchor="end">
              {r}
            </text>
          </g>
        )
      })}
      <path className="sysd-wire sysd-wire-soft sysd-draw" d="M196 30 V162" />
      <path className="sysd-signal" d="M196 30 V162" />
      <circle className="sysd-head" r="2.6" />
    </Sysd>
  )
}

export const DIAGRAMS = {
  rag: RagDiagram,
  agents: AgentDiagram,
  integrations: IntegrationDiagram,
  fullstack: FullStackDiagram,
}

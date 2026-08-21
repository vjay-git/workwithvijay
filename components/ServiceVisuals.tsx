'use client'

/**
 * One visual per layer, each a different topology so the four read as parts of
 * an architecture rather than four versions of the same drawing:
 *
 *   01 bands      - user, interface surface, system
 *   02 chain+return - the reasoning loop, vertical
 *   03 branch     - a decision that splits and rejoins
 *   04 containment - nested frames; infrastructure holds everything
 *
 * Nodes carry data-node so the page-level pointer controller can address them.
 * Ambient motion is CSS on `.svcv-flow`; nothing here costs a rAF.
 */

const VB = '0 0 340 220'

function L({ x, y, children, anchor = 'middle' }: {
  x: number
  y: number
  children: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text className="svcv-label" x={x} y={y} textAnchor={anchor}>
      {children}
    </text>
  )
}

/** 01 - three bands: people, the surface, the system underneath. */
export function InterfaceVisual() {
  const blocks = [
    { x: 96, y: 92, w: 64, h: 12 },
    { x: 96, y: 110, w: 40, h: 30 },
    { x: 142, y: 110, w: 18, h: 14 },
    { x: 142, y: 130, w: 18, h: 10 },
    { x: 172, y: 92, w: 72, h: 34 },
    { x: 172, y: 132, w: 44, h: 8 },
  ]
  return (
    <svg viewBox={VB} className="svcv" fill="none" aria-hidden="true">
      <path className="svcv-wire" d="M170 44V88 M170 146v40" />
      <path className="svcv-flow" d="M170 44V186" />

      <circle className="svcv-node" data-node cx="170" cy="38" r="4.5" />
      <L x={170} y={24}>User</L>

      {/* the surface: an abstract arrangement, not a browser frame */}
      <rect className="svcv-frame" x="88" y="84" width="164" height="64" rx="2" />
      {blocks.map((b, i) => (
        <rect
          key={i}
          className="svcv-block"
          data-node
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="1"
        />
      ))}
      <L x={80} y={118} anchor="end">Interface</L>

      <circle className="svcv-node" data-node cx="170" cy="192" r="4.5" />
      <L x={170} y={210}>System</L>
    </svg>
  )
}

/** 02 - a vertical reasoning chain; verification returns before acting. */
export function IntelligenceVisual() {
  const rows = ['Input', 'Retrieve', 'Reason', 'Act', 'Verify']
  return (
    <svg viewBox={VB} className="svcv" fill="none" aria-hidden="true">
      <path className="svcv-wire" d="M130 26V194" />
      {/* the return: verification feeds back into reasoning */}
      <path className="svcv-wire svcv-wire-soft" d="M130 194C210 194 210 110 130 110" />
      <path className="svcv-flow" d="M130 26V194C210 194 210 110 130 110" />

      {rows.map((r, i) => {
        const y = 26 + i * 42
        return (
          <g key={r}>
            <circle className="svcv-node" data-node cx="130" cy={y} r="4.5" />
            <text className="svcv-label" x="114" y={y + 3} textAnchor="end">
              {r}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** 03 - a branch: the decision splits, one path retries, one completes. */
export function OperationsVisual() {
  return (
    <svg viewBox={VB} className="svcv" fill="none" aria-hidden="true">
      <path className="svcv-wire" d="M36 110H104 M104 110h44" />
      <path className="svcv-wire" d="M172 92 216 56H292" />
      <path className="svcv-wire svcv-wire-soft" d="M172 128 216 168H104V118" />
      <path className="svcv-flow" d="M36 110H148 M172 92 216 56H292" />

      <circle className="svcv-node" data-node cx="36" cy="110" r="4.5" />
      <circle className="svcv-node" data-node cx="104" cy="110" r="4.5" />
      {/* decision */}
      <rect
        className="svcv-diamond"
        data-node
        x="148"
        y="88"
        width="44"
        height="44"
        rx="2"
        transform="rotate(45 170 110)"
      />
      <circle className="svcv-node" data-node cx="216" cy="56" r="4.5" />
      <circle className="svcv-node svcv-node-out" data-node cx="292" cy="56" r="4.5" />

      <L x={36} y={132}>Trigger</L>
      <L x={104} y={132}>Workflow</L>
      <L x={170} y={166}>Decision</L>
      <L x={216} y={42}>Action</L>
      <L x={292} y={42}>Result</L>
      <text className="svcv-label svcv-label-soft" x="120" y="186" textAnchor="start">
        Retry
      </text>
    </svg>
  )
}

/** 04 - containment: infrastructure holds the layers above it. */
export function InfrastructureVisual() {
  const frames = [
    { i: 0, label: 'Infrastructure' },
    { i: 1, label: 'Data' },
    { i: 2, label: 'AI' },
    { i: 3, label: 'API' },
    { i: 4, label: 'Interface' },
  ]
  return (
    <svg viewBox={VB} className="svcv" fill="none" aria-hidden="true">
      {frames.map(({ i, label }) => {
        const inset = i * 17
        const x = 74 + inset
        const y = 20 + inset
        const w = 236 - inset * 2
        const h = 180 - inset * 2
        return (
          <g key={label}>
            <rect
              className={'svcv-frame' + (i === 4 ? ' svcv-frame-key' : '')}
              data-node
              x={x}
              y={y}
              width={w}
              height={h}
              rx="2"
            />
            <text className="svcv-label" x={x - 8} y={y + 9} textAnchor="end">
              {label}
            </text>
          </g>
        )
      })}
      {/* a probe reading down through every layer */}
      <path className="svcv-wire svcv-wire-soft" d="M192 20v180" />
      <path className="svcv-flow" d="M192 20v180" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} className="svcv-tick" cx="192" cy={20 + i * 17 + 4} r="1.6" />
      ))}
    </svg>
  )
}

export const VISUALS = {
  interface: InterfaceVisual,
  intelligence: IntelligenceVisual,
  operations: OperationsVisual,
  infrastructure: InfrastructureVisual,
}

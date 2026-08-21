'use client'

/**
 * Four capability diagrams. Each uses a genuinely different topology - a
 * fan-in chain, a loop, a hub, a stack - so they read as four stages of one
 * system rather than four copies of a template.
 *
 * All motion is CSS on `.sysd-flow` (a dashed signal travelling its path) and
 * `.sysd-node`, so nothing costs a rAF. Labels are real <text>, not images.
 */

const VB = '0 0 340 190'

function Label({ x, y, children, anchor = 'middle' }: {
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

/** 01 - documents fan in, then a linear retrieval chain. */
export function RagDiagram() {
  const chain = 'M110 95 H175 M175 95 H240 M240 95 H305'
  return (
    <svg viewBox={VB} className="sysd" fill="none" aria-hidden="true">
      {[52, 78, 104].map((y, i) => (
        <rect key={i} className="sysd-doc" x="14" y={y} width="34" height="20" rx="2" />
      ))}
      <path className="sysd-wire" d="M48 62 L110 95 M48 88 L110 95 M48 114 L110 95" />
      <path className="sysd-wire" d={chain} />
      <path className="sysd-flow" d="M48 88 L110 95 H175 H240 H305" />

      {[110, 175, 240, 305].map((x, i) => (
        <circle key={x} className="sysd-node" cx={x} cy="95" r="4" style={{ animationDelay: i * 420 + 'ms' }} />
      ))}

      <Label x={31} y={140}>DOCUMENTS</Label>
      <Label x={110} y={117}>EMBEDDINGS</Label>
      <Label x={175} y={80}>RETRIEVAL</Label>
      <Label x={240} y={117}>CONTEXT</Label>
      <Label x={305} y={80}>MODEL</Label>
    </svg>
  )
}

/** 02 - a loop: verification returns to reasoning before anything acts. */
export function AgentDiagram() {
  return (
    <svg viewBox={VB} className="sysd" fill="none" aria-hidden="true">
      <path className="sysd-wire" d="M40 135 H110 M110 135 H185 M185 135 H255" />
      {/* the return arc is the whole point - agents that re-reason */}
      <path className="sysd-wire sysd-wire-soft" d="M255 135 C255 62 110 62 110 135" />
      <path className="sysd-wire" d="M255 135 L305 92" />
      <path className="sysd-flow" d="M40 135 H110 H185 H255 C255 62 110 62 110 135" />

      {[40, 110, 185, 255].map((x, i) => (
        <circle key={x} className="sysd-node" cx={x} cy="135" r="4" style={{ animationDelay: i * 420 + 'ms' }} />
      ))}
      <circle className="sysd-node sysd-node-out" cx="305" cy="92" r="4" style={{ animationDelay: '1680ms' }} />

      <Label x={40} y={158}>INPUT</Label>
      <Label x={110} y={158}>REASON</Label>
      <Label x={185} y={158}>TOOL</Label>
      <Label x={255} y={158}>VERIFY</Label>
      <Label x={305} y={78}>ACTION</Label>
    </svg>
  )
}

/**
 * 03 - a radial hub. The shape itself says "one intelligence reaching into
 * several systems", so the diagram survives the hide-the-text test; a row of
 * boxes would have needed its labels to mean anything.
 */
export function IntegrationDiagram() {
  return (
    <svg viewBox={VB} className="sysd" fill="none" aria-hidden="true">
      <path className="sysd-wire" d="M170 95 L62 46 M170 95 L62 146 M170 95 L292 95" />
      {/* traffic runs both ways: out to data, back in from the app */}
      <path className="sysd-flow" d="M170 95 L292 95" />
      <path className="sysd-flow sysd-flow-alt" d="M62 46 L170 95" />

      <circle className="sysd-node sysd-node-out" cx="170" cy="95" r="6.5" />
      <circle className="sysd-node" cx="62" cy="46" r="4" style={{ animationDelay: '300ms' }} />
      <circle className="sysd-node" cx="62" cy="146" r="4" style={{ animationDelay: '700ms' }} />
      <circle className="sysd-node" cx="292" cy="95" r="4" style={{ animationDelay: '1100ms' }} />

      <Label x={62} y={32}>APP</Label>
      <Label x={62} y={166}>API</Label>
      <Label x={292} y={80}>DATA</Label>
      <Label x={170} y={120}>AI</Label>
    </svg>
  )
}

/** 04 - strata: one signal passing down through every layer we own. */
export function FullStackDiagram() {
  const rows = ['INTERFACE', 'API', 'AI', 'DATA', 'INFRASTRUCTURE']
  return (
    <svg viewBox={VB} className="sysd" fill="none" aria-hidden="true">
      {rows.map((r, i) => {
        const y = 30 + i * 33
        return (
          <g key={r}>
            <path className="sysd-wire" d={`M112 ${y} H312`} />
            <circle className="sysd-node" cx="196" cy={y} r="3.4" style={{ animationDelay: i * 380 + 'ms' }} />
            <text className="sysd-label" x="100" y={y + 3} textAnchor="end">
              {r}
            </text>
          </g>
        )
      })}
      <path className="sysd-wire sysd-wire-soft" d="M196 30 V162" />
      <path className="sysd-flow" d="M196 30 V162" />
    </svg>
  )
}

export const DIAGRAMS = {
  rag: RagDiagram,
  agents: AgentDiagram,
  integrations: IntegrationDiagram,
  fullstack: FullStackDiagram,
}

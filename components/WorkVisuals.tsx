'use client'

/**
 * One architecture drawing per case study. Each is the actual topology of the
 * system it belongs to, so the four read as different machines rather than four
 * versions of one diagram:
 *
 *   01 chain      - a fan-in into a linear retrieval pipeline
 *   02 branch     - one agent with four addressable paths hanging off it
 *   03 containment - a request path enclosed by the infrastructure that runs it
 *   04 pool+gate  - parallel agents whose results pass an evaluation before exit
 *
 * Nodes carry data-node so the page-level pointer controller can address them.
 * Motion is CSS on `.wkv-flow` / `.wkv-flow-b`; nothing here costs a rAF.
 * Secondary geometry carries `wkv-detail` and is dropped on narrow screens so
 * the primary path stays large instead of shrinking.
 */

const VB = '0 0 340 300'

function L({
  x,
  y,
  children,
  anchor = 'start',
  soft = false,
}: {
  x: number
  y: number
  children: string
  anchor?: 'start' | 'middle' | 'end'
  soft?: boolean
}) {
  return (
    <text
      className={'wkv-label' + (soft ? ' wkv-label-soft' : '')}
      x={x}
      y={y}
      textAnchor={anchor}
    >
      {children}
    </text>
  )
}

/** 01 - documents converge into an index, then one path to the answer. */
export function RagVisual() {
  const docs = [9, 43, 77]
  return (
    <svg viewBox={VB} className="wkv" fill="none" aria-hidden="true">
      {/* the corpus: three sheets that become one index */}
      {docs.map((x) => (
        <g key={x}>
          <rect className="wkv-frame" x={x} y="10" width="26" height="30" rx="1" />
          <path
            className="wkv-wire-soft wkv-detail"
            d={`M${x + 6} 19H${x + 20} M${x + 6} 25H${x + 20} M${x + 6} 31H${x + 15}`}
          />
        </g>
      ))}
      <path className="wkv-wire" d="M22 40 56 74 M56 40V74 M90 40 56 74" />
      <L x={118} y={28}>Documents</L>

      <path className="wkv-wire" d="M56 80V276" />
      <path className="wkv-flow" d="M56 40V276" />

      {[
        ['Index', 80],
        ['Retrieval', 129],
        ['Context', 178],
        ['LLM', 227],
      ].map(([label, y]) => (
        <g key={label as string}>
          <circle className="wkv-node" data-node cx="56" cy={y as number} r="4.5" />
          <L x={72} y={(y as number) + 3}>{label as string}</L>
        </g>
      ))}

      {/* ranked passages - the shape retrieval actually returns */}
      <path
        className="wkv-wire-soft wkv-detail"
        d="M156 123H196 M156 129H186 M156 135H174"
      />

      <circle className="wkv-node wkv-node-out" data-node cx="56" cy="276" r="4.5" />
      <L x={72} y={279}>Answer</L>
    </svg>
  )
}

/** 02 - a single agent with four paths it can take; the fallback is the quiet one. */
export function AgentVisual() {
  const branches: [string, number, boolean][] = [
    ['Task', 120, false],
    ['Decision', 162, false],
    ['Tool', 204, false],
    ['Fallback', 246, true],
  ]
  return (
    <svg viewBox={VB} className="wkv" fill="none" aria-hidden="true">
      <path className="wkv-wire" d="M56 30V106 M56 134V272" />
      <path className="wkv-flow" d="M56 30V272" />

      <circle className="wkv-node" data-node cx="56" cy="30" r="4.5" />
      <L x={72} y={33}>Trigger</L>

      {/* the agent is a bounded thing, not another point on the line */}
      <rect className="wkv-frame-key" data-node x="42" y="106" width="28" height="28" rx="2" />
      <L x={80} y={150}>Agent</L>

      {/* the four addressable paths */}
      <path className="wkv-wire" d="M70 120H190 M160 120V246 M160 162H190 M160 204H190" />
      <path className="wkv-wire wkv-wire-soft" d="M160 246H190" />
      <path className="wkv-flow wkv-flow-b" d="M70 120H160V246H190" />

      {branches.map(([label, y, soft]) => (
        <g key={label}>
          <circle
            className={'wkv-node' + (soft ? ' wkv-node-soft' : '')}
            data-node
            cx="194"
            cy={y}
            r="4"
          />
          <L x={208} y={y + 3} soft={soft}>{label}</L>
        </g>
      ))}

      <circle className="wkv-node wkv-node-out" data-node cx="56" cy="272" r="4.5" />
      <L x={72} y={275}>Output</L>
    </svg>
  )
}

/** 03 - the request path, drawn inside the infrastructure that holds it. */
export function PlatformVisual() {
  const branches: [string, number][] = [
    ['Services', 166],
    ['Data', 205],
    ['Cache', 244],
  ]
  return (
    <svg viewBox={VB} className="wkv" fill="none" aria-hidden="true">
      {/* everything below the user sits inside one boundary */}
      <rect
        className="wkv-frame-soft wkv-detail"
        x="14"
        y="58"
        width="300"
        height="200"
        rx="2"
      />
      <path
        className="wkv-wire-soft wkv-detail"
        d="M14 58h18 M296 58h18 M14 258h18 M296 258h18"
      />

      <path className="wkv-wire" d="M56 26V152 M56 180V276" />
      <path className="wkv-flow" d="M56 26V276" />

      <circle className="wkv-node" data-node cx="56" cy="26" r="4.5" />
      <L x={72} y={29}>User</L>

      <circle className="wkv-node" data-node cx="56" cy="96" r="4.5" />
      <L x={72} y={99}>Interface</L>

      <rect className="wkv-frame-key" data-node x="42" y="152" width="28" height="28" rx="2" />
      <L x={80} y={196}>API</L>

      <path className="wkv-wire" d="M70 166H220 M190 166V244 M190 205H220 M190 244H220" />
      <path className="wkv-flow wkv-flow-b" d="M70 166H190V244H220" />

      {branches.map(([label, y]) => (
        <g key={label}>
          <circle className="wkv-node" data-node cx="224" cy={y} r="4" />
          <L x={238} y={y + 3}>{label}</L>
        </g>
      ))}

      <circle className="wkv-node wkv-node-out" data-node cx="56" cy="276" r="4.5" />
      <L x={72} y={279}>Infrastructure</L>
    </svg>
  )
}

/** 04 - parallel agents, one orchestrator, and a gate before anything leaves. */
export function OrchestrationVisual() {
  const agents = [84, 136, 188]
  return (
    <svg viewBox={VB} className="wkv" fill="none" aria-hidden="true">
      <path className="wkv-wire" d="M56 26V104 M56 136V276" />
      <path className="wkv-flow" d="M56 26V276" />

      <circle className="wkv-node" data-node cx="56" cy="26" r="4.5" />
      <L x={72} y={29}>Input</L>

      <rect className="wkv-frame-key" data-node x="40" y="104" width="32" height="32" rx="2" />
      <path className="wkv-wire-soft wkv-detail" d="M48 112h16 M48 120h16 M48 128h10" />
      <L x={82} y={154}>Orchestrator</L>

      {/* the pool: three agents working the same input in parallel */}
      <path
        className="wkv-wire"
        d="M72 120H166 M166 84V240 M166 84H196 M166 136H196 M166 188H196 M166 240H180"
      />
      <path className="wkv-flow wkv-flow-b" d="M72 120H166V240H180" />

      {agents.map((y) => (
        <g key={y}>
          <circle className="wkv-node" data-node cx="200" cy={y} r="4" />
          <L x={214} y={y + 3}>Agent</L>
        </g>
      ))}

      {/* the fourth path is a gate, not another worker */}
      <rect
        className="wkv-diamond"
        data-node
        x="186"
        y="226"
        width="28"
        height="28"
        rx="2"
        transform="rotate(45 200 240)"
      />
      <L x={228} y={243}>Evaluation</L>

      <circle className="wkv-node wkv-node-out" data-node cx="56" cy="276" r="4.5" />
      <L x={72} y={279}>Output</L>
    </svg>
  )
}

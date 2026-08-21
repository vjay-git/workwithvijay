'use client'

import type { CSSProperties } from 'react'

/**
 * One drawing per process stage. All six run left to right — the page is about
 * how a system moves, so movement is horizontal here, unlike the vertical
 * spines on Work. Each has a different topology so the six read as six
 * different states of one system:
 *
 *   01 chain        - four things you learn, in order
 *   02 split/collect - one architecture distributed and gathered again
 *   03 chain + return - increments feeding back into the work
 *   04 bracket      - one system, four things it must prove
 *   05 environments - the same signal crossing three boundaries
 *   06 closed loop  - the return re-enters discovery
 *
 * Nodes and labels carry --i, so the stage's activation illuminates them in
 * sequence rather than all at once. Motion is CSS on `.prv-flow`; nothing here
 * costs a rAF. Heights differ per drawing on purpose - a four-node chain does
 * not want the same box as a four-way bracket.
 */

const d = (i: number) => ({ ['--i']: i }) as CSSProperties

function N({
  x,
  y,
  i,
  r = 5,
  out = false,
  soft = false,
}: {
  x: number
  y: number
  i: number
  r?: number
  out?: boolean
  soft?: boolean
}) {
  return (
    <circle
      className={'prv-node' + (out ? ' prv-node-out' : '') + (soft ? ' prv-node-soft' : '')}
      cx={x}
      cy={y}
      r={r}
      style={d(i)}
    />
  )
}

function L({
  x,
  y,
  i,
  children,
  anchor = 'middle',
  soft = false,
}: {
  x: number
  y: number
  i: number
  children: string
  anchor?: 'start' | 'middle' | 'end'
  soft?: boolean
}) {
  return (
    <text
      className={'prv-label' + (soft ? ' prv-label-soft' : '')}
      x={x}
      y={y}
      textAnchor={anchor}
      style={d(i)}
    >
      {children}
    </text>
  )
}

/** 01 - what you learn, in the order you learn it. */
export function DiscoverVisual() {
  const stops: [string, number][] = [
    ['Problem', 48],
    ['User', 152],
    ['Constraints', 256],
    ['Opportunity', 360],
  ]
  return (
    <svg viewBox="0 0 420 110" className="prv" fill="none" aria-hidden="true">
      <path className="prv-wire" d="M48 44H360" />
      <path pathLength={1} className="prv-flow" d="M48 44H360" />
      {stops.map(([label, x], i) => (
        <g key={label}>
          <N x={x} y={44} i={i} out={i === stops.length - 1} />
          <L x={x} y={76} i={i}>
            {label}
          </L>
        </g>
      ))}
    </svg>
  )
}

/** 02 - the architecture distributes, then gathers. Abstract on purpose. */
export function ArchitectVisual() {
  const mid: [string, number][] = [
    ['Data', 56],
    ['AI', 120],
    ['Tools', 184],
  ]
  return (
    <svg viewBox="0 0 420 240" className="prv" fill="none" aria-hidden="true">
      <path className="prv-wire" d="M48 120H140 M172 120H200 M200 56V184" />
      <path
        className="prv-wire"
        d="M200 56H227 M200 120H227 M200 184H227 M237 56H290 M237 120H290 M237 184H290 M290 56V184 M290 120H348"
      />
      <path pathLength={1} className="prv-flow" d="M48 120H348" />
      <path pathLength={1} className="prv-flow prv-flow-b" d="M172 120H200V56H290V120" />

      <N x={48} y={120} i={0} />
      <L x={48} y={146} i={0}>
        Interface
      </L>

      {/* the boundary every request passes through */}
      <rect className="prv-frame-key" x="140" y="104" width="32" height="32" rx="2" style={d(1)} />
      <L x={156} y={96} i={1}>
        API
      </L>

      {mid.map(([label, y], k) => (
        <g key={label}>
          <N x={232} y={y} i={2 + k} />
          <L x={232} y={y - 16} i={2 + k}>
            {label}
          </L>
        </g>
      ))}

      <N x={348} y={120} i={5} out />
      <L x={348} y={146} i={5}>
        Output
      </L>
    </svg>
  )
}

/** 03 - the work advances, and every increment feeds back into it. */
export function BuildVisual() {
  const stops: [string, number][] = [
    ['Code', 52],
    ['Integrate', 152],
    ['Test', 252],
    ['Iterate', 352],
  ]
  return (
    <svg viewBox="0 0 420 210" className="prv" fill="none" aria-hidden="true">
      <path className="prv-wire" d="M52 76H352" />
      {/* the return runs outside the labels, not through them */}
      <path className="prv-wire prv-wire-soft" d="M362 76H396V156H8V76H42" />
      <path pathLength={1} className="prv-flow" d="M52 76H352" />
      <path pathLength={1} className="prv-flow prv-flow-b" d="M362 76H396V156H8V76H42" />

      {stops.map(([label, x], i) => (
        <g key={label}>
          <N x={x} y={76} i={i} />
          <L x={x} y={104} i={i}>
            {label}
          </L>
        </g>
      ))}

      <L x={202} y={148} i={4} soft>
        Increment
      </L>
    </svg>
  )
}

/** 04 - one system, and the four things it has to prove about itself. */
export function ValidateVisual() {
  const checks: [string, string, number][] = [
    ['Accuracy', 'Verify', 40],
    ['Reliability', 'Pass', 97],
    ['Failure', 'Retry', 153],
    ['Performance', 'Pass', 210],
  ]
  return (
    <svg viewBox="0 0 420 250" className="prv" fill="none" aria-hidden="true">
      <path
        className="prv-wire"
        d="M57 125H120 M120 40V210 M120 40H160 M120 97H160 M120 153H160 M120 210H160"
      />
      <path pathLength={1} className="prv-flow" d="M57 125H120V210H160" />
      <path pathLength={1} className="prv-flow prv-flow-b" d="M120 125V40H160" />

      <N x={52} y={125} i={0} />
      <L x={52} y={151} i={0}>
        System
      </L>

      {checks.map(([label, state, y], k) => (
        <g key={label}>
          <N x={165} y={y} i={1 + k} r={4.5} />
          <L x={180} y={y + 3} i={1 + k} anchor="start">
            {label}
          </L>

          {/* the kind of check each dimension gets - dropped on narrow screens
              so the dimension names keep the room they need */}
          <g className="prv-detail">
            <path className="prv-wire prv-wire-soft" d={`M258 ${y}H294`} />
            <circle className="prv-node prv-node-soft" cx="300" cy={y} r="2.5" style={d(1 + k)} />
            <text className="prv-state" x="312" y={y + 3} style={d(1 + k)}>
              {state}
            </text>
          </g>
        </g>
      ))}
    </svg>
  )
}

/** 05 - the same system crossing three boundaries. Production is the one that counts. */
export function ShipVisual() {
  const envs: [string, number, boolean][] = [
    ['Development', 24, false],
    ['Staging', 160, false],
    ['Production', 296, true],
  ]
  // `prod` rather than `key`: the last environment is the one that counts, and
  // the name would otherwise read as React's key prop two lines below.
  return (
    <svg viewBox="0 0 420 170" className="prv" fill="none" aria-hidden="true">
      <path
        className="prv-wire"
        d="M40 88H108 M124 88H160 M176 88H244 M260 88H296 M312 88H380"
      />
      <path pathLength={1} className="prv-flow" d="M40 88H380" />

      {envs.map(([label, x, prod], i) => (
        <g key={label}>
          <rect
            className={prod ? 'prv-frame-key' : 'prv-frame'}
            x={x}
            y="60"
            width="100"
            height="56"
            rx="2"
            style={d(i)}
          />
          <N x={x + 50} y={88} i={i} out={prod} />
          <L x={x + 50} y={138} i={i}>
            {label}
          </L>
        </g>
      ))}
    </svg>
  )
}

/** 06 - a closed loop. What it returns to is the first stage. */
export function EvolveVisual() {
  const stops: [string, number][] = [
    ['Observe', 60],
    ['Learn', 160],
    ['Improve', 260],
    ['Deploy', 360],
  ]
  return (
    <svg viewBox="0 0 420 220" className="prv" fill="none" aria-hidden="true">
      <path className="prv-wire" d="M60 72H360" />
      <path className="prv-wire prv-wire-soft" d="M370 72H400V166H20V72H50" />
      <path pathLength={1} className="prv-flow" d="M60 72H360" />
      <path pathLength={1} className="prv-flow prv-flow-b" d="M370 72H400V166H20V72H50" />

      {stops.map(([label, x], i) => (
        <g key={label}>
          <N x={x} y={72} i={i} />
          <L x={x} y={48} i={i}>
            {label}
          </L>
        </g>
      ))}

      {/* where the loop re-enters: the process starts again at Discover */}
      <N x={210} y={166} i={4} r={3.5} soft />
      <L x={210} y={152} i={4} soft>
        01 / Discover
      </L>
    </svg>
  )
}

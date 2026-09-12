'use client'

/**
 * The About page's own drawings.
 *
 * Two sets, and they do different jobs.
 *
 * STAGE_DIAGRAMS give each of the five journey stages a spatial identity in the
 * DOM. They are not decoration for the 3D layer - they are the same topology
 * the corridor draws in WebGL, in flat SVG, so a reader with reduced motion, no
 * WebGL, a two-core phone or JavaScript switched off still gets "01 is tiers
 * over a store, 02 is two systems joined through gates, 04 goes one direction".
 * The spatial story survives the spatial layer being absent.
 *
 * CON_ARCH is the architecture that appears on a contribution card. Kept
 * deliberately in a different register from WorkVisuals - micro, horizontal,
 * unlabelled - because the four Work drawings already appear further down the
 * page and two identical diagrams of one system is not proof, it is repetition.
 *
 * No text anywhere in this file. Every word on this page comes from copy that
 * already existed in the repository.
 */

/* ==========================================================================
   journey stages
   ========================================================================== */

const SVB = '0 0 200 108'

/** 01 - three service tiers agreeing on one store. */
function DiagramEngineering() {
  return (
    <svg viewBox={SVB} className="abd" fill="none" aria-hidden="true">
      {[8, 30, 52].map((y) => (
        <g key={y}>
          <rect className="abd-frame" x="46" y={y} width="108" height="15" />
          <path className="abd-wire" d={`M100 ${y + 15}v7`} />
          <path className="abd-soft" d={`M70 ${y + 15}v7 M130 ${y + 15}v7`} />
        </g>
      ))}
      <rect className="abd-frame abd-live" x="70" y="82" width="60" height="16" />
      <path className="abd-soft" d="M78 90h44" />
    </svg>
  )
}

/** 02 - two enterprises, joined only where they are allowed to be. */
function DiagramIntegration() {
  return (
    <svg viewBox={SVB} className="abd" fill="none" aria-hidden="true">
      <rect className="abd-frame" x="8" y="16" width="56" height="76" />
      <rect className="abd-frame" x="136" y="16" width="56" height="76" />
      <path className="abd-soft" d="M18 28h36 M18 40h36 M18 52h26 M146 28h36 M146 40h36 M146 52h26" />
      {[36, 54, 72].map((y) => (
        <g key={y}>
          <path className="abd-wire" d={`M64 ${y}h22`} />
          <rect className="abd-frame abd-live" x="86" y={y - 6} width="28" height="12" />
          <path className="abd-wire" d={`M114 ${y}h22`} />
        </g>
      ))}
    </svg>
  )
}

/** 03 - interface plane over application plane, stitched between. */
function DiagramFullstack() {
  return (
    <svg viewBox={SVB} className="abd" fill="none" aria-hidden="true">
      <rect className="abd-frame" x="14" y="10" width="172" height="22" />
      <rect className="abd-frame" x="14" y="76" width="172" height="22" />
      {[38, 68, 98, 128, 158].map((x) => (
        <path key={x} className="abd-wire" d={`M${x} 32v44`} />
      ))}
      <path className="abd-soft" d="M24 21h30 M24 87h30 M146 21h30 M146 87h30" />
    </svg>
  )
}

/** 04 - retrieval, reasoning, action. One direction. */
function DiagramAI() {
  return (
    <svg viewBox={SVB} className="abd" fill="none" aria-hidden="true">
      <path className="abd-soft" d="M4 34h20 M4 54h20 M4 74h20" />
      <rect className="abd-frame" x="26" y="38" width="34" height="32" />
      <path className="abd-wire" d="M60 54h18" />
      <rect className="abd-frame abd-live" x="78" y="30" width="44" height="48" />
      <path className="abd-wire" d="M122 54h18" />
      <rect className="abd-frame" x="140" y="38" width="34" height="32" />
      <path className="abd-wire" d="M174 54h22" />
      <path className="abd-soft" d="M26 86h148" />
    </svg>
  )
}

/** 05 - everything before it, arriving at one system. */
function DiagramCollab() {
  return (
    <svg viewBox={SVB} className="abd" fill="none" aria-hidden="true">
      {[
        [10, 10],
        [154, 10],
        [10, 76],
        [154, 76],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} className="abd-frame" x={x} y={y} width="36" height="22" />
      ))}
      <path
        className="abd-wire"
        d="M46 21h24l14 16 M154 21h-24l-14 16 M46 87h24l14-16 M154 87h-24l-14-16"
      />
      <rect className="abd-frame abd-live" x="80" y="38" width="40" height="32" />
    </svg>
  )
}

export const STAGE_DIAGRAMS = [
  DiagramEngineering,
  DiagramIntegration,
  DiagramFullstack,
  DiagramAI,
  DiagramCollab,
]

/* ==========================================================================
   contribution architecture - micro, horizontal, unlabelled
   ========================================================================== */

const CVB = '0 0 224 56'

/** 01 - a corpus narrowing to an index, one validated path out. */
function ArchRag() {
  return (
    <svg viewBox={CVB} className="abc" fill="none" aria-hidden="true">
      {[4, 20, 36].map((y) => (
        <rect key={y} className="abc-frame" x="2" y={y} width="16" height="12" />
      ))}
      <path className="abc-wire" d="M18 10h16l10 18 M18 26h26 M18 42h16l10-14" />
      <rect className="abc-frame abc-live" x="44" y="16" width="30" height="24" />
      <path className="abc-wire" d="M74 28h24" />
      <rect className="abc-frame" x="98" y="14" width="38" height="28" />
      <path className="abc-wire" d="M136 28h20" />
      <rect className="abc-frame abc-live" x="156" y="20" width="20" height="16" />
      <path className="abc-wire" d="M176 28h46" />
    </svg>
  )
}

/** 02 - one agent, four addressable paths, one audited join. */
function ArchAgent() {
  return (
    <svg viewBox={CVB} className="abc" fill="none" aria-hidden="true">
      <rect className="abc-frame abc-live" x="2" y="16" width="30" height="24" />
      <path className="abc-wire" d="M32 28h18" />
      {[4, 18, 32, 44].map((y, i) => (
        <g key={y}>
          <path className="abc-wire" d={`M50 28V${y + 6}h14`} />
          <rect className="abc-frame" x="64" y={y} width="26" height="12" />
          <path className="abc-wire" d={`M90 ${y + 6}h14V28`} />
          {i === 0 && <path className="abc-soft" d="M104 28h12" />}
        </g>
      ))}
      <rect className="abc-frame" x="116" y="18" width="34" height="20" />
      <path className="abc-wire" d="M150 28h18" />
      <rect className="abc-frame abc-live" x="168" y="20" width="16" height="16" />
      <path className="abc-soft" d="M184 28h38" />
    </svg>
  )
}

/** 03 - a request path enclosed by the infrastructure that runs it. */
function ArchPlatform() {
  return (
    <svg viewBox={CVB} className="abc" fill="none" aria-hidden="true">
      <rect className="abc-frame abc-soft-frame" x="2" y="2" width="220" height="52" />
      <path className="abc-wire" d="M2 28h22" />
      <rect className="abc-frame abc-live" x="24" y="18" width="26" height="20" />
      <path className="abc-wire" d="M50 28h16" />
      <rect className="abc-frame" x="66" y="10" width="34" height="36" />
      <path className="abc-wire" d="M100 20h18 M100 36h18" />
      <rect className="abc-frame" x="118" y="12" width="30" height="16" />
      <rect className="abc-frame" x="118" y="30" width="30" height="16" />
      <path className="abc-wire" d="M148 20h16v16h-16 M164 28h22" />
      <rect className="abc-frame abc-live" x="186" y="18" width="30" height="20" />
    </svg>
  )
}

/** 04 - parallel agents whose results pass one evaluation before exit. */
function ArchOrchestration() {
  return (
    <svg viewBox={CVB} className="abc" fill="none" aria-hidden="true">
      <path className="abc-wire" d="M2 28h14" />
      {[2, 21, 40].map((y) => (
        <g key={y}>
          <path className="abc-wire" d={`M16 28V${y + 7}h10`} />
          <rect className="abc-frame" x="26" y={y} width="34" height="14" />
          <path className="abc-wire" d={`M60 ${y + 7}h12V28`} />
        </g>
      ))}
      <path className="abc-wire" d="M72 28h18" />
      <rect className="abc-frame abc-live" x="90" y="12" width="44" height="32" />
      <path className="abc-wire" d="M134 28h20" />
      <rect className="abc-frame" x="154" y="18" width="26" height="20" />
      <path className="abc-wire" d="M180 28h42" />
      <path className="abc-soft" d="M90 50h44" />
    </svg>
  )
}

export const CON_ARCH = [ArchRag, ArchAgent, ArchPlatform, ArchOrchestration]

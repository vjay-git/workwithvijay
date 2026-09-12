/**
 * Line geometry for the About environment.
 *
 * Everything in this file returns positions for a single THREE.LineSegments.
 * That is the whole performance strategy: one buffer and one draw call per
 * object, no meshes, no fills, no post-processing. It is also the design - the
 * rest of the site draws its architecture in hairlines (see WorkVisuals,
 * SystemDiagrams, Corridor), and this is that same drawing language at
 * building scale.
 *
 * Each journey stage gets its own topology rather than a shared lattice with a
 * different label on it, because the five stages are not the same kind of
 * system:
 *
 *   01 engineering  - service tiers over one store
 *   02 integration  - two large blocks joined only where they are allowed to be
 *   03 full-stack   - two planes, stitched
 *   04 AI systems   - retrieval, reasoning, action: one direction
 *   05 collab       - four inbound structures converging on one
 */

import * as THREE from 'three'

type Pts = number[]

const seg = (
  p: Pts,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
) => {
  p.push(x1, y1, z1, x2, y2, z2)
}

/** Axis-aligned rectangle outline on the XY plane. */
export function rect(p: Pts, x: number, y: number, w: number, h: number, z = 0) {
  const l = x - w / 2
  const r = x + w / 2
  const b = y - h / 2
  const t = y + h / 2
  seg(p, l, b, z, r, b, z)
  seg(p, r, b, z, r, t, z)
  seg(p, r, t, z, l, t, z)
  seg(p, l, t, z, l, b, z)
}

/** A rectangle given depth by four struts back to a second face. */
export function box(
  p: Pts,
  x: number,
  y: number,
  w: number,
  h: number,
  z: number,
  d: number
) {
  rect(p, x, y, w, h, z)
  rect(p, x, y, w, h, z - d)
  const l = x - w / 2
  const r = x + w / 2
  const b = y - h / 2
  const t = y + h / 2
  seg(p, l, b, z, l, b, z - d)
  seg(p, r, b, z, r, b, z - d)
  seg(p, r, t, z, r, t, z - d)
  seg(p, l, t, z, l, t, z - d)
}

export function toGeometry(p: Pts) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3))
  return g
}

/* ==========================================================================
   the gate - the portrait frame, repeated down the corridor
   ========================================================================== */

/**
 * The portal each stage is seen through. Open at the bottom, exactly as the
 * intro corridor is, so the eye reads a passage rather than a crate.
 */
export function gateGeometry(w: number, h: number) {
  const p: Pts = []
  const x = w / 2
  const y = h / 2
  seg(p, -x, -y, 0, -x, y, 0)
  seg(p, x, -y, 0, x, y, 0)
  seg(p, -x, y, 0, x, y, 0)
  // ticks rather than a closed sill: the floor of the passage is implied
  seg(p, -x, -y, 0, -x + 0.9, -y, 0)
  seg(p, x, -y, 0, x - 0.9, -y, 0)
  return toGeometry(p)
}

/* ==========================================================================
   the five stage interiors
   ========================================================================== */

/** 01 - three service tiers agreeing on one store. */
function stageEngineering(detail: boolean): Pts {
  const p: Pts = []
  for (let i = 0; i < 3; i++) {
    const y = 1.15 - i * 0.95
    box(p, 0, y, 3.6, 0.62, 0, 0.5)
    if (detail) {
      for (let k = -1; k <= 1; k++) seg(p, k * 1.1, y - 0.31, 0, k * 1.1, y - 0.64, 0)
    }
  }
  rect(p, 0, -1.72, 2.4, 0.5, 0)
  seg(p, 0, -1.47, 0, 0, -1.28, 0)
  return p
}

/** 02 - two enterprises, joined only through controlled paths. */
function stageIntegration(detail: boolean): Pts {
  const p: Pts = []
  box(p, -2.1, 0.2, 2.1, 2.5, 0, 0.7)
  box(p, 2.1, 0.2, 2.1, 2.5, 0, 0.7)
  for (let i = 0; i < 3; i++) {
    const y = 0.95 - i * 0.75
    // a path with a gate in the middle of it - integration is never a wire
    seg(p, -1.05, y, 0, -0.34, y, 0)
    seg(p, 0.34, y, 0, 1.05, y, 0)
    if (detail) rect(p, 0, y, 0.5, 0.34, 0)
  }
  return p
}

/** 03 - interface plane over application plane, stitched between. */
function stageFullstack(detail: boolean): Pts {
  const p: Pts = []
  rect(p, 0, 1.35, 4.4, 1.1, 0.5)
  rect(p, 0, -1.35, 4.4, 1.1, -0.5)
  const cols = detail ? 5 : 3
  for (let i = 0; i < cols; i++) {
    const x = -1.8 + (i * 3.6) / (cols - 1)
    seg(p, x, 0.8, 0.5, x, -0.8, -0.5)
  }
  if (detail) {
    seg(p, -2.2, 1.35, 0.5, -2.9, 1.35, 0.5)
    seg(p, 2.2, -1.35, -0.5, 2.9, -1.35, -0.5)
  }
  return p
}

/** 04 - retrieval, reasoning, action. One direction, three stops. */
function stageAI(detail: boolean): Pts {
  const p: Pts = []
  const xs = [-2.5, 0, 2.5]
  xs.forEach((x, i) => {
    const s = i === 1 ? 1.5 : 1.15
    box(p, x, 0, s, s, 0, i === 1 ? 0.8 : 0.45)
    if (i < 2) seg(p, x + s / 2, 0, 0, xs[i + 1] - (i === 0 ? 0.75 : 0.575), 0, 0)
  })
  if (detail) {
    // the corpus feeding retrieval, and the trail the action leaves
    for (let k = -1; k <= 1; k++) seg(p, -4.3, k * 0.55, 0, -3.15, k * 0.35, 0)
    seg(p, 3.25, 0, 0, 4.3, 0, 0)
    rect(p, 0, -1.6, 3.4, 0.36, 0)
  }
  return p
}

/** 05 - everything before it, arriving at one system. */
function stageCollab(detail: boolean): Pts {
  const p: Pts = []
  box(p, 0, 0, 2.2, 2.2, 0, 0.9)
  const corners: [number, number][] = [
    [-3.6, 1.9],
    [3.6, 1.9],
    [-3.6, -1.9],
    [3.6, -1.9],
  ]
  for (const [x, y] of corners) {
    if (detail) rect(p, x, y, 1.2, 0.8, -1.4)
    seg(p, x * 0.72, y * 0.72, -1.4, Math.sign(x) * 1.1, Math.sign(y) * 1.1, 0)
  }
  return p
}

const STAGE_BUILDERS = [
  stageEngineering,
  stageIntegration,
  stageFullstack,
  stageAI,
  stageCollab,
]

export function stageGeometry(index: number, detail: boolean) {
  const build = STAGE_BUILDERS[index] ?? stageEngineering
  return toGeometry(build(detail))
}

/* ==========================================================================
   contributions - four architectural cards with real depth
   ========================================================================== */

/** A card face, the plate it stands on, and the struts between the two. */
export function cardGeometry(w: number, h: number, detail: boolean) {
  const p: Pts = []
  rect(p, 0, 0, w, h, 0)
  rect(p, 0, 0, w * 0.86, h * 0.86, -0.75)
  const x = w / 2
  const y = h / 2
  const corners: [number, number][] = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]
  for (const [sx, sy] of corners) {
    seg(p, sx * x, sy * y, 0, sx * x * 0.86, sy * y * 0.86, -0.75)
  }
  seg(p, -x, y - 0.62, 0, x, y - 0.62, 0)
  if (detail) {
    for (let i = 0; i < 3; i++) {
      const ly = y - 1.35 - i * 0.42
      seg(p, -x + 0.3, ly, 0, -x + 0.3 + w * (0.5 - i * 0.11), ly, 0)
    }
  }
  return toGeometry(p)
}

/* ==========================================================================
   from interface to infrastructure - one stack, six layers, one direction
   ========================================================================== */

/**
 * Slabs threaded by a spine that passes through every one of them. The spine
 * is the point: six boxes are a list, six boxes on a shared axis are a system.
 */
export function stackGeometry(count: number, detail: boolean) {
  const p: Pts = []
  const gap = 1.5
  const top = ((count - 1) * gap) / 2
  for (let i = 0; i < count; i++) {
    const y = top - i * gap
    // narrowing as it descends: product is broad, infrastructure is load-bearing
    const w = 5.6 - i * 0.16
    box(p, 0, y, w, 0.5, 0, 1.5)
    if (i < count - 1) {
      // the descent, with a head, so the direction is not ambiguous
      seg(p, 0, y - 0.25, 0, 0, y - gap + 0.25, 0)
      seg(p, -0.16, y - gap + 0.46, 0, 0, y - gap + 0.25, 0)
      seg(p, 0.16, y - gap + 0.46, 0, 0, y - gap + 0.25, 0)
    }
    if (detail) {
      // ports on both flanks - a layer is a contract, not a shelf
      seg(p, -w / 2, y, 0, -w / 2 - 0.45, y, 0)
      seg(p, w / 2, y, 0, w / 2 + 0.45, y, 0)
    }
  }
  return toGeometry(p)
}

/** Where layer `i` sits on the Y axis of the stack above. */
export function stackLayerY(i: number, count: number) {
  const gap = 1.5
  return ((count - 1) * gap) / 2 - i * gap
}

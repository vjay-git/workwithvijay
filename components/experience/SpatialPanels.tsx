'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { IntroState } from './introTimeline'

/**
 * The interior, and then the layout.
 *
 * The panels carry no text. Labels rendered in WebGL would be the "cheesy HUD"
 * the brief rules out, they would not be selectable or accessible, and the same
 * four ideas are stated properly in HTML further down the page. So the panels do
 * the one job 3D is actually better at: they establish that there is a built
 * space in here, with structure and scale - and then they become the frame the
 * hero arrives into.
 *
 * SETTLE is the load-bearing state. The final positions are not composition:
 * they are where the eyebrow, headline, paragraph and action row will be, sized
 * to those blocks, sitting at the distance the camera comes to rest at. When the
 * DOM fades up it lands inside the shape the 3D just finished building.
 *
 * The settle plane is at z = SETTLE_Z and the camera stops at CAM_REST (see
 * introTimeline) - the panels must end up IN FRONT of the lens. Getting that
 * backwards is what put a second of black in the middle of the first cut.
 */

interface Props {
  state: IntroState
  compact: boolean
  fit: number
}

/** Where the panels come to rest. Must stay ahead of the camera's rest point. */
export const SETTLE_Z = -12.6

interface PanelSpec {
  /** Where it waits, out in the corridor, edge-on. */
  from: [number, number, number]
  /** Where it settles - aligned to the hero block it hands over to. */
  to: [number, number]
  size: [number, number]
  /** Final size: a layout block, not an object. */
  toSize: [number, number]
  spin: number
}

/* Ordered as the hero reads: eyebrow, headline, paragraph, actions. */
const DESKTOP: PanelSpec[] = [
  { from: [4.6, 2.9, -19.0], to: [-3.02, 1.92], size: [2.0, 1.2], toSize: [1.8, 0.15], spin: 1.5 },
  { from: [-3.4, 1.5, -8.2], to: [-0.55, 0.52], size: [3.6, 2.1], toSize: [6.7, 2.15], spin: -0.85 },
  { from: [3.9, -0.7, -12.0], to: [-2.28, -1.08], size: [3.0, 1.8], toSize: [3.2, 0.5], spin: 1.05 },
  { from: [-4.4, -2.4, -15.5], to: [-2.92, -1.82], size: [3.2, 1.6], toSize: [2.4, 0.26], spin: -1.3 },
]

/* Mobile keeps the story, drops the supporting beats: headline and paragraph. */
const COMPACT: PanelSpec[] = [DESKTOP[1], DESKTOP[2]]

/** A frame is four thin bars merged into one geometry - one draw call, no fill. */
function frameGeometry(t: number) {
  const positions: number[] = []
  const normals: number[] = []
  const push = (bw: number, bh: number, x: number, y: number) => {
    const g = new THREE.BoxGeometry(bw, bh, t)
    g.translate(x, y, 0)
    const p = g.getAttribute('position')
    const n = g.getAttribute('normal')
    for (let i = 0; i < p.count; i++) {
      positions.push(p.getX(i), p.getY(i), p.getZ(i))
      normals.push(n.getX(i), n.getY(i), n.getZ(i))
    }
    g.dispose()
  }
  // Unit frame: scaled per panel, so all four share this one geometry.
  push(1, t, 0, 0.5 - t / 2)
  push(1, t, 0, -0.5 + t / 2)
  push(t, 1 - t * 2, -0.5 + t / 2, 0)
  push(t, 1 - t * 2, 0.5 - t / 2, 0)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  return geo
}

export default function SpatialPanels({ state, compact, fit }: Props) {
  const specs = compact ? COMPACT : DESKTOP
  const groups = useRef<(THREE.Group | null)[]>([])
  const root = useRef<THREE.Group>(null)

  const { frame, rule, edge, ruleMat } = useMemo(() => ({
    frame: frameGeometry(0.02),
    rule: new THREE.PlaneGeometry(1, 0.012),
    // Emissive, not just lit: these sit far down a dark corridor where a purely
    // reflective material receives almost nothing and reads as absent.
    edge: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c3d0d7'),
      emissive: new THREE.Color('#6e838d'),
      emissiveIntensity: 0.55,
      metalness: 0.85,
      roughness: 0.3,
      transparent: true,
      opacity: 0,
    }),
    ruleMat: new THREE.MeshBasicMaterial({
      color: new THREE.Color('#16D9E8'), transparent: true, opacity: 0,
    }),
  }), [])

  useEffect(() => () => {
    frame.dispose(); rule.dispose(); edge.dispose(); ruleMat.dispose()
  }, [frame, rule, edge, ruleMat])

  useFrame(() => {
    const s = state
    if (root.current) {
      root.current.visible = s.panels > 0.001
      // X/Y only, for the same reason as the corridor: depth is timing.
      root.current.scale.set(fit, fit, 1)
    }

    // They hand over rather than hold the frame: once settled they are a faint
    // register mark behind the type, not a wireframe cage around it.
    edge.opacity = s.panels * (1 - s.settle * 0.62)
    ruleMat.opacity = 0.55 * s.panels * (1 - s.settle * 0.7)
    // As they become layout they stop being objects: the emissive drops so the
    // DOM type arriving on top is the brightest thing in the frame.
    edge.emissiveIntensity = 0.55 * (1 - s.settle * 0.7)

    for (let i = 0; i < specs.length; i++) {
      const g = groups.current[i]
      if (!g) continue
      const spec = specs[i]
      // Staggered by index so the corridor answers front-to-back rather than
      // switching on all at once.
      const lag = i * 0.1
      const rise = THREE.MathUtils.clamp((s.panels - lag) / (1 - lag || 1), 0, 1)
      const turn = THREE.MathUtils.clamp((s.unfold - lag * 0.4) / 0.75, 0, 1)
      const set = s.settle

      const [fx, fy, fz] = spec.from
      g.position.set(
        THREE.MathUtils.lerp(fx, spec.to[0], set),
        THREE.MathUtils.lerp(fy, spec.to[1], set),
        THREE.MathUtils.lerp(fz, SETTLE_Z, set)
      )
      // Edge-on until the camera reaches them, then square to the lens.
      g.rotation.y = spec.spin * (1 - turn)
      g.rotation.z = spec.spin * 0.05 * (1 - set)

      const w = THREE.MathUtils.lerp(spec.size[0], spec.toSize[0], set)
      const h = THREE.MathUtils.lerp(spec.size[1], spec.toSize[1], set)
      g.scale.set(w * rise, h * rise, 1)
    }
  })

  return (
    <group ref={root}>
      {specs.map((_, i) => (
        <group key={i} ref={(el) => { groups.current[i] = el }}>
          <mesh geometry={frame} material={edge} />
          <mesh geometry={rule} material={ruleMat} position={[0, -0.2, 0.012]} scale={[0.7, 1, 1]} />
        </group>
      ))}
    </group>
  )
}

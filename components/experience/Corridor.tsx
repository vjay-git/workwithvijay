'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { IntroState } from './introTimeline'

/**
 * The space behind the doorway.
 *
 * Without this the interior was four small rectangles floating in black - the
 * camera travelled a long way through nothing and the middle of the film went
 * dead. What was missing was not more objects but SCALE: something continuous
 * for the eye to measure travel against.
 *
 * So: a run of thin structural ribs receding down -Z, drawn as line segments in
 * a single geometry. One draw call, no fill, no glow. It reads as architecture
 * because it is regular and it is only structure - the same restraint as the
 * hairline diagrams on the rest of the site, at building scale.
 */

interface Props {
  state: IntroState
  compact: boolean
  fit: number
}

const RIBS_DESKTOP = 14
const RIBS_COMPACT = 8
const SPACING = 3.4
const W = 7.2
const H = 4.6

export default function Corridor({ state, compact, fit }: Props) {
  const group = useRef<THREE.Group>(null)
  const ribs = compact ? RIBS_COMPACT : RIBS_DESKTOP

  const { geometry, material, railGeo, railMat } = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < ribs; i++) {
      const z = -2.5 - i * SPACING
      // Each rib is an open portal: two uprights and a header. Deliberately not
      // closed at the bottom, so the eye reads a passage rather than a box.
      const x = W / 2, y = H / 2
      pts.push(-x, -y, z, -x, y, z)
      pts.push(x, -y, z, x, y, z)
      pts.push(-x, y, z, x, y, z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))

    // Two continuous rails running the length of it - the thing that actually
    // conveys speed as the camera moves, because they never leave frame.
    const rp: number[] = []
    const zEnd = -2.5 - (ribs - 1) * SPACING
    rp.push(-W / 2, H / 2, -2.5, -W / 2, H / 2, zEnd)
    rp.push(W / 2, H / 2, -2.5, W / 2, H / 2, zEnd)
    rp.push(-W / 2, -H / 2, -2.5, -W / 2, -H / 2, zEnd)
    rp.push(W / 2, -H / 2, -2.5, W / 2, -H / 2, zEnd)
    const rg = new THREE.BufferGeometry()
    rg.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3))

    return {
      geometry: g,
      material: new THREE.LineBasicMaterial({
        color: new THREE.Color('#7d8e97'), transparent: true, opacity: 0,
      }),
      railGeo: rg,
      railMat: new THREE.LineBasicMaterial({
        color: new THREE.Color('#16D9E8'), transparent: true, opacity: 0,
      }),
    }
  }, [ribs])

  useEffect(() => () => {
    geometry.dispose(); material.dispose(); railGeo.dispose(); railMat.dispose()
  }, [geometry, material, railGeo, railMat])

  useFrame(() => {
    const s = state
    if (group.current) {
      group.current.visible = s.panels > 0.001 || s.split > 0.05
      // Scaled on X/Y only: the passage keeps its length, so travelling it takes
      // the same time on a phone as on a desktop and the cut stays in sync.
      group.current.scale.set(fit, fit, 1)
    }
    // Comes up with the doorway opening, not with the panels: the space should
    // already be there when the mark parts, so the opening reveals it rather
    // than summoning it.
    const on = Math.max(s.split * 0.55, s.panels)
    material.opacity = 0.26 * on * (1 - s.settle * 0.85)
    railMat.opacity = 0.4 * on * (1 - s.settle * 0.9)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geometry} material={material} />
      <lineSegments geometry={railGeo} material={railMat} />
    </group>
  )
}

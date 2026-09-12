'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  CAM_OFFSET,
  clamp01,
  damp,
  PALETTE,
  type AboutState,
  type Anchors,
} from './aboutState'
import { stackGeometry, stackLayerY, toGeometry } from './geometry'

/**
 * From interface to infrastructure - the stack, standing up.
 *
 * Six slabs on one spine, drawn once as a single buffer. The whole point of
 * the section is that it is not six facts side by side: it is one path down
 * through a system, and each arrow between slabs is load-bearing information.
 *
 * A second, tiny geometry rides the spine as the reading marker - a bracket
 * around whichever layer the reader is level with, driven by the same DOM
 * anchors as everything else. That is the only thing on screen that moves
 * independently here, because the section already has a scroll-drawn line in
 * the DOM (--ab-depth) doing the same job in two dimensions.
 *
 * Unlike the journey gates, the tower is held at a fixed distance from the lens
 * and positioned from the live DOM rect rather than parked on the rail. The
 * section is two and a half viewports tall: a rail-anchored object would be
 * fifteen units in front of the camera at the top of it and fifteen units
 * BEHIND by the bottom, which is to say gone exactly when the reader reaches
 * INFRASTRUCTURE. Locking it to the lens is what keeps a tall section covered.
 */

interface Props {
  state: AboutState
  anchors: Anchors
  compact: boolean
}

const LAYERS = 6

/** Total height of the tower in its own units, from stackGeometry's spacing. */
const TOWER_H = (LAYERS - 1) * 1.5 + 0.5

export default function StackTower({ state, anchors, compact }: Props) {
  const { camera, size } = useThree()
  const geo = useMemo(() => stackGeometry(LAYERS, !compact), [compact])
  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }),
    []
  )

  // The bracket: two corner ticks either side of one slab.
  const markGeo = useMemo(() => {
    const p: number[] = []
    const x = 3.35
    const y = 0.46
    for (const sx of [-1, 1]) {
      p.push(sx * x, y, 0, sx * (x - 0.34), y, 0)
      p.push(sx * x, y, 0, sx * x, y - 0.3, 0)
      p.push(sx * x, -y, 0, sx * (x - 0.34), -y, 0)
      p.push(sx * x, -y, 0, sx * x, -y + 0.3, 0)
    }
    return toGeometry(p)
  }, [])

  const markMat = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }),
    []
  )

  const group = useRef<THREE.Group>(null)
  const mark = useRef<THREE.LineSegments>(null)
  const markY = useRef(stackLayerY(0, LAYERS))

  useEffect(
    () => () => {
      geo.dispose()
      mat.dispose()
      markGeo.dispose()
      markMat.dispose()
    },
    [geo, mat, markGeo, markMat]
  )

  useFrame((_, dt) => {
    const s = state
    const g = group.current
    const a = anchors['stack']
    if (!g || !a) return

    const pal = s.dark ? PALETTE.dark : PALETTE.light
    const fade = clamp01(s.stack) * clamp01(1 - s.out)

    g.visible = fade > 0.004
    if (!g.visible) return

    // Welded to the DOM list rather than parked near it. Six slabs floating
    // beside six rows reads as wallpaper; six slabs standing exactly behind
    // them reads as the thing the rows are describing.
    const cam = camera as THREE.PerspectiveCamera
    const worldH = 2 * CAM_OFFSET * Math.tan((cam.fov * Math.PI) / 360)
    const worldW = worldH * (size.width / size.height)
    const r = a.el.getBoundingClientRect()
    const sc = Math.min(
      2.2,
      Math.max(0.5, ((r.height / size.height) * worldH) / TOWER_H)
    )
    const cy = (0.5 - (r.top + r.height / 2) / size.height) * worldH
    const cx = ((r.left + r.width / 2) / size.width - 0.5) * worldW

    g.position.set(s.camX + cx, s.camY + cy, s.camZ - CAM_OFFSET)
    g.scale.setScalar(sc)
    mat.color.set(pal.line)
    mat.opacity = fade * 0.26 * pal.alpha

    // Which of the six the reader is level with. Measured from the layers'
    // own anchors, so it tracks the DOM list and not a guess at scroll rate.
    let active = 0
    let best = Infinity
    for (let i = 0; i < LAYERS; i++) {
      const la = anchors['layer-' + i]
      if (!la) continue
      const d = Math.abs(la.frac - s.progress)
      if (d < best) {
        best = d
        active = i
      }
    }

    markY.current = damp(markY.current, stackLayerY(active, LAYERS), 0.12, dt)
    if (mark.current) {
      mark.current.position.set(0, markY.current, 0.05)
      markMat.color.set(pal.accent)
      markMat.opacity = fade * 0.55 * clamp01(s.stack) * pal.alpha
      mark.current.visible = markMat.opacity > 0.004
    }
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geo} material={mat} />
      <lineSegments ref={mark} geometry={markGeo} material={markMat} />
    </group>
  )
}

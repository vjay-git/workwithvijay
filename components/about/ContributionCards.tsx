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
import { cardGeometry } from './geometry'

/**
 * The four contributions, as architecture rather than tiles.
 *
 * Each card in the DOM has a 3D counterpart welded to its bounding rect - the
 * outline of the card face, the plate it stands on three quarters of a metre
 * behind, and the struts between the two. The reason to put it in 3D at all is
 * the hover: the DOM card cannot actually move toward the viewer, and this can.
 * Depth increases, the plate separates, the outline picks up the accent, and
 * the DOM reveals its detail at the same moment.
 *
 * Nothing is glassmorphic. There is no fill at all - dark surface is the page's
 * own background showing through an outline, which is the restraint the rest of
 * the site is built on.
 *
 * Held at a fixed distance from the lens and placed from the live DOM rect, for
 * the same reason the stack is: the section is taller than the viewport, and an
 * object parked on the rail would have been passed by the camera long before
 * the reader reached the bottom of it.
 */

interface Props {
  state: AboutState
  anchors: Anchors
  compact: boolean
}

const COUNT = 4

export default function ContributionCards({ state, anchors, compact }: Props) {
  const { camera, size } = useThree()
  const geo = useMemo(() => cardGeometry(2, 2, !compact), [compact])
  const mats = useMemo(
    () =>
      Array.from(
        { length: COUNT },
        () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 })
      ),
    []
  )
  const groups = useRef<THREE.Group[]>([])
  // Per-card damped hover, so four cards can be at four different depths while
  // the pointer travels between them.
  const lift = useRef<number[]>([0, 0, 0, 0])

  useEffect(
    () => () => {
      geo.dispose()
      mats.forEach((m) => m.dispose())
    },
    [geo, mats]
  )

  useFrame((_, dt) => {
    const s = state
    const pal = s.dark ? PALETTE.dark : PALETTE.light
    const cam = camera as THREE.PerspectiveCamera
    const present = s.cards * clamp01(1 - s.out)

    // World size of the viewport at the plane the cards live on.
    const d = CAM_OFFSET
    const worldH = 2 * d * Math.tan((cam.fov * Math.PI) / 360)
    const worldW = worldH * (size.width / size.height)

    for (let i = 0; i < COUNT; i++) {
      const g = groups.current[i]
      const a = anchors['con-' + i]
      const m = mats[i]
      if (!g || !a) continue

      const fade = present
      const hov = damp(lift.current[i], s.hovered === i ? 1 : 0, 0.14, dt)
      lift.current[i] = hov

      if (fade < 0.004) {
        g.visible = false
        continue
      }
      g.visible = true

      // Welded to the DOM card: same column, same height, one line outside it.
      const el = a.el
      let w = worldW * 0.42
      let h = worldH * 0.36
      let x = a.cx * (worldW / 2) * 0.86
      let y = 0
      if (el) {
        const r = el.getBoundingClientRect()
        // One line outside the DOM card, not three. Any wider and the hovered
        // card's outline reaches across its neighbour.
        w = (r.width / size.width) * worldW + 0.22
        h = (r.height / size.height) * worldH + 0.22
        x = ((r.left + r.width / 2) / size.width - 0.5) * worldW
        y = (0.5 - (r.top + r.height / 2) / size.height) * worldH
      }

      // The one thing a DOM card genuinely cannot do: come toward the viewer.
      g.position.set(s.camX + x, s.camY + y, s.camZ - CAM_OFFSET + hov * 1.15)
      g.scale.set(w / 2, h / 2, 1 + hov * 0.7)
      // Turned very slightly off-axis toward the centre of the screen, so the
      // four read as objects standing in a room rather than four decals.
      g.rotation.y = -x * 0.012 * (1 - hov)

      m.color.set(hov > 0.35 ? pal.accent : pal.line)
      m.opacity = fade * (0.2 + hov * 0.45) * pal.alpha
    }
  })

  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) groups.current[i] = el
          }}
        >
          <lineSegments geometry={geo} material={mats[i]} />
        </group>
      ))}
    </>
  )
}

'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  clamp01,
  depthFade,
  PALETTE,
  railZ,
  type AboutState,
  type Anchors,
} from './aboutState'
import { gateGeometry, stageGeometry } from './geometry'

/**
 * The engineering journey as a corridor.
 *
 * Five gates on the rail, one per stage, each anchored to the DOM list item it
 * belongs to. The camera travels the rail on scroll, so the gate for stage 03
 * is in front of the lens exactly while stage 03 is the paragraph on screen -
 * not approximately, and not on a timer that drifts the moment the copy
 * reflows or someone lands mid-page from a deep link.
 *
 * "The active stage comes forward, inactive stages move deeper into space" is
 * therefore mostly free: the camera does it. What is added on top is emphasis -
 * the live gate brightens and its interior draws in, its neighbours dim to
 * structure. Distance also reaches alpha rather than colour (see depthFade),
 * because the canvas is transparent and this page has a light theme.
 *
 * Every stage carries its own topology; see geometry.ts for why.
 */

interface Props {
  state: AboutState
  anchors: Anchors
  compact: boolean
}

const COUNT = 5

export default function JourneyStages({ state, anchors, compact }: Props) {
  const detail = !compact
  const gw = compact ? 5.2 : 7.2
  const gh = compact ? 3.6 : 4.6

  // Where the stage interior sits inside its gate, as a fraction of the gate's
  // width, and how far it is scaled down to get there. The compact layout
  // stacks to one column and its gutter is proportionally much narrower, so it
  // needs both a harder push and a smaller diagram; the leftmost third bleeds
  // off the edge there, which is what the gate itself is already doing at that
  // width anyway.
  //
  // These are tuned against the real layout rather than derived from it, and
  // checked at 820 / 960 / 1100 / 1280 / 1440 - the gutter happens to scale
  // with the viewport, which is why four constants cover the range. If the
  // stage list is ever re-columned, re-check those widths: the failure mode is
  // the diagram creeping back over the copy, and it is only ever ~50px away.
  const inX = -gw * (compact ? 0.4 : 0.34)
  const inScale = compact ? 0.32 : 0.42

  const gate = useMemo(() => gateGeometry(gw, gh), [gw, gh])
  const interiors = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => stageGeometry(i, detail)),
    [detail]
  )

  // One material per gate and per interior: each fades independently with
  // distance and with how live its stage is, and sharing would flatten that.
  const gateMats = useMemo(
    () =>
      Array.from(
        { length: COUNT },
        () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 })
      ),
    []
  )
  const inMats = useMemo(
    () =>
      Array.from(
        { length: COUNT },
        () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 })
      ),
    []
  )

  const groups = useRef<THREE.Group[]>([])

  useEffect(
    () => () => {
      gate.dispose()
      interiors.forEach((g) => g.dispose())
      gateMats.forEach((m) => m.dispose())
      inMats.forEach((m) => m.dispose())
    },
    [gate, interiors, gateMats, inMats]
  )

  useFrame(() => {
    const s = state
    const pal = s.dark ? PALETTE.dark : PALETTE.light
    // The corridor exists from the moment the frame starts to let go, and is
    // gone before the contributions - see `journey` in AboutCanvas.
    const present = clamp01(s.journey) * clamp01(1 - s.calm) * clamp01(1 - s.out)

    for (let i = 0; i < COUNT; i++) {
      const g = groups.current[i]
      const a = anchors['stage-' + i]
      const gm = gateMats[i]
      const im = inMats[i]
      if (!g || !a) continue

      const z = railZ(a.frac)
      const dist = s.camZ - z
      const fade = depthFade(dist) * present

      if (fade < 0.004) {
        g.visible = false
        continue
      }
      g.visible = true

      // How live this stage is: 1 when the camera is level with it, falling off
      // over roughly one gate's spacing either side.
      const live = clamp01(1 - Math.abs(s.stageEased - i) * 1.35)

      // `live` is already zero three-quarters of a stage away, so on its own it
      // gave every other gate in the corridor the same flat base weight. Three
      // gates are inside depthFade's range at once and they are concentric, so
      // that read as nested rectangles ruled straight across the paragraph the
      // reader was in. `near` is the same measure on a wider, softer curve:
      // it is what separates the gate ahead from the gate three back.
      const near = clamp01(1 - Math.abs(s.stageEased - i) / 1.6)

      // The live gate steps toward the lens. Small - a metre out of nine - but
      // it is the difference between a corridor and a slideshow.
      g.position.set(a.cx * 0.9 * (1 - live), 0, z + live * 0.9)

      // A whisper of yaw so the passage is not a flat elevation drawing. Fixed
      // per stage, never animated: nothing here should look like it is drifting.
      g.rotation.y = a.cx * -0.06 * (1 - live * 0.7)

      gm.color.set(live > 0.5 ? pal.line : pal.lineDim)
      // Measured: the live gate holds at ~0.50 and its neighbours fall to
      // 0.02-0.07, where before every non-live gate sat flat at 0.2. The 0.04
      // floor is deliberate - the passage should still be *there* behind the
      // copy. On its own this is a subtle change; what actually cleared the
      // reading column was moving the interiors, below.
      gm.opacity = fade * (0.04 + near * near * 0.13 + live * 0.4) * pal.alpha

      im.color.set(pal.accent)
      // The interior is the stage's actual content, so it only really exists
      // while its stage is being read.
      im.opacity = fade * live * live * 0.34 * pal.alpha

      const child = g.children[1] as THREE.Object3D | undefined
      if (child) child.visible = im.opacity > 0.004
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
          <lineSegments geometry={gate} material={gateMats[i]} />
          {/* Held in the left of the passage rather than the middle of it.
              The interiors are authored 3.6-6.3 world units across, and at
              CAM_OFFSET that is most of the screen - drawn centred, every one
              of them ruled straight through the paragraph it was supposed to
              be illustrating. The left gutter is the one part of this layout
              that is genuinely empty at every width, and the only DOM it
              passes behind there is the stage number, which is already set at
              0.16 opacity precisely because it is background. */}
          <lineSegments
            geometry={interiors[i]}
            material={inMats[i]}
            position={[inX, 0, 0]}
            scale={inScale}
          />
        </group>
      ))}
    </>
  )
}

/** The camera's current fractional position among the five stages. */
export function stageFromProgress(anchors: Anchors, progress: number) {
  const fracs: number[] = []
  for (let i = 0; i < COUNT; i++) {
    const a = anchors['stage-' + i]
    if (!a) return -1
    fracs.push(a.frac)
  }
  if (progress <= fracs[0]) {
    const span = Math.max(1e-4, fracs[1] - fracs[0])
    return (progress - fracs[0]) / span
  }
  for (let i = 0; i < COUNT - 1; i++) {
    if (progress <= fracs[i + 1]) {
      const span = Math.max(1e-4, fracs[i + 1] - fracs[i])
      return i + (progress - fracs[i]) / span
    }
  }
  const span = Math.max(1e-4, fracs[COUNT - 1] - fracs[COUNT - 2])
  return COUNT - 1 + (progress - fracs[COUNT - 1]) / span
}

'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  CAM_OFFSET,
  clamp01,
  damp,
  depthFade,
  PALETTE,
  RAIL,
  railZ,
  type AboutState,
  type Anchors,
} from './aboutState'
import { toGeometry } from './geometry'
import PortraitField from './PortraitField'
import JourneyStages, { stageFromProgress } from './JourneyStages'
import ContributionCards from './ContributionCards'
import StackTower from './StackTower'

/**
 * One camera, one move, one building.
 *
 * The camera does exactly one thing for the length of the page: it travels in
 * a straight line down -Z at a rate set by scroll progress. It never orbits,
 * never rolls, never flies around a section to show off. Everything that reads
 * as "the camera moved through the environment" is that single dolly plus the
 * fact that the architecture is placed along the same line.
 *
 * Two small additions on top, both of them responses rather than idles:
 *   - a damped pointer offset, desktop only, worth a quarter of a world unit.
 *     This is the parallax between the portrait and the type. It is tiny on
 *     purpose; anything larger and the page starts swimming.
 *   - a lens that opens a few degrees through the journey and closes again,
 *     which is what makes the corridor feel entered rather than watched.
 *
 * There are no lights and no environment probe. There is nothing here to light:
 * every object in this scene is a LineSegments or an unlit plane, and the one
 * thing that ever needed a reflection - the metal frame around the portrait -
 * is gone, replaced by the soft field in PortraitField. A studio rig kept
 * around for nothing still costs a cubemap render on every mount.
 */

interface Props {
  state: AboutState
  anchors: Anchors
  compact: boolean
}

export default function AboutScene({ state, anchors, compact }: Props) {
  const { camera, gl } = useThree()
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    cam.near = 0.1
    cam.far = 90
    cam.fov = 34
    cam.updateProjectionMatrix()
    gl.toneMappingExposure = 1.4
  }, [camera, gl])

  // Pointer parallax. Coarse pointers get none: on a phone the only "pointer"
  // is a tap, and a scene that lurches under your thumb is not parallax.
  useEffect(() => {
    if (compact) return
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [compact])

  useFrame((_, dt) => {
    const s = state
    const cam = camera as THREE.PerspectiveCamera
    const p = pointer.current

    p.x = damp(p.x, p.tx, 0.06, dt)
    p.y = damp(p.y, p.ty, 0.06, dt)

    // The dolly. Damped rather than assigned, so a trackpad flick arrives as a
    // move and not a cut - "smooth interpolation for camera movement" is the
    // one line of this that is not negotiable.
    const targetZ = CAM_OFFSET - RAIL * s.progress
    s.camZ = damp(s.camZ, targetZ, 0.11, dt)
    s.camX = damp(s.camX, p.x * 0.26, 0.1, dt)
    s.camY = damp(s.camY, -p.y * 0.16, 0.1, dt)
    s.stageEased = damp(s.stageEased, stageFromProgress(anchors, s.progress), 0.13, dt)

    cam.position.set(s.camX, s.camY, s.camZ)
    cam.lookAt(s.camX * 0.4, s.camY * 0.4, s.camZ - 12)

    // A few degrees of breathing room while inside the corridor, closed again
    // for the stack and the climax where the composition wants to be flat.
    const fov = 34 + clamp01(s.expand) * (1 - clamp01(s.calm)) * 4
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = damp(cam.fov, fov, 0.08, dt)
      cam.updateProjectionMatrix()
    }
  })

  return (
    <>
      <PortraitField state={state} anchors={anchors} compact={compact} />
      <JourneyStages state={state} anchors={anchors} compact={compact} />
      <ContributionCards state={state} anchors={anchors} compact={compact} />
      <StackTower state={state} anchors={anchors} compact={compact} />
      <ClimaxHorizon state={state} anchors={anchors} />
    </>
  )
}

/* ==========================================================================
   the climax - the least there is on the page
   ========================================================================== */

/**
 * One line, one mark, and nothing else.
 *
 * "The systems are technical. The responsibility is human." is the only thing
 * that should be doing any work on that screen. So the 3D contribution is a
 * single horizon and a single cyan node that crosses it over about two minutes -
 * slow enough that you are never sure it is moving, present enough that the
 * space does not read as dead.
 */
function ClimaxHorizon({ state, anchors }: { state: AboutState; anchors: Anchors }) {
  const geo = useMemo(() => {
    const p: number[] = []
    p.push(-26, 0, 0, 26, 0, 0)
    return toGeometry(p)
  }, [])
  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }),
    []
  )
  const nodeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: PALETTE.dark.accent,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  )
  const group = useRef<THREE.Group>(null)
  const node = useRef<THREE.Mesh>(null)

  useEffect(
    () => () => {
      geo.dispose()
      mat.dispose()
      nodeMat.dispose()
    },
    [geo, mat, nodeMat]
  )

  useFrame(() => {
    const s = state
    const g = group.current
    const a = anchors['human']
    if (!g || !a) return

    const pal = s.dark ? PALETTE.dark : PALETTE.light
    const z = railZ(a.frac)
    const fade = depthFade(s.camZ - z) * clamp01(s.human)

    g.visible = fade > 0.003
    if (!g.visible) return

    g.position.set(0, -1.9, z)
    mat.color.set(pal.line)
    mat.opacity = fade * 0.2 * pal.alpha

    if (node.current) {
      // 118 seconds end to end. Deliberately below the threshold at which
      // motion registers as motion.
      const t = ((performance.now() / 118000) % 1) * 2 - 1
      node.current.position.set(t * 11, 0, 0)
      nodeMat.color.set(pal.accent)
      nodeMat.opacity = fade * 0.7 * pal.alpha
    }
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geo} material={mat} />
      <mesh ref={node} material={nodeMat}>
        <circleGeometry args={[0.045, 12]} />
      </mesh>
    </group>
  )
}

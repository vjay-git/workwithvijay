'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Logo3D from './Logo3D'
import SpatialPanels from './SpatialPanels'
import Corridor from './Corridor'
import { fitScale } from './fit'
import type { IntroState } from './introTimeline'

/**
 * The scene: camera, light, the mark, the interior.
 *
 * Lighting is built from Lightformers inside a drei <Environment>, not from a
 * downloaded HDR. That is deliberate - an HDR is a megabyte or two from a CDN,
 * it can fail or arrive late, and "just fetch it" is exactly what makes an
 * intro janky on a cold load. A handful of emissive rectangles give a
 * controlled studio reflection that renders identically every time and costs
 * nothing to fetch.
 *
 * The key sweeps horizontally while the mark materialises. The light moves and
 * the object does not, which is what gives a flat wordmark thickness.
 */

interface Props {
  state: IntroState
  paths: { collab: THREE.ShapePath[]; withVijay: THREE.ShapePath[]; accent: THREE.ShapePath[] }
  compact: boolean
}

export default function IntroScene({ state, paths, compact }: Props) {
  const { camera, gl, size } = useThree()
  // One number scales the whole authored composition to what this viewport can
  // actually see. Recomputed on resize, which is why it lives here and not in
  // a module constant.
  const fit = useMemo(() => fitScale(size.width, size.height), [size.width, size.height])
  const target = useMemo(() => new THREE.Vector3(), [])
  const key = useRef<THREE.DirectionalLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const inner = useRef<THREE.PointLight>(null)

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    cam.near = 0.1
    cam.far = 70
    cam.updateProjectionMatrix()
    // Filmic exposure: the blacks must stay black while the metal still gets a
    // specular hit. Lifting the lights instead would grey out the background.
    gl.toneMappingExposure = 1.55
  }, [camera, gl])

  useFrame(() => {
    const s = state
    const cam = camera as THREE.PerspectiveCamera
    cam.position.set(s.camX, s.camY, s.camZ)
    // Looking ahead down the corridor once past the mark, at it before that.
    target.set(0, s.lookY, s.camZ > 0.5 ? 0 : s.camZ - 7)
    cam.lookAt(target)
    if (cam.fov !== s.fov) {
      cam.fov = s.fov
      cam.updateProjectionMatrix()
    }

    if (key.current) {
      const sweep = -4.6 + s.logoIn * 8.4
      key.current.position.set(sweep, 3.6, 6.4)
      key.current.intensity = 0.8 + s.logoIn * 3.4
    }
    if (rim.current) rim.current.intensity = 0.5 + s.logoIn * 1.5
    // A cold source living inside the doorway: it only matters once the mark
    // has parted, so it rises with the split and lights the interior.
    if (inner.current) {
      inner.current.intensity = s.split * 26 + s.panels * 14
      inner.current.position.set(0, 0.4, -2.2 - s.panels * 2.4)
    }
  })

  return (
    <>
      <color attach="background" args={['#050607']} />
      <fog attach="fog" args={['#050607', 16, 42]} />

      <ambientLight intensity={0.12} />
      <directionalLight ref={key} intensity={2.2} color="#f2f7fa" position={[0, 3.6, 6.4]} />
      <directionalLight ref={rim} position={[-6, -1.8, -5]} intensity={1.2} color="#16D9E8" />
      <pointLight ref={inner} color="#bfeef4" distance={26} decay={2} intensity={0} />

      {/* A tight studio box. Bright bar above, two cool side panels for the
          edge highlights that make an extrusion legible, one dim floor bounce. */}
      <Environment resolution={192} frames={1}>
        <Lightformer intensity={5.5} position={[0, 3.8, 4.5]} scale={[11, 2.4, 1]} color="#ffffff" />
        <Lightformer intensity={2.6} position={[-6, 0.8, 3]} scale={[2.4, 6, 1]} color="#dff0f6" />
        <Lightformer intensity={2.2} position={[6, -0.4, 3]} scale={[2.4, 6, 1]} color="#8fe2ec" />
        <Lightformer intensity={1.4} position={[0, -3.6, -2]} scale={[9, 2.4, 1]} color="#6b7c85" />
        <Lightformer intensity={1.8} position={[0, 0, -8]} scale={[6, 6, 1]} color="#3d5b63" />
      </Environment>

      <Logo3D
        state={state}
        collab={paths.collab}
        withVijay={paths.withVijay}
        accent={paths.accent}
        compact={compact}
        fit={fit}
      />

      <Corridor state={state} compact={compact} fit={fit} />
      <SpatialPanels state={state} compact={compact} fit={fit} />
    </>
  )
}

/**
 * Splits the traced master into the three groups the scene needs.
 *
 * SVGLoader keeps each <path> but not the <g> it came from, so the bands are
 * recovered from the element ids the tracer wrote. Those ids are a contract;
 * see scripts/trace-logo.js.
 */
export function splitPaths(data: { paths: THREE.ShapePath[] }) {
  const out = {
    collab: [] as THREE.ShapePath[],
    withVijay: [] as THREE.ShapePath[],
    accent: [] as THREE.ShapePath[],
  }
  for (const p of data.paths) {
    const el = (p as unknown as { userData?: { node?: Element } }).userData?.node
    const id = el?.id || ''
    if (id.startsWith('collab-')) out.collab.push(p)
    else if (id.startsWith('wv-')) out.withVijay.push(p)
    else if (id.startsWith('accent-')) out.accent.push(p)
    // #studio is intentionally dropped: illegible at this scale in 3D, and it
    // is already set properly as HTML in the hero eyebrow.
  }
  return out
}

'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import type { IntroState } from './introTimeline'

/**
 * The approved wordmark as a physical object.
 *
 * Geometry comes from the traced master (public/collab-logo-traced.svg), whose
 * #collab group is six separate glyph paths - so the mark is six independent
 * solids, not one slab with a seam drawn on it. That is what lets it actually
 * open: C-O-L travel left, L-A-B travel right, and the camera goes through the
 * gap between them.
 *
 * Extrusion is deliberately shallow with a small bevel. Deep chrome letters read
 * as a 2004 logo sting; a thin bevel catching one rim light reads as milled
 * metal, which is the brief.
 */

interface Props {
  state: IntroState
  collab: THREE.ShapePath[]
  withVijay: THREE.ShapePath[]
  accent: THREE.ShapePath[]
  compact: boolean
  /** Viewport fit, from fit.ts. 1 = the frame this was authored in. */
  fit: number
}

/**
 * SVG space is Y-down, so the mark arrives upside down. Mirroring with a
 * negative scale would invert triangle winding and light every face from the
 * wrong side, so the flip is baked in here: negate Y, reverse each triangle,
 * recompute normals. ExtrudeGeometry is non-indexed, so a triangle is three
 * consecutive vertices in every attribute.
 */
function mirrorY(geo: THREE.BufferGeometry) {
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) pos.setY(i, -pos.getY(i))
  pos.needsUpdate = true

  for (const name of Object.keys(geo.attributes)) {
    const attr = geo.getAttribute(name) as THREE.BufferAttribute
    const item = attr.itemSize
    const arr = attr.array as Float32Array
    for (let t = 0; t + 2 < attr.count; t += 3) {
      for (let c = 0; c < item; c++) {
        const a = (t + 0) * item + c
        const b = (t + 2) * item + c
        const tmp = arr[a]
        arr[a] = arr[b]
        arr[b] = tmp
      }
    }
    attr.needsUpdate = true
  }
  geo.computeVertexNormals()
  return geo
}

function buildGlyphs(paths: THREE.ShapePath[], depth: number, bevel: number) {
  const out: THREE.ExtrudeGeometry[] = []
  for (const p of paths) {
    // createShapes honours the even-odd holes the tracer wrote, so counters
    // stay counters instead of filling in once extruded.
    const shapes = SVGLoader.createShapes(p)
    if (!shapes.length) continue
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 5,
    })
    mirrorY(geo)
    out.push(geo)
  }
  return out
}

export default function Logo3D({ state, collab, withVijay, accent, compact, fit }: Props) {
  const root = useRef<THREE.Group>(null)
  const left = useRef<THREE.Group>(null)
  const right = useRef<THREE.Group>(null)
  const sub = useRef<THREE.Group>(null)

  const built = useMemo(() => {
    const D = 34, SD = 16 // SVG units; normalised to world units below
    const g = buildGlyphs(collab, D, 1.8)
    const w = buildGlyphs(withVijay, SD, 1.0)
    const a = buildGlyphs(accent, SD, 1.0)

    // Normalise the whole lockup once: centre it on the origin and scale so the
    // mark is a known width in world units. Every other number in this file is
    // then a comfortable single digit.
    const box = new THREE.Box3()
    for (const geo of [...g, ...w, ...a]) {
      geo.computeBoundingBox()
      box.union(geo.boundingBox!)
    }
    const size = box.getSize(new THREE.Vector3())
    const centre = box.getCenter(new THREE.Vector3())
    // Normalised to exactly 1 unit wide. The world size is applied to the root
    // group instead, so it can follow the viewport without rebuilding geometry.
    const scale = 1 / (size.x || 1)
    for (const geo of [...g, ...w, ...a]) {
      geo.translate(-centre.x, -centre.y, -centre.z)
      geo.scale(scale, scale, scale)
    }
    return { g, w, a }
  }, [collab, withVijay, accent])

  const metal = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      // metalness deliberately short of 1: a fully metallic surface has no
      // diffuse response, so the key light contributes only a specular pin and
      // the mark reads as flat grey no matter how bright the rig gets.
      color: new THREE.Color('#eef4f7'),
      metalness: 0.72, roughness: 0.21,
      clearcoat: 0.75, clearcoatRoughness: 0.22,
      envMapIntensity: 2.1,
    }), [])

  const quiet = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c2ced5'),
      metalness: 0.6, roughness: 0.34, envMapIntensity: 1.5,
    }), [])

  // The accent keeps the brand's cyan and is the only emissive thing in the
  // scene. One lit element among reflective ones reads as intent; two would
  // read as decoration.
  const glow = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#16D9E8'),
      emissive: new THREE.Color('#16D9E8'),
      emissiveIntensity: 2.2,
      metalness: 0.2, roughness: 0.4,
    }), [])

  useEffect(() => () => {
    metal.dispose(); quiet.dispose(); glow.dispose()
    for (const geo of [...built.g, ...built.w, ...built.a]) geo.dispose()
  }, [metal, quiet, glow, built])

  // COL | LAB - the mark parts on its own optical centre.
  const mid = Math.ceil(built.g.length / 2)

  // The mark fills the frame it is actually being shown in, rather than a
  // constant that happened to suit a 16:9 desktop.
  const width = (compact ? 7.9 : 7.4) * fit

  useFrame(() => {
    const s = state
    const open = s.split
    const throwX = open * 4.2
    const throwZ = open * 0.7
    if (left.current) {
      left.current.position.set(-throwX, 0, throwZ)
      left.current.rotation.y = open * 0.2
    }
    if (right.current) {
      right.current.position.set(throwX, 0, throwZ)
      right.current.rotation.y = -open * 0.2
    }
    // WITH VIJAY leaves earlier and faster: it is the caption, not the door.
    if (sub.current) {
      sub.current.position.y = -open * 1.9
      sub.current.visible = open < 0.9
      const m = quiet as THREE.MeshPhysicalMaterial
      m.opacity = 1 - open
    }
    if (root.current) {
      root.current.scale.setScalar(width)
      root.current.rotation.x = s.logoTilt * 0.5
      root.current.rotation.y = s.logoTilt * 0.25
      root.current.visible = s.logoIn > 0.001
    }
    // Materialising is a lighting event, not a fade: the metal gains its
    // reflectivity rather than its opacity.
    metal.envMapIntensity = 0.1 + s.logoIn * 2.0
    metal.roughness = 0.55 - s.logoIn * 0.34
    glow.emissiveIntensity = s.logoIn * 2.2
  })

  return (
    <group ref={root}>
      <group ref={left}>
        {built.g.slice(0, mid).map((geo, i) => (
          <mesh key={i} geometry={geo} material={metal} />
        ))}
      </group>
      <group ref={right}>
        {built.g.slice(mid).map((geo, i) => (
          <mesh key={i} geometry={geo} material={metal} />
        ))}
      </group>
      <group ref={sub}>
        {built.w.map((geo, i) => (
          <mesh key={i} geometry={geo} material={quiet} />
        ))}
        {built.a.map((geo, i) => (
          <mesh key={'a' + i} geometry={geo} material={glow} />
        ))}
      </group>
    </group>
  )
}

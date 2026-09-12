'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  CAM_OFFSET,
  clamp01,
  damp,
  PALETTE,
  railZ,
  type AboutState,
  type Anchors,
} from './aboutState'
import { toGeometry } from './geometry'

/**
 * The light the portrait emerges from, and the thing it turns into.
 *
 * This was a frame - four machined bars standing around the photograph - and
 * that was the wrong idea. A frame is an object with edges, and the moment you
 * put one on a page like this the portrait stops being part of the environment
 * and becomes a picture hanging in it. So the edges are gone in both layers:
 * the photograph now dissolves into the page background as a gradient (CSS,
 * .ab-figure-plate), and what the WebGL layer contributes is the LIGHT that
 * dissolve reads against - one soft field behind the subject, which is what
 * makes a fade look like depth rather than a crop.
 *
 * The photograph itself is untouched: in colour, unsegmented, unretouched, the
 * page's LCP, a plain next/image in the DOM. Nothing waits on a model download.
 *
 * The field is welded to the live bounding rect of the plate, so it survives
 * resize, reflow and font swap. Then `expand` runs 0 -> 1, the field contracts
 * onto the rail, and four lines leave it and become the corridor. The hinge of
 * the page is intact - the portrait still becomes the path - it just no longer
 * needs a frame to do it.
 *
 * Nothing in this file uses a lit material, which is why the scene carries no
 * lights and no environment probe any more. See AboutScene.
 */

interface Props {
  state: AboutState
  anchors: Anchors
  compact: boolean
}

/** How far past the photograph the light spills, as a fraction of its size. */
const BLEED = 0.55

export default function PortraitField({ state, anchors, compact }: Props) {
  const { camera, size } = useThree()
  const group = useRef<THREE.Group>(null)
  const field = useRef<THREE.Mesh>(null)
  const railsRef = useRef<THREE.LineSegments>(null)

  // Half-extents of the field, damped. Written in useFrame.
  const box = useRef({ x: 0, y: 0, w: 1.6, h: 2.0, z: 0, on: 0 })

  /**
   * The falloff, drawn once into a 128px canvas.
   *
   * Procedural rather than fetched: it is four lines of 2D canvas and it can
   * never arrive late, fail, or cost a request. A shader would be the other
   * option and would cost a program compile for a gradient.
   */
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 128
    c.height = 128
    const g = c.getContext('2d')
    if (g) {
      const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
      grd.addColorStop(0, 'rgba(255,255,255,0.95)')
      grd.addColorStop(0.32, 'rgba(255,255,255,0.42)')
      grd.addColorStop(0.62, 'rgba(255,255,255,0.12)')
      grd.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = grd
      g.fillRect(0, 0, 128, 128)
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  const fieldMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: tex,
        color: '#9fdfe8',
        transparent: true,
        opacity: 0,
        // Light added to the page, not a panel laid over it. Additive is also
        // what keeps this invisible on the light theme, where there is no
        // darkness for a glow to be legible against - hence the palette's
        // alpha, which takes it most of the way down there anyway.
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [tex]
  )

  // Four lines leaving the field. Zero until `expand`, then the corridor.
  const railGeo = useMemo(() => {
    const p: number[] = []
    const c: [number, number][] = [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]
    for (const [sx, sy] of c) p.push(sx, sy, 0, sx, sy, -1)
    return toGeometry(p)
  }, [])

  const railMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: PALETTE.dark.accent,
        transparent: true,
        opacity: 0,
      }),
    []
  )

  useEffect(
    () => () => {
      tex.dispose()
      fieldMat.dispose()
      railGeo.dispose()
      railMat.dispose()
    },
    [tex, fieldMat, railGeo, railMat]
  )

  useFrame((_, dt) => {
    const s = state
    const g = group.current
    if (!g) return

    const pal = s.dark ? PALETTE.dark : PALETTE.light
    const b = box.current

    /* ---- where the light wants to be ------------------------------------ */

    // A) behind the photograph, wherever the browser has decided to put it.
    let tx = 0
    let ty = 0
    let tw = 1.7
    let th = 2.1
    let tz = s.camZ - CAM_OFFSET
    let visible = false

    // Not on a phone. There the portrait is already full-bleed and the CSS
    // dissolve carries the whole effect; a light field wider than the screen
    // is just a raised black level.
    const fig = compact ? null : s.figure
    if (fig) {
      const r = fig.getBoundingClientRect()
      if (r.width > 4 && r.bottom > -size.height && r.top < size.height * 2) {
        const cam = camera as THREE.PerspectiveCamera
        const d = CAM_OFFSET
        const vh = 2 * d * Math.tan((cam.fov * Math.PI) / 360)
        const vw = vh * (size.width / size.height)
        const cx = r.left + r.width / 2
        // Biased toward the subject rather than the box: the head sits in the
        // upper third of the crop, and light behind the middle of a portrait
        // lights the shirt.
        const cy = r.top + r.height * 0.38
        tx = s.camX + ((cx / size.width) * 2 - 1) * (vw / 2)
        ty = s.camY + (1 - (cy / size.height) * 2) * (vh / 2)
        tw = (r.width / size.width) * vw * (1 + BLEED)
        th = (r.height / size.height) * vh * (1 + BLEED)
        tz = s.camZ - d - 0.6
        visible = true
      }
    }

    // B) the mouth of the corridor: centred, gate-sized, parked on the rail
    //    just ahead of the first stage.
    const first = anchors['stage-0']
    if (first) {
      const gw = compact ? 5.2 : 7.2
      const gh = compact ? 3.6 : 4.6
      const gz = railZ(first.frac) + 8
      const e = s.expand
      tx += (0 - tx) * e
      ty += (0 - ty) * e
      tw += (gw - tw) * e
      th += (gh - th) * e
      tz += (gz - tz) * e
      if (e > 0.02) visible = true
    }

    // Damped, not snapped: the light settles onto every new position rather
    // than tracking it exactly, which is what stops a flick of the scrollwheel
    // reading as a jolt.
    const l = 0.16
    b.x = damp(b.x, tx, l, dt)
    b.y = damp(b.y, ty, l, dt)
    b.w = damp(b.w, tw, l, dt)
    b.h = damp(b.h, th, l, dt)
    b.z = damp(b.z, tz, l, dt)

    /* ---- presence -------------------------------------------------------- */

    const target = visible && s.out < 0.9 ? clamp01(1 - s.calm) * clamp01(1 - s.out) : 0
    b.on = damp(b.on, target, 0.1, dt)

    g.visible = b.on > 0.004
    if (!g.visible) return

    g.position.set(b.x, b.y, b.z)

    const dist = s.camZ - b.z
    const near = clamp01((dist - 1.4) / 3)

    /* ---- the field ------------------------------------------------------- */

    if (field.current) {
      field.current.scale.set(b.w, b.h, 1)
      // Hands over to the corridor as it expands: by the time it is a doorway
      // it is a suggestion of light, not a lamp.
      fieldMat.opacity = b.on * near * (0.3 - s.expand * 0.2) * pal.alpha
      field.current.visible = fieldMat.opacity > 0.003
    }

    /* ---- the rails, once the light lets go ------------------------------- */

    const last = anchors['stage-4']
    const railEnd = last ? railZ(last.frac) - 10 : -60
    const len = Math.max(0.001, b.z - railEnd)
    if (railsRef.current) {
      railsRef.current.scale.set(b.w / 2, b.h / 2, len)
      // They run from here to the far end of the corridor, so the moment the
      // camera passes them they become four lines radiating out of the back of
      // the lens. `near` is what stops that.
      railMat.opacity = b.on * near * s.journey * 0.22 * pal.alpha
      railMat.color.set(pal.accent)
      railsRef.current.visible = railMat.opacity > 0.004
    }
  })

  return (
    <group ref={group}>
      <mesh ref={field} material={fieldMat}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <lineSegments ref={railsRef} geometry={railGeo} material={railMat} />
    </group>
  )
}

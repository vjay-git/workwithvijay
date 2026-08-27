import gsap from 'gsap'

/**
 * THE timeline. One GSAP instance, one mutable state object, ten stages.
 *
 * Every moving part in the intro - camera, logo separation, panel unfold, the
 * DOM hero's arrival - reads from this object inside a single useFrame. Nothing
 * else drives anything. That is what makes it one continuous shot instead of a
 * dozen animations that happen to overlap, and it means the whole experience can
 * be scrubbed, paused or skipped by touching one object.
 *
 * The state is deliberately plain and mutable: GSAP writes to it 60x a second
 * and React must never see those writes.
 */
export interface IntroState {
  /** Overall progress, 0..1. Only used for coarse gating. */
  p: number

  // --- camera -------------------------------------------------------------
  camX: number
  camY: number
  camZ: number
  /** Where the camera looks, on Y. The shot reorients rather than rotating. */
  lookY: number
  /** Field of view. Widens slightly on approach, which reads as acceleration. */
  fov: number

  // --- the mark -----------------------------------------------------------
  /** 0 = unlit slab, 1 = fully materialised metal. */
  logoIn: number
  /** 0 = closed wordmark, 1 = fully parted. This is the doorway. */
  split: number
  /** Rotation of the whole mark, radians. Very small - it is architecture. */
  logoTilt: number

  // --- environment --------------------------------------------------------
  /** Panels present at all. */
  panels: number
  /** Panels rotated from edge-on to face the camera. */
  unfold: number
  /** Panels settled into the positions the hero blocks will occupy. */
  settle: number

  // --- handoff ------------------------------------------------------------
  /** Canvas opacity. The 3D never cuts; it recedes. */
  fade: number
  /** DOM hero reveal, 0..1. Written to CSS as --intro-reveal. */
  reveal: number
}

/**
 * Where the camera comes to rest. Must sit IN FRONT of SpatialPanels' SETTLE_Z,
 * or the layout the panels assemble ends up behind the lens.
 */
export const CAM_REST = -5.1

export function createIntroState(): IntroState {
  return {
    p: 0,
    camX: 0, camY: 0, camZ: 9.2, lookY: 0, fov: 34,
    logoIn: 0, split: 0, logoTilt: 0,
    panels: 0, unfold: 0, settle: 0,
    fade: 1, reveal: 0,
  }
}

export interface IntroOptions {
  /** Mobile runs the same story with fewer beats and a shorter throw. */
  compact: boolean
  /** Returning in the same session: the condensed recap, not the full film. */
  brief: boolean
  onReveal: (v: number) => void
  onComplete: () => void
}

/**
 * Stage map. Durations are seconds; the desktop total is ~4.1s, inside the 3-5s
 * the brief allows. `brief` collapses it to about a second - enough to feel
 * deliberate, not enough to be a toll booth on every navigation.
 */
export function buildIntroTimeline(s: IntroState, opts: IntroOptions) {
  const { compact, brief } = opts
  // One scalar scales the whole film, so the beats keep their proportions.
  const k = brief ? 0.26 : compact ? 0.66 : 1

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
    onUpdate() {
      s.p = tl.progress()
      opts.onReveal(s.reveal)
    },
    onComplete: opts.onComplete,
  })

  // 01 - REVEAL. The mark resolves out of black. Nothing moves but the light.
  tl.to(s, { logoIn: 1, duration: 0.9 * k, ease: 'power2.out' }, 0)
    .to(s, { camZ: 8.4, duration: 1.4 * k, ease: 'power1.inOut' }, 0)

  // 02 - PHYSICAL. A slow push and a fractional tilt give it thickness. This is
  //      the only rotation in the whole piece; the mark is a building, not a toy.
  tl.to(s, { logoTilt: 0.075, duration: 1.1 * k, ease: 'power2.inOut' }, 0.55 * k)
    .to(s, { camX: -0.35, camY: 0.18, duration: 1.3 * k }, 0.55 * k)

  // 03 - OPEN. The wordmark parts at its centre. Mechanical, not elastic: the
  //      halves are heavy and they stop dead.
  tl.to(s, { split: 1, duration: 1.25 * k, ease: 'power3.inOut' }, 1.15 * k)

  // 04 - EXPAND. The interior is already there; the opening simply admits light
  //      to it, so the panels rise while the mark is still parting.
  tl.to(s, { panels: 1, duration: 1.0 * k, ease: 'power2.out' }, 1.45 * k)

  // 05 - THROUGH. The shot commits. FOV widens on the way in, which the eye
  //      reads as speed without the camera actually snapping.
  tl.to(s, { camZ: -6.4, duration: 1.35 * k, ease: 'power2.inOut' }, 1.8 * k)
    .to(s, { fov: 47, duration: 0.7 * k, ease: 'power2.in' }, 1.8 * k)
    .to(s, { fov: 38, duration: 0.85 * k, ease: 'power2.out' }, 2.5 * k)
    .to(s, { camX: 0.12, camY: -0.08, duration: 1.35 * k }, 1.8 * k)

  // 06 - UNFOLD. Passing them is what opens them: the panels turn to face the
  //      lens as it goes by, so the motion belongs to the shot.
  tl.to(s, { unfold: 1, duration: 1.0 * k, ease: 'power2.inOut' }, 2.15 * k)

  // 07 - REST. A short retreat and a small rise, then the camera is done. It
  //      stops before anything else does, so the frame is calm when type lands.
  //      CAM_REST must stay in front of SpatialPanels' SETTLE_Z (-12.6) or the
  //      layout assembles behind the lens - which is exactly what a second of
  //      black in the middle of the first cut turned out to be.
  tl.to(s, { camZ: CAM_REST, camY: 0.34, lookY: -0.06, duration: 1.25 * k, ease: 'power3.out' }, 2.7 * k)

  // 08 - SETTLE. The panels stop being objects and become the layout: they move
  //      to where the eyebrow, headline, paragraph and action row will be.
  tl.to(s, { settle: 1, duration: 1.1 * k, ease: 'power3.inOut' }, 2.8 * k)

  // 09 - HANDOFF. The hero rises INTO the frame the panels just built while the
  //      3D recedes underneath it. The overlap is the point: for ~0.4s both are
  //      on screen, which is what sells "the world became the website".
  tl.to(s, { reveal: 1, duration: 0.95 * k, ease: 'power2.out' }, 3.15 * k)
    .to(s, { fade: 0, duration: 0.8 * k, ease: 'power2.inOut' }, 3.35 * k)

  // 10 - the canvas unmounts in onComplete; the page is already interactive.
  return tl
}

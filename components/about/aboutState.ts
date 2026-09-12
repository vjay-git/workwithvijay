/**
 * The About page's spatial layer: state, and the rail that keeps it honest.
 *
 * One rule holds the whole thing together. THE DOM PAGE IS THE PAGE. Every
 * word, every link and every reveal on /about works with this file deleted -
 * see components/AboutProfile.tsx, which renders complete without it. What
 * lives here is a layer drawn *behind* that page, and its only job is to put
 * the right piece of architecture behind the right paragraph.
 *
 * That "right place" is not eyeballed. Every 3D object is anchored to a real
 * DOM element via `[data-ab-anchor]`, measured once and on resize, and placed
 * on a straight rail down -Z. The camera travels the same rail on scroll
 * progress. When a section is centred in the viewport, its geometry is exactly
 * CAM_OFFSET units in front of the lens - so the environment cannot drift out
 * of sync with the writing no matter how the copy reflows.
 *
 * There is no per-section canvas and no per-section camera. One context, one
 * lens, one continuous move through a building.
 */

/** World length of the whole page, nose to tail. */
export const RAIL = 132

/** How far in front of the lens an anchored object sits when it is "current". */
export const CAM_OFFSET = 9

/** Where an anchor lives once measured. */
export interface Anchor {
  /** Scroll progress (0..1) at which this element is centred in the viewport. */
  frac: number
  /** Horizontal centre relative to the viewport, -1..1. */
  cx: number
  /** Height of the element as a fraction of the viewport. */
  h: number
  /** The element itself, so live rects can be read without a re-query. */
  el: HTMLElement
}

export type Anchors = Record<string, Anchor>

/**
 * Everything the scene reads, in one mutable object.
 *
 * Deliberately not React state. These values are written by ScrollTrigger and
 * read in useFrame; routing them through the reconciler would mean a render
 * per frame for numbers no component ever needs to see.
 */
export interface AboutState {
  /* ---- written by ScrollTrigger ---------------------------------------- */
  /** 0..1 down the whole page. Drives the camera dolly. */
  progress: number
  /** 0..1. The portrait frame letting go of the photograph and becoming rails. */
  expand: number
  /** 0..1 presence of the corridor. Falls away once stage 05 is behind us. */
  journey: number
  /** Fractional index of the live journey stage, -1 before the first. */
  stage: number
  /** 0..1 presence of the contribution cards. */
  cards: number
  /** 0..1 presence of the six-layer stack. */
  stack: number
  /**
   * 0..1 through the rules. The section that has to feel calm, so this reads
   * as an inverse: the closer to 1, the less there is to look at.
   */
  calm: number
  /** 0..1 through the climax. Near-empty space. */
  human: number
  /** 0..1 at the close - the layer leaves before the call to action. */
  out: number

  /* ---- written by the page --------------------------------------------- */
  /** Index of the hovered contribution card, or -1. */
  hovered: number
  /** The hero <figure>, so the frame can lock to the real photograph. */
  figure: HTMLElement | null

  /* ---- written in useFrame, read by the scene --------------------------- */
  camZ: number
  camX: number
  camY: number
  /** Damped copy of `stage`, so a fast scroll does not snap the emphasis. */
  stageEased: number

  /* ---- palette, swapped live when the theme toggles --------------------- */
  dark: boolean
}

export function createAboutState(): AboutState {
  return {
    progress: 0,
    expand: 0,
    journey: 0,
    stage: -1,
    cards: 0,
    stack: 0,
    calm: 0,
    human: 0,
    out: 0,
    hovered: -1,
    figure: null,
    camZ: CAM_OFFSET,
    camX: 0,
    camY: 0,
    stageEased: -1,
    dark: true,
  }
}

/** Where on the rail an anchored object sits. */
export function railZ(frac: number) {
  return -RAIL * frac
}

/**
 * Measures every `[data-ab-anchor]` in `root` against the same scroll geometry
 * ScrollTrigger uses for the page ("top top" -> "bottom bottom"), so a frac of
 * 0.4 here and a progress of 0.4 there mean the same instant.
 */
export function measureAnchors(root: HTMLElement): Anchors {
  const out: Anchors = {}
  const vh = window.innerHeight
  const vw = window.innerWidth
  const rootTop = root.getBoundingClientRect().top + window.scrollY
  // The scrollable distance ScrollTrigger will report progress across.
  const span = Math.max(1, root.offsetHeight - vh)

  root.querySelectorAll<HTMLElement>('[data-ab-anchor]').forEach((el) => {
    const key = el.dataset.abAnchor
    if (!key) return
    const r = el.getBoundingClientRect()
    const docCenter = r.top + window.scrollY + r.height / 2
    out[key] = {
      frac: clamp01((docCenter - vh / 2 - rootTop) / span),
      cx: clamp((r.left + r.width / 2 - vw / 2) / (vw / 2), -1, 1),
      h: r.height / vh,
      el,
    }
  })
  return out
}

/* -------------------------------------------------------------------------- */

export const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)
export const clamp01 = (v: number) => clamp(v, 0, 1)

/** Frame-rate independent damping. `l` is the fraction closed per 60Hz frame. */
export function damp(current: number, target: number, l: number, dt: number) {
  return current + (target - current) * (1 - Math.pow(1 - l, Math.min(3, dt * 60)))
}

/** 0 at the edges of [a,b], 1 in the middle, smoothed. Used for distance fades. */
export function band(v: number, a: number, b: number) {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/**
 * How visible something is at `dist` in front of the lens.
 *
 * Replaces THREE.Fog. Fog tints toward a colour, which is exactly wrong on a
 * canvas that has to be transparent so the page's own background - and its
 * light theme - shows through. Distance has to reach alpha, not hue.
 */
export function depthFade(dist: number) {
  if (dist < 0) return 0
  // Tight at both ends. The whole page is 132 units and the sections are eight
  // or so apart, so a far bound of 30 is already two sections back - anything
  // looser and the corridor is still on screen while the reader is reading
  // about something else, which is how a scene stops meaning anything.
  return band(dist, 0.8, 4.5) * (1 - band(dist, 15, 30))
}

/* --- palette --------------------------------------------------------------
   Mirrors the --a-* tokens in globals.css. The page is themeable and the
   canvas sits *inside* .ab, so a hard-coded dark scene would paint a black
   architecture over a paper-white page. Both palettes exist for that reason.
   ------------------------------------------------------------------------- */
export interface Palette {
  line: string
  lineDim: string
  accent: string
  frame: string
  /** Master multiplier - the light theme cannot carry the same line weight. */
  alpha: number
}

export const PALETTE: Record<'dark' | 'light', Palette> = {
  dark: { line: '#7d8e97', lineDim: '#48555c', accent: '#5ce1e6', frame: '#c9d6dc', alpha: 1 },
  // Paper carries far less line weight than a dark ground before the page
  // starts to look like a wireframe someone left switched on.
  light: { line: '#5d6a71', lineDim: '#93a1a8', accent: '#0097b2', frame: '#8b979d', alpha: 0.5 },
}

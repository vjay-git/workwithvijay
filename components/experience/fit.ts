/**
 * Fitting the composition to the viewport.
 *
 * Everything in the scene was authored against a 16:9-ish desktop frame. On a
 * portrait phone the camera sees roughly a quarter of that width, so a lockup
 * measured in fixed world units simply runs off both sides of the screen -
 * which is exactly what "do not just shrink the desktop animation" is warning
 * about, in its most literal form.
 *
 * So the scene is authored once in reference units and scaled by how much world
 * the camera can actually see. The staging, the throw distances and the settle
 * positions all keep their proportions; only the scale changes.
 */

/** Visible world width at distance `d`, for a vertical fov in degrees. */
export function visibleWidthAt(d: number, fovDeg: number, aspect: number) {
  return 2 * d * Math.tan((fovDeg * Math.PI) / 360) * aspect
}

/** The frame the composition was authored in: 1280x760 at fov 34, z 9.2. */
const REFERENCE_WIDTH = visibleWidthAt(9.2, 34, 1280 / 760)

/**
 * How much to scale the authored composition for this viewport.
 *
 * The lower bound is deliberately generous. A portrait phone sees about 27% of
 * the reference width, so any floor above that re-introduces the exact bug this
 * exists to prevent: clamping at 0.42 kept the mark 28% wider than the frame
 * and cropped COLLAB to "OLLA". The bound is here only to stop a degenerate
 * viewport collapsing the scene, not to protect legibility - the mark stays
 * legible because it is scaled to a constant FRACTION of whatever is visible.
 */
export function fitScale(width: number, height: number) {
  const visible = visibleWidthAt(9.2, 34, Math.max(0.35, width / height))
  return Math.min(1.08, Math.max(0.2, visible / REFERENCE_WIDTH))
}

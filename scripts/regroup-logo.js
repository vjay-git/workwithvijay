/**
 * Regroups the traced logo's subpaths into glyphs.
 *
 * Split out of trace-logo.js because the first grouping pass got one glyph
 * wrong: it decided containment from bounding boxes computed over ALL path
 * numbers, which includes Bezier CONTROL points. Control points overshoot the
 * curve they steer, so the counter of the small "O" in PRODUCT reported a box
 * that crossed its own ring rather than sitting inside it - the counter was
 * emitted as a separate filled path and the O rendered solid.
 *
 * This uses on-curve points only (the anchor of each segment) and an actual
 * even-odd ray cast, so containment is decided by geometry rather than by a
 * box that was never the shape in the first place.
 *
 * Run after trace-logo.js:  node scripts/regroup-logo.js
 */

const fs = require('fs')
const FILE = 'public/collab-logo-traced.svg'

/**
 * On-curve anchors only: M and L points, and the endpoint of each C segment.
 *
 * L must be matched explicitly. potrace emits straight runs as L, and a class
 * that only breaks on M/C/Z swallows the L into the previous command's number
 * blob - which slides every subsequent C anchor off the 6-number stride and
 * silently yields a polygon that is not the glyph. That is what made the "O" in
 * STUDIO fail its containment test and render solid.
 */
function anchors(d) {
  const pts = []
  const re = /([MLC])([^MLCZ]*)/gi
  let m
  while ((m = re.exec(d))) {
    const n = (m[2].match(/-?\d+(?:\.\d+)?/g) || []).map(Number)
    const op = m[1].toUpperCase()
    if (op === 'M' || op === 'L') { for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]) }
    else { for (let i = 0; i + 5 < n.length; i += 6) pts.push([n[i + 4], n[i + 5]]) }
  }
  return pts
}

const boxOf = (pts) => pts.reduce((b, [x, y]) => ({
  x0: Math.min(b.x0, x), y0: Math.min(b.y0, y), x1: Math.max(b.x1, x), y1: Math.max(b.y1, y),
}), { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity })

/** Even-odd ray cast. */
function contains(poly, [px, py]) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

const svg = fs.readFileSync(FILE, 'utf8')
const groups = {}
for (const gm of svg.matchAll(/<g id="([^"]+)"([^>]*)>([\s\S]*?)<\/g>/g)) {
  const subs = []
  for (const pm of gm[3].matchAll(/ d="([^"]+)"/g))
    for (const part of pm[1].split(/(?=M)/).map((s) => s.trim()).filter(Boolean)) {
      const pts = anchors(part)
      if (pts.length >= 3) subs.push({ d: part, pts, box: boxOf(pts) })
    }
  groups[gm[1]] = { attrs: gm[2], subs }
}

let merged = 0
const rebuilt = {}
for (const [id, g] of Object.entries(groups)) {
  const area = (s) => (s.box.x1 - s.box.x0) * (s.box.y1 - s.box.y0)
  const outers = [], holes = new Map()
  for (const s of g.subs) {
    // Probe with the centroid first: a counter's first anchor often sits
    // exactly on the ring's inner edge, where a ray cast is a coin flip. The
    // centroid of a closed counter is unambiguously interior. The anchors are
    // kept as fallback probes for any counter concave enough to exclude it.
    const cx = s.pts.reduce((a, p) => a + p[0], 0) / s.pts.length
    const cy = s.pts.reduce((a, p) => a + p[1], 0) / s.pts.length
    const probes = [[cx, cy], s.pts[0], s.pts[(s.pts.length / 2) | 0]]
    let host = null
    for (const o of g.subs) {
      if (o === s || area(o) <= area(s)) continue
      if (!probes.some((pt) => contains(o.pts, pt))) continue
      if (!host || area(o) < area(host)) host = o
    }
    if (host) { if (!holes.has(host)) holes.set(host, []); holes.get(host).push(s); merged++ }
    else outers.push(s)
  }
  outers.sort((a, b) => a.box.x0 - b.box.x0)
  rebuilt[id] = outers.map((o) => [o.d, ...(holes.get(o) || []).map((h) => h.d)].join(' '))
  console.log(id.padEnd(11), g.subs.length, 'subpaths ->', outers.length, 'glyphs')
}
console.log('counters merged:', merged)

const prefix = { collab: 'collab', withvijay: 'wv', accent: 'accent', studio: 'studio' }
const out = svg.replace(/<g id="([^"]+)"([^>]*)>[\s\S]*?<\/g>/g, (_, id, attrs) =>
  `<g id="${id}"${attrs}>\n` +
  rebuilt[id].map((d, i) => `    <path id="${prefix[id]}-${String(i).padStart(2, '0')}" d="${d}"/>`).join('\n') +
  `\n  </g>`)
fs.writeFileSync(FILE, out)
console.log('rewritten ->', (fs.statSync(FILE).size / 1024).toFixed(0) + 'KB')

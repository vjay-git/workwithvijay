/**
 * Regenerates public/collab-logo-traced.svg from public/collabwithvijay.png.
 *
 * The approved COLLAB WITH VIJAY logo was supplied as a raster; the companion
 * SVG set its glyphs as <text> in Arial, so it carried no vector outlines. This
 * traces the PNG's ALPHA channel into real outlines, so the wordmark can be
 * extruded into 3D geometry and split into individually animatable glyphs.
 *
 * Why the upscale-blur-threshold sequence: tracing the raw alpha makes potrace
 * chase the antialiased pixel staircase - 2522 curve commands of noise, which
 * shows up as a crunchy bevel once extruded. Resampling 4x, blurring, then
 * thresholding gives potrace a smooth edge to fit, which cut it to 992 commands
 * (126KB -> 51KB) with no visible loss at the A apex or the B's flat cuts.
 *
 * Output structure - ids are a contract the 3D code depends on:
 *   #collab     6 glyphs  C O L L A B, the parts the intro pulls apart
 *   #withvijay  9 glyphs  W I T H  V I J A Y
 *   #accent     1 glyph   the cyan dot, separate so it keeps its own colour
 *   #studio    29 glyphs  PRODUCT & AI ENGINEERING STUDIO + the two rules
 *
 * If a proper vector logo (text converted to outlines) is supplied later this
 * script becomes unnecessary: drop that file in as collab-logo-traced.svg with
 * the same group ids and everything downstream keeps working.
 *
 * Requires:  npm i -D sharp potrace   (deliberately NOT in package.json - this
 *                                      is a one-off asset step, not a build step)
 * Run:       node scripts/trace-logo.js
 */

const sharp = require('sharp')
const potrace = require('potrace')
const fs = require('fs')

const SRC = 'public/collabwithvijay.png'
const OUT = 'public/collab-logo-traced.svg'
const SCALE = 4
const BLUR = 2.0

/** Split potrace's single `d` into subpaths, each with its bounding box. */
function subpaths(d) {
  return d.split(/(?=M)/).map((s) => s.trim()).filter(Boolean).map((p) => {
    const n = p.match(/-?\d+(?:\.\d+)?/g).map(Number)
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (let i = 0; i + 1 < n.length; i += 2) {
      if (n[i] < x0) x0 = n[i]; if (n[i] > x1) x1 = n[i]
      if (n[i + 1] < y0) y0 = n[i + 1]; if (n[i + 1] > y1) y1 = n[i + 1]
    }
    return { d: p, x0, y0, x1, y1 }
  })
}

;(async () => {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info

  // Trim to the inked area so the viewBox is tight and the mark centres cleanly.
  const alpha = Buffer.alloc(w * h)
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let i = 0; i < w * h; i++) {
    const a = data[i * c + 3]
    alpha[i] = a
    if (a >= 128) {
      const x = i % w, y = (i / w) | 0
      if (x < x0) x0 = x; if (x > x1) x1 = x
      if (y < y0) y0 = y; if (y > y1) y1 = y
    }
  }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1
  const crop = Buffer.alloc(bw * bh)
  for (let y = 0; y < bh; y++)
    for (let x = 0; x < bw; x++) crop[y * bw + x] = alpha[(y + y0) * w + (x + x0)]

  const bitmap = await sharp(crop, { raw: { width: bw, height: bh, channels: 1 } })
    .resize(bw * SCALE, bh * SCALE, { kernel: 'lanczos3' })
    .blur(BLUR)
    .threshold(128)
    .negate() // potrace traces dark-on-light, so glyphs must be the dark side
    .png().toBuffer()

  const svgRaw = await new Promise((res, rej) =>
    potrace.trace(bitmap,
      { threshold: 128, turdSize: 8 * SCALE, alphaMax: 1.1, optCurve: true, optTolerance: 1.0, turnPolicy: 'minority' },
      (e, s) => (e ? rej(e) : res(s))))

  const W = bw * SCALE, H = bh * SCALE
  const subs = subpaths(svgRaw.match(/ d="([^"]+)"/)[1])

  // Counters (the hole in O, A, P...) are subpaths contained by a larger one.
  // Merge each into its parent as one <path>; fill-rule="evenodd" punches them.
  const areaOf = (s) => (s.x1 - s.x0) * (s.y1 - s.y0)
  const within = (a, b) => a.x0 >= b.x0 - 1 && a.x1 <= b.x1 + 1 && a.y0 >= b.y0 - 1 && a.y1 <= b.y1 + 1
  const outers = [], holes = new Map()
  for (const s of subs) {
    let host = null
    for (const o of subs) {
      if (o === s || !within(s, o) || areaOf(o) <= areaOf(s)) continue
      if (!host || areaOf(o) < areaOf(host)) host = o
    }
    if (host) { if (!holes.has(host)) holes.set(host, []); holes.get(host).push(s) }
    else outers.push(s)
  }

  // Bands by vertical position, as fractions of the mark's height.
  const COLLAB_MAX = H * 0.6, WV_MAX = H * 0.89
  const ACCENT = { x0: W * 0.845, x1: W * 0.885, y0: H * 0.72, y1: H * 0.83 }
  const g = { collab: [], withvijay: [], accent: [], studio: [] }
  for (const o of outers) {
    const d = [o.d, ...(holes.get(o) || []).map((x) => x.d)].join(' ').replace(/\s+/g, ' ').trim()
    const item = { d, x0: o.x0 }
    if (o.x0 >= ACCENT.x0 && o.x1 <= ACCENT.x1 && o.y0 >= ACCENT.y0 && o.y1 <= ACCENT.y1) g.accent.push(item)
    else if (o.y0 < COLLAB_MAX) g.collab.push(item)
    else if (o.y0 < WV_MAX) g.withvijay.push(item)
    else g.studio.push(item)
  }
  for (const k in g) g[k].sort((a, b) => a.x0 - b.x0) // reading order, so the
                                                     // intro can stagger L-to-R

  const band = (id, prefix, extra = '') =>
    `  <g id="${id}"${extra}>\n` +
    g[id].map((it, i) => `    <path id="${prefix}-${String(i).padStart(2, '0')}" d="${it.d}"/>`).join('\n') +
    `\n  </g>`

  fs.writeFileSync(OUT,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="currentColor" fill-rule="evenodd" role="img" aria-labelledby="cwv-title">\n` +
    `  <title id="cwv-title">COLLAB WITH VIJAY — Product &amp; AI Engineering Studio</title>\n` +
    [band('collab', 'collab'), band('withvijay', 'wv'),
     band('accent', 'accent', ' fill="#16D9E8"'), band('studio', 'studio')].join('\n') +
    `\n</svg>\n`)

  for (const k of ['collab', 'withvijay', 'accent', 'studio']) console.log(k.padEnd(11), g[k].length, 'glyphs')
  console.log('viewBox 0 0 ' + W + ' ' + H + ' -> ' + (fs.statSync(OUT).size / 1024).toFixed(0) + 'KB')
})()

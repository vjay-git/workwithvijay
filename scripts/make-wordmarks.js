/**
 * Derives the header/footer lockups from the traced master, so there is exactly
 * one source of truth for the brand geometry.
 *
 * The master (collab-logo-traced.svg, 52KB) is loaded only by the 3D intro,
 * lazily. Inlining 32KB of path data into every page just to draw a header logo
 * would be worse than an <img>, so the lockup ships as two small cached files -
 * one per theme - and the header swaps them with the existing `.dark` class.
 *
 * Run after regroup-logo.js:  node scripts/make-wordmarks.js
 */
const fs = require('fs')

const master = fs.readFileSync('public/collab-logo-traced.svg', 'utf8')
const vb = master.match(/viewBox="0 0 (\d+) (\d+)"/)
const [W, H] = [Number(vb[1]), Number(vb[2])]

// Literal regex, not a template string: inside a template literal `\s` is just
// the character `s`, so a constructed `[\s\S]` silently becomes `[sS]` and
// matches nothing. Iterate the groups once instead of building a pattern.
const GROUPS = {}
for (const m of master.matchAll(/<g id="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)) GROUPS[m[1]] = m[2].trim()
const grab = (id) => GROUPS[id] || ''

// Anchors of every path in a group, so the lockup can be cropped tight.
const bounds = (chunk) => {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const m of chunk.matchAll(/ d="([^"]+)"/g))
    for (const seg of m[1].matchAll(/([MLC])([^MLCZ]*)/gi)) {
      const n = (seg[2].match(/-?\d+(?:\.\d+)?/g) || []).map(Number)
      const step = seg[1].toUpperCase() === 'C' ? 6 : 2
      const off = step === 6 ? 4 : 0
      for (let i = 0; i + step - 1 < n.length; i += step) {
        const x = n[i + off], y = n[i + off + 1]
        if (x < x0) x0 = x; if (x > x1) x1 = x
        if (y < y0) y0 = y; if (y > y1) y1 = y
      }
    }
  return { x0, y0, x1, y1 }
}

const collab = grab('collab'), wv = grab('withvijay'), accent = grab('accent')
const b = [collab, wv, accent].map(bounds).reduce((a, c) => ({
  x0: Math.min(a.x0, c.x0), y0: Math.min(a.y0, c.y0), x1: Math.max(a.x1, c.x1), y1: Math.max(a.y1, c.y1),
}))
const PAD = H * 0.03
const vx = Math.max(0, b.x0 - PAD), vy = Math.max(0, b.y0 - PAD)
const vw = Math.min(W - vx, b.x1 - b.x0 + PAD * 2), vh = Math.min(H - vy, b.y1 - b.y0 + PAD * 2)

const VB = `${vx.toFixed(0)} ${vy.toFixed(0)} ${vw.toFixed(0)} ${vh.toFixed(0)}`
const head = (label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}" fill-rule="evenodd"` +
  (label ? ` role="img" aria-label="COLLAB WITH VIJAY"` : '') + `>\n`

// Themed copies, for anywhere an <img> is simplest (og:image, docs, email).
for (const [file, ink] of [['collab-wordmark.svg', '#EEF2F4'], ['collab-wordmark-light.svg', '#14181A']]) {
  fs.writeFileSync('public/' + file,
    head(true) + `  <g fill="${ink}">\n${collab}\n${wv}\n  </g>\n  <g fill="#16D9E8">\n${accent}\n  </g>\n</svg>\n`)
  console.log(file, (fs.statSync('public/' + file).size / 1024).toFixed(1) + 'KB')
}

// Mask copy for the live UI: one cached file that takes its colour from
// `currentColor`, so the header follows the theme without shipping a second
// 33KB variant or inlining 32KB of path data into every page.
fs.writeFileSync('public/collab-wordmark-mask.svg',
  head(false) + `  <g fill="#000">\n${collab}\n${wv}\n  </g>\n</svg>\n`)
console.log('collab-wordmark-mask.svg', (fs.statSync('public/collab-wordmark-mask.svg').size / 1024).toFixed(1) + 'KB')

// The accent is a circle, so the UI can draw it with a box instead of a second
// network request - but only if it lands exactly where the artwork puts it.
const a = bounds(accent)
console.log('\n--- accent dot, as % of the lockup box (for CSS) ---')
console.log(`  left   ${(((a.x0 + a.x1) / 2 - vx) / vw * 100).toFixed(3)}%`)
console.log(`  top    ${(((a.y0 + a.y1) / 2 - vy) / vh * 100).toFixed(3)}%`)
console.log(`  size   ${((a.x1 - a.x0) / vw * 100).toFixed(3)}% of width`)
console.log(`\nlockup viewBox: ${VB}  (aspect ${(vw / vh).toFixed(4)})`)

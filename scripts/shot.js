/**
 * Screenshot helper for local visual checks. Drives the Edge already installed
 * on the machine via playwright-core, so nothing downloads a browser.
 *
 *   node scripts/shot.js <url> <out.png> [width] [height] [waitMs]
 *
 * Prints any page errors / console errors it saw, so a silent visual pass and a
 * silent runtime failure never look the same.
 */
const { chromium } = require('playwright-core')

const [, , url, out, w = '1440', h = '900', wait = '1200'] = process.argv
if (!url || !out) {
  console.error('usage: node scripts/shot.js <url> <out.png> [w] [h] [waitMs]')
  process.exit(1)
}

;(async () => {
  const b = await chromium.launch({ channel: 'msedge' })
  const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text()))
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(+wait)
  await p.screenshot({ path: out })
  console.log(errs.length ? errs.join('\n') : 'no page errors')
  await b.close()
})()

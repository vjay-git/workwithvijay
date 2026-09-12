/**
 * Contact sheet of a scrolling page, so a long composition can be judged as a
 * sequence rather than one screen at a time.
 *
 *   node scripts/scroll-shots.js <url> <outDir> [width] [height] [frames]
 *
 * Scrolls in real steps and settles between them, because everything on these
 * pages is scroll-driven: jumping straight to an offset would photograph a
 * state the reader never actually sees.
 */
const { chromium } = require('playwright-core')
const fs = require('fs')
const path = require('path')

const [, , url, outDir, w = '1440', h = '900', frames = '8', theme = 'dark'] =
  process.argv
if (!url || !outDir) {
  console.error(
    'usage: node scripts/scroll-shots.js <url> <outDir> [w] [h] [frames] [theme]'
  )
  process.exit(1)
}

;(async () => {
  fs.mkdirSync(outDir, { recursive: true })
  const b = await chromium.launch({ channel: 'msedge' })
  const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text()))

  // The site stores its theme, so a light-mode sheet has to be asked for
  // before the first paint rather than toggled afterwards.
  await p.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t)
    } catch {}
  }, theme)

  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(2400)

  const total = await p.evaluate(() => document.body.scrollHeight - window.innerHeight)
  const n = +frames
  for (let i = 0; i < n; i++) {
    const y = Math.round((total * i) / (n - 1))
    await p.evaluate((to) => window.scrollTo({ top: to, behavior: 'instant' }), y)
    // long enough for the damped camera and the 700ms reveals to land
    await p.waitForTimeout(1400)
    await p.screenshot({ path: path.join(outDir, String(i).padStart(2, '0') + '.png') })
  }

  console.log('scrollHeight', total + +h)
  console.log(errs.length ? errs.join('\n') : 'no page errors')
  await b.close()
})()

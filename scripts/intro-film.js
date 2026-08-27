/**
 * Captures the intro as a contact sheet, so timing and staging can be judged
 * as a shot rather than guessed at from source.
 *
 *   node scripts/intro-film.js <url> <out.png> [width] [height] [frames] [spanMs]
 *
 * Clears sessionStorage first so every run is a first visit.
 */
const { chromium } = require('playwright-core')
const fs = require('fs')
const path = require('path')

const [, , url, out, w = '1280', h = '760', frames = '9', span = '4600'] = process.argv
const W = +w, H = +h, N = +frames, SPAN = +span

;(async () => {
  const b = await chromium.launch({ channel: 'msedge' })
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  const p = await ctx.newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text()))

  await p.addInitScript(() => { try { sessionStorage.clear() } catch {} })
  const t0 = Date.now()
  await p.goto(url, { waitUntil: 'domcontentloaded' })

  const dir = path.dirname(out)
  const shots = []
  const step = SPAN / (N - 1)
  for (let i = 0; i < N; i++) {
    const want = t0 + i * step
    const wait = want - Date.now()
    if (wait > 0) await p.waitForTimeout(wait)
    const f = path.join(dir, `__frame${i}.png`)
    await p.screenshot({ path: f })
    shots.push({ f, t: Date.now() - t0 })
  }

  // Report what the page thinks its state is at the end.
  const end = await p.evaluate(() => ({
    intro: document.documentElement.dataset.intro || null,
    reveal: getComputedStyle(document.documentElement).getPropertyValue('--intro-reveal').trim(),
    canvases: document.querySelectorAll('canvas').length,
    heroVisible: !!document.querySelector('.hero-frame') &&
      getComputedStyle(document.querySelector('.hero-frame')).opacity,
    h1: document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim(),
  }))

  // Contact sheet: 3 columns.
  const cols = 3, rows = Math.ceil(N / cols)
  const tw = Math.round(W / 2.4), th = Math.round(H / 2.4)
  const html =
    '<!doctype html><meta charset=utf-8><style>body{margin:0;background:#111;display:grid;' +
    `grid-template-columns:repeat(${cols},${tw}px);gap:6px;padding:6px}` +
    'figure{margin:0;position:relative}img{width:100%;display:block}' +
    'figcaption{position:absolute;left:4px;top:4px;font:10px ui-monospace;color:#5ce1e6;' +
    'background:#000a;padding:1px 5px}</style>' +
    shots.map((s, i) =>
      `<figure><img src="file://${s.f.replace(/\\/g, '/')}"><figcaption>${i} · ${s.t}ms</figcaption></figure>`
    ).join('')
  const sheetHtml = path.join(dir, '__sheet.html')
  fs.writeFileSync(sheetHtml, html)

  const p2 = await ctx.newPage()
  await p2.setViewportSize({ width: cols * tw + 24, height: rows * th + 24 })
  await p2.goto('file://' + sheetHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle' })
  await p2.screenshot({ path: out, fullPage: true })

  console.log('end state:', JSON.stringify(end))
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no page errors')
  await b.close()
})()

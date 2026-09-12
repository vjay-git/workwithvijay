/**
 * Exercises every path /about can take, because the fallbacks are the part
 * that decides whether this page is safe to ship.
 *
 *   node scripts/about-paths.js <baseUrl> <outDir>
 *
 * Each run reports whether the spatial layer mounted, whether the page still
 * reads without it, and any console or page error along the way.
 */
const { chromium } = require('playwright-core')
const fs = require('fs')
const path = require('path')

const [, , base = 'http://localhost:3111', outDir = '.'] = process.argv
const URL = base.replace(/\/$/, '') + '/about'

async function run(b, name, opts) {
  const ctx = await b.newContext(opts.context || {})
  const p = await ctx.newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text()))
  if (opts.init) await p.addInitScript(opts.init)

  await p.goto(URL, { waitUntil: 'networkidle' })
  await p.waitForTimeout(opts.wait || 2600)
  if (opts.before) await opts.before(p)

  const facts = await p.evaluate(() => ({
    stage: !!document.querySelector('.ab-stage canvas'),
    // the content that must exist whatever happens
    title: (document.querySelector('#ab-title') || {}).textContent || '',
    stops: document.querySelectorAll('.ab-stop').length,
    cards: document.querySelectorAll('.ab-con').length,
    layers: document.querySelectorAll('.ab-layer').length,
    rules: document.querySelectorAll('.ab-prin').length,
    proofs: document.querySelectorAll('.ab-proof-item').length,
    ctas: document.querySelectorAll('.ab-con-cta').length,
    diagrams: document.querySelectorAll('.ab-stop-vis svg').length,
    // nothing may be left invisible by a timeline that did not run
    hidden: Array.from(document.querySelectorAll('.ab h1, .ab h2, .ab h3, .ab p'))
      .filter((el) => {
        const cs = getComputedStyle(el)
        return +cs.opacity < 0.05 || cs.visibility === 'hidden'
      })
      .map((el) => el.className || el.tagName).length,
    veil: getComputedStyle(document.querySelector('.ab-veil')).visibility,
    docScroll: document.documentElement.scrollWidth <= window.innerWidth,
  }))

  if (opts.shot) await p.screenshot({ path: path.join(outDir, opts.shot) })
  console.log('\n== ' + name)
  console.log('   ', JSON.stringify(facts))
  console.log('   ', errs.length ? errs.join('\n    ') : 'no errors')
  await ctx.close()
  return { facts, errs }
}

;(async () => {
  fs.mkdirSync(outDir, { recursive: true })
  const b = await chromium.launch({ channel: 'msedge' })

  await run(b, 'desktop / dark / full', { shot: 'p-desktop.png' })

  await run(b, 'reduced motion', {
    context: { reducedMotion: 'reduce' },
    shot: 'p-reduced.png',
  })

  await run(b, 'no webgl', {
    init: () => {
      const g = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (t, ...a) {
        if (String(t).startsWith('webgl')) return null
        return g.call(this, t, ...a)
      }
    },
    shot: 'p-nowebgl.png',
  })

  await run(b, 'light theme', {
    init: () => {
      try {
        localStorage.setItem('theme', 'light')
      } catch {}
    },
    shot: 'p-light.png',
  })

  await run(b, 'mobile 390x844', {
    context: {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    },
    shot: 'p-mobile.png',
  })

  // hover: the card must lift, and its second register must open
  await run(b, 'card hover', {
    shot: 'p-hover.png',
    before: async (p) => {
      const card = p.locator('[data-ab-anchor="con-0"]')
      await card.scrollIntoViewIfNeeded()
      await p.waitForTimeout(900)
      await card.hover()
      await p.waitForTimeout(1100)
      const open = await p.evaluate(() => {
        const m = document.querySelector('[data-ab-anchor="con-0"] .ab-con-more')
        return { rows: getComputedStyle(m).gridTemplateRows, opacity: getComputedStyle(m).opacity }
      })
      console.log('    reveal:', JSON.stringify(open))
    },
  })

  await b.close()
})()

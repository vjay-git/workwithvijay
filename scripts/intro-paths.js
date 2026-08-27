/**
 * Exercises every path the intro can take, because the fallbacks are the part
 * that decides whether this feature is safe to ship.
 *
 *   node scripts/intro-paths.js <baseUrl>
 */
const { chromium } = require('playwright-core')

const BASE = process.argv[2] || 'http://localhost:3213'

const read = () => ({
  intro: document.documentElement.dataset.intro || null,
  reveal: getComputedStyle(document.documentElement).getPropertyValue('--intro-reveal').trim() || '(unset)',
  r3f: document.querySelectorAll('.intro-canvas canvas').length,
  poster: !!document.querySelector('.intro-poster'),
  skip: !!document.querySelector('.intro-skip'),
  heroOpacity: document.querySelector('.hero-frame')
    ? getComputedStyle(document.querySelector('.hero-frame')).opacity : null,
  h1: document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() || null,
  bodyOverflow: getComputedStyle(document.body).overflow,
})

async function scenario(browser, name, ctxOpts, run) {
  const ctx = await browser.newContext(ctxOpts)
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
  page.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text()))
  const res = await run(page, ctx)
  console.log(`\n== ${name} ==`)
  console.log('   ' + JSON.stringify(res))
  if (errs.length) console.log('   ERRORS: ' + errs.join(' | '))
  await ctx.close()
  return { res, errs }
}

;(async () => {
  const b = await chromium.launch({ channel: 'msedge' })
  const D = { viewport: { width: 1280, height: 760 } }

  await scenario(b, 'reduced motion -> no intro at all', { ...D, reducedMotion: 'reduce' }, async (p) => {
    await p.goto(BASE + '/', { waitUntil: 'networkidle' })
    await p.waitForTimeout(900)
    return p.evaluate(read)
  })

  await scenario(b, 'first visit -> full film, then released', D, async (p) => {
    await p.addInitScript(() => { try { sessionStorage.clear() } catch {} })
    await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    await p.waitForTimeout(1200)
    const mid = await p.evaluate(read)
    await p.waitForTimeout(5200)
    const end = await p.evaluate(read)
    return { midIntro: mid.intro, midHero: mid.heroOpacity, midSkip: mid.skip, end }
  })

  await scenario(b, 'repeat visit in same session -> brief cut', D, async (p, ctx) => {
    await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    await p.waitForTimeout(6200)
    // Reload the SAME tab. sessionStorage is per-tab, so opening a second tab
    // is genuinely a first visit and would have measured the full cut.
    const p2 = p
    await p2.reload({ waitUntil: 'domcontentloaded' })
    // Wait for it to actually START before timing it. `undefined` is also the
    // pre-hydration value, so treating that as "released" measured nothing.
    let started = false
    try {
      await p2.waitForFunction(() => document.documentElement.dataset.intro === 'running', { timeout: 4000 })
      started = true
    } catch { /* never ran */ }
    const t0 = Date.now()
    if (started) {
      await p2.waitForFunction(() => document.documentElement.dataset.intro === 'done', { timeout: 8000 })
    }
    return { ranBriefCut: started, releasedAfterMs: started ? Date.now() - t0 : null, ...(await p2.evaluate(read)) }
  })

  await scenario(b, 'skip button -> jumps to the end', D, async (p) => {
    await p.addInitScript(() => { try { sessionStorage.clear() } catch {} })
    await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    await p.waitForSelector('.intro-skip', { timeout: 5000 })
    // Let the control's own 500ms entrance finish first: Playwright blocks on
    // element stability, so clicking mid-animation measures the harness waiting,
    // not how long the skip takes.
    await p.waitForTimeout(700)
    const t0 = Date.now()
    await p.click('.intro-skip', { force: true })
    await p.waitForFunction(() => document.documentElement.dataset.intro === 'done', { timeout: 4000 })
    return { skippedInMs: Date.now() - t0, ...(await p.evaluate(read)) }
  })

  await scenario(b, 'Escape key -> same as skip', D, async (p) => {
    await p.addInitScript(() => { try { sessionStorage.clear() } catch {} })
    await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    await p.waitForSelector('.intro-skip', { timeout: 5000 })
    await p.keyboard.press('Escape')
    await p.waitForFunction(() => document.documentElement.dataset.intro === 'done', { timeout: 4000 })
    return p.evaluate(read)
  })

  await scenario(b, 'no WebGL -> never mounts', D, async (p) => {
    await p.addInitScript(() => {
      try { sessionStorage.clear() } catch {}
      const orig = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        if (String(type).includes('webgl')) return null
        return orig.call(this, type, ...rest)
      }
    })
    await p.goto(BASE + '/', { waitUntil: 'networkidle' })
    await p.waitForTimeout(1200)
    return p.evaluate(read)
  })

  await scenario(b, 'mobile 390x844 -> compact cut', {
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  }, async (p) => {
    await p.addInitScript(() => { try { sessionStorage.clear() } catch {} })
    const t0 = Date.now()
    await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    let released = 0
    for (let i = 0; i < 200; i++) {
      const s = await p.evaluate(() => document.documentElement.dataset.intro)
      if (s === 'done') { released = Date.now() - t0; break }
      await p.waitForTimeout(60)
    }
    const r = await p.evaluate(read)
    const over = await p.evaluate(() => ({
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
    }))
    return { releasedAfterMs: released, overflow: over.sw > over.cw + 1 ? 'FAIL' : 'ok', ...r }
  })

  await scenario(b, 'inner page -> intro never runs there', D, async (p) => {
    await p.goto(BASE + '/work', { waitUntil: 'networkidle' })
    await p.waitForTimeout(700)
    return p.evaluate(() => ({
      introRoot: !!document.querySelector('.intro-root'),
      h1: document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim().slice(0, 40) || null,
    }))
  })

  await b.close()
})()

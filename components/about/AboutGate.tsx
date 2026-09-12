'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

/**
 * Decides whether the spatial layer runs. It is never the thing you wait for.
 *
 * Same architecture as the homepage intro (components/experience/IntroGate),
 * and it rests on the same single rule: THE DOM PAGE IS ALWAYS RENDERED, in its
 * final accessible form, from the first byte. This gate only ever adds a layer
 * behind it.
 *
 * Which makes the fallback matrix trivial instead of a matrix:
 *   - reduced motion    -> never mount; the page is already there, already final
 *   - no WebGL          -> never mount
 *   - JS off            -> nothing here runs at all
 *   - chunk fails       -> nothing mounts; the page is untouched
 *   - low-power / small -> mounts the reduced build (compact)
 *
 * There is no state in which a reader waits on 3D to read about Vijay.
 */

const AboutCanvas = dynamic(() => import('./AboutCanvas'), { ssr: false })

function probeWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function AboutGate() {
  const [mode, setMode] = useState<'idle' | 'on' | 'off'>('idle')
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return setMode('off')
    if (!probeWebGL()) return setMode('off')

    // Coarse pointer or a narrow viewport gets the reduced build: fewer
    // segments per stage, no environment probe, no pointer parallax, lower DPR.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setCompact(coarse || window.innerWidth < 900)

    // A device that reports two cores is not going to enjoy this, and the page
    // reads exactly as well without it.
    const cores = navigator.hardwareConcurrency
    if (typeof cores === 'number' && cores > 0 && cores <= 2) return setMode('off')

    // Idle, not immediate: the portrait is this page's LCP, and the 3D chunk
    // must not be competing with it for bandwidth on a cold load.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
    }
    const start = () => setMode('on')
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1400 })
      return () => (window as unknown as { cancelIdleCallback?: (i: number) => void })
        .cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 600)
    return () => window.clearTimeout(t)
  }, [])

  // Marks the page once the layer is actually painting. The CSS grid steps
  // back when it sees this: two line systems at full strength over one another
  // is noise, and the 3D one is the one carrying meaning.
  const onReady = useCallback(() => {
    document.documentElement.dataset.abStage = 'on'
  }, [])

  useEffect(
    () => () => {
      delete document.documentElement.dataset.abStage
    },
    []
  )

  if (mode !== 'on') return null
  return <AboutCanvas compact={compact} onReady={onReady} />
}

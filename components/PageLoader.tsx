'use client'

import { useEffect, useState } from 'react'
import Loader from './Loader'

interface PageLoaderProps {
  isLoading: boolean
  className?: string
}

/**
 * Full-page loader overlay
 * Fades in/out gracefully without layout shift
 */
export default function PageLoader({ isLoading, className = '' }: PageLoaderProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoading) {
      setVisible(true)
    } else {
      // Delay hiding to allow fade-out animation
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!mounted || !visible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 dark:bg-charcoal-dark transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
      aria-live="polite"
      aria-busy={isLoading}
    >
      <Loader size="md" />
    </div>
  )
}

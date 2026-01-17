/**
 * Loader Component Usage Examples
 * 
 * This file demonstrates how to use the Apple-grade loader components.
 * Delete this file after reviewing the examples.
 */

import Loader from './Loader'
import PageLoader from './PageLoader'
import { useState } from 'react'

// Example 1: Inline loader (small, medium, large)
export function InlineLoaderExample() {
  return (
    <div className="flex flex-col gap-8 items-center p-12">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  )
}

// Example 2: Centered loader in a section
export function CenteredLoaderExample() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader />
    </div>
  )
}

// Example 3: Full-page loader with state control
export function FullPageLoaderExample() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <button
        onClick={() => setIsLoading(!isLoading)}
        className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded"
      >
        {isLoading ? 'Hide Loader' : 'Show Loader'}
      </button>
    </>
  )
}

// Example 4: Loader with custom positioning
export function CustomPositionLoaderExample() {
  return (
    <div className="relative min-h-[200px]">
      <Loader className="absolute top-4 right-4" size="sm" />
      <p>Content with loader in corner</p>
    </div>
  )
}

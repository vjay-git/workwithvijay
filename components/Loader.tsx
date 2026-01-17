'use client'

import { useEffect, useState } from 'react'

interface LoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loader({ className = '', size = 'md' }: LoaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sizeClasses = {
    sm: 'w-12 h-0.5',
    md: 'w-16 h-0.5',
    lg: 'w-20 h-0.5',
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${sizeClasses[size]} loader-stroke`}
        aria-hidden="true"
      />
    </div>
  )
}

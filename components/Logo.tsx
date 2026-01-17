'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'navbar' | 'footer' | 'sidebar'
  showText?: boolean
  className?: string
}

export default function Logo({
  size = 'md',
  variant = 'navbar',
  showText = false,
  className = '',
}: LogoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const logoSource = theme === 'dark' ? '/wwvdarkmode.png' : '/wwv.png'

  useEffect(() => {
    // Subtle fade-in on mount
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: 'h-16 w-16 md:h-20 md:w-20', // Footer - 64px mobile, 80px desktop
    md: 'h-24 w-24 md:h-32 md:w-32', // Navbar/Sidebar - 96px mobile, 128px desktop
    lg: 'h-40 w-40 md:h-48 md:w-48', // Larger variant - 160px mobile, 192px desktop
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const containerClasses = {
    navbar: 'flex items-center gap-2',
    footer: 'flex items-center gap-2',
    sidebar: 'flex items-center gap-3',
  }

  return (
    <Link
      href="/"
      prefetch={true}
      className={`logo-container ${containerClasses[variant]} ${className} transition-opacity duration-150 hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400`}
      aria-label="Work With Vijay - Home"
    >
      <img
        src={logoSource}
        alt="Work With Vijay"
        className={`${sizeClasses[size]} transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        width="24"
        height="24"
        style={{
          imageRendering: 'crisp-edges',
        }}
      />
      {showText && (
        <span
          className={`${textSizeClasses[size]} font-medium text-charcoal transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Work With Vijay
        </span>
      )}
    </Link>
  )
}

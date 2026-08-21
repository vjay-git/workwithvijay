'use client'

import { useTheme } from '@/contexts/ThemeContext'

/**
 * Theme control as a moon phase: one disc sliding across a clipped circle.
 * No container, no icon swap - the state change is the animation.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={'nav-theme' + (theme === 'dark' ? ' is-dark' : '')}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={theme === 'dark'}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <defs>
          <clipPath id="nav-theme-clip">
            <circle cx="10" cy="10" r="6.5" />
          </clipPath>
        </defs>
        <circle className="nav-theme-ring" cx="10" cy="10" r="6.5" />
        <g clipPath="url(#nav-theme-clip)">
          <circle className="nav-theme-disc" cx="10" cy="10" r="6.5" />
        </g>
      </svg>
    </button>
  )
}

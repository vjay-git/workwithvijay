import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Soft neutrals - Apple-inspired palette (light mode)
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Charcoal and muted grays
        charcoal: {
          light: '#2d2d2d',
          DEFAULT: '#1a1a1a',
          dark: '#0d0d0d',
        },
        // Neon accent system (dark mode only)
        neon: {
          cyan: '#5ce1e6', // Electric cyan
          'cyan-glow': 'rgba(92, 225, 230, 0.3)',
          'cyan-soft': 'rgba(92, 225, 230, 0.1)',
        },
      },
      fontFamily: {
        // System fonts stack - modern grotesk fallback
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      boxShadow: {
        'neon-soft': '0 0 8px rgba(92, 225, 230, 0.2)',
        'neon-glow': '0 0 16px rgba(92, 225, 230, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config

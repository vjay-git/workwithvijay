/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports if needed for hosting
  // output: 'export',
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

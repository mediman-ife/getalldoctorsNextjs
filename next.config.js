/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable ISR optimization
    // isrMemoryCacheSize: 0, // Removed as it's not recognized in this version
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable compression
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig;
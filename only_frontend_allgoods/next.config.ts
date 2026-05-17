import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.56.1'],
  async redirects() {
    return [
      { source: '/guide', destination: '/booking', permanent: true },
    ]
  },
}

export default nextConfig

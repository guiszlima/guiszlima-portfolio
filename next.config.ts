import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.15.9:3000', '192.168.15.9', '*'],
};

export default nextConfig;
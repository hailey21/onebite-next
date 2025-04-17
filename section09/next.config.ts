import type { NextConfig } from 'next';
import { hostname } from 'os';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

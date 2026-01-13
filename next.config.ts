import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enable server actions with larger body size for file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // Type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

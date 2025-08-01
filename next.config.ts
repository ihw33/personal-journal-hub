import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enhanced CSS handling for TailwindCSS v4
    optimizeCss: false,
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['css-loader'],
        as: '*.css',
      },
    },
  },
  // Better CSS handling in webpack fallback
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;

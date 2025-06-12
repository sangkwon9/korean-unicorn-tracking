import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/korean-unicorn-tracking',
  assetPrefix: '/korean-unicorn-tracking',
};

export default nextConfig;

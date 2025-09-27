// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
    optimizeCss: true,
    serverActions: { allowedOrigins: ['*'] },
  },
  compiler: { removeConsole: true },
  images: {
    domains: ['images.unsplash.com', 'avatar.vercel.sh'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
};

export default withBundleAnalyzer(nextConfig);

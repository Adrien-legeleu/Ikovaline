import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    serverActions: { allowedOrigins: ['*'] },
  },
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ['images.unsplash.com', 'avatar.vercel.sh'],
  },
  async rewrites() {
    return [
      { source: '/en', destination: '/' },
      { source: '/en/:path*', destination: '/:path*' },
    ];
  },
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);

const nextConfig = {
  darkMode: 'class',
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
};

export default nextConfig;

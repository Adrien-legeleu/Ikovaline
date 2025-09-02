


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
};


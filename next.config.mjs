const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ["images.unsplash.com", "avatar.vercel.sh"],
  },
};

export default nextConfig;

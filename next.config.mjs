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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.ikovaline.com",
          },
        ],
        destination: "https://ikovaline.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

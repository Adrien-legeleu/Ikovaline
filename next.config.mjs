/** @type {import('next').NextConfig} */
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
        source: "/contact-2",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

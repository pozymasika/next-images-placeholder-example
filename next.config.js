/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

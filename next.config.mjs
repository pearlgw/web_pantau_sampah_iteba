/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "103.124.196.178",
      },
    ],
  },
};

export default nextConfig;

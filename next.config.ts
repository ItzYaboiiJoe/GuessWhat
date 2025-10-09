import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "inteng-storage.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.esahubble.org",
      },
    ],
  },
};

export default nextConfig;

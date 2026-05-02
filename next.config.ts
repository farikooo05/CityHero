import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["172.17.0.29"],
  experimental: {
    serverActions: {
      allowedOrigins: ["172.17.0.29", "localhost:3000"]
    }
  }
};

export default nextConfig;

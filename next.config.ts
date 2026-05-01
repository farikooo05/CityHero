import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ["172.17.64.183", "localhost:3000"]
  }
};

export default nextConfig;

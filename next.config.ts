import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 忽略 TypeScript 错误
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

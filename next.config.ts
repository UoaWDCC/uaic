import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/api/**" }, { pathname: "/assets/**" }],
  },
};

export default nextConfig;

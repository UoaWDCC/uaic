import type { NextConfig } from "next";
import { MEDIA_CDN_URL } from "./src/lib/mediaCdn";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/assets/**" }],
    remotePatterns: [new URL(`${MEDIA_CDN_URL}/**`)],
  },
};

export default nextConfig;

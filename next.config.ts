import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages repository path
  basePath: "/Digital_twin_chatbot_and_portfolio",

  // Ensures static assets are resolved correctly
  assetPrefix: "/Digital_twin_chatbot_and_portfolio/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
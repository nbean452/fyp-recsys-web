/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextTranslate = require("next-translate");

const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        hostname: "**.unsplash.com",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextTranslate(nextConfig));

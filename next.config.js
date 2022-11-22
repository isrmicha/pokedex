/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["raw.githubusercontent.com"],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["raw.githubusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

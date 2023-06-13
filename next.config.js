const { i18n } = require("./next-i18next.config");

/** @type {import("next").NextConfig} */
const config = {
  // i18n,

  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/",
        permanent: false,
      },
    ];
  },

  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = config;

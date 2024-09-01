const { hostname } = require("os");

/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
    ],
  },
};

module.exports = nextConfig;

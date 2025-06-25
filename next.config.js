/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lcdoy.projection-learn.website",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  /* config options here */
};

module.exports = nextConfig;

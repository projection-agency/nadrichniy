/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("api.lcdoy.projection-learn.website","https://api.lcdoy.projection-learn.website/wp-content/uploads/2025/06/")],
  },

  /* config options here */
};

module.exports = nextConfig;

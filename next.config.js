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

  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

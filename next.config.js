/** @type {import('next').NextConfig} */
const apiHostname =
  process.env.NEXT_PUBLIC_API_DOMAIN ||
  (process.env.NEXT_PUBLIC_API_URL
    ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
    : "api.nadrichnyi.if.ua");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiHostname,
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

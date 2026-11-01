/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/listings/zr-1br-terrace-unit-a",
        destination: "/listings/desire204",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
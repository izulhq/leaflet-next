/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/klimatologi/:path*",
        destination: "https://hidrologi.bbws-bsolo.net/klimatologi/:path*",
      },
    ];
  },
};

export default nextConfig;

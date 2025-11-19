/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';
    return [
      {
        source: '/api/uploads/:path*',
        destination: `${apiBaseUrl}/uploads/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/v1/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/nq9qT5FHZv9Sg48UUnD1-A/**',
      },
    ],
  },
};

export default nextConfig;
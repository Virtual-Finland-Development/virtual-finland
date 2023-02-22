/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTwin = require('./withTwin.js');

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = () => {
  return withBundleAnalyzer(withTwin(nextConfig));
};

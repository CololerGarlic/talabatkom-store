/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      'lh3.googleusercontent.com',
      'drive.google.com',
      'images.unsplash.com',
      'rozana-store.com',
      'mahruseh.com',
      'banbey.com.tr',
      'nemafood.nl',
      'burcu.com.tr',
      'yurtkonserve.com.tr',
      'suntat.de'
    ],
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;

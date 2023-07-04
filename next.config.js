/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.shutterstock.com', 'firebasestorage.googleapis.com', 'static.vecteezy.com']
  },
  reactStrictMode: true,
  swcMinify: true,
  future: {
   webpack5: true,
   },
 webpack(config) {
   config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
}

module.exports = nextConfig

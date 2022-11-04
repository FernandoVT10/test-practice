/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: "./src/tsconfig.json"
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;

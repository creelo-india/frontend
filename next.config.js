/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src"],
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;

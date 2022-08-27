/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["blog.golemproject.net", "dappimg.com"],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig

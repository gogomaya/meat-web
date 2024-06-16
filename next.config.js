/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ["/"]
  },
  images: {
    domains: ["assets-global.website-files.com"]
  }
}

module.exports = nextConfig

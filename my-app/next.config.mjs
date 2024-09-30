/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // eslintのlint checkをbuild時にoff
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["maps.googleapis.com"],
  },
  // reactStrictMode: false,
};

export default nextConfig;

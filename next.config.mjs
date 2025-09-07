/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove the typescript configuration since you're converting to JS
  images: {
    unoptimized: true,
  },
}

export default nextConfig
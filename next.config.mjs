/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add external domains here if you ever host images on a CDN
    // domains: ['cdn.afrowear.world'],
  },
  // Ensures trailing slashes are handled cleanly for SEO
  trailingSlash: false,
};

export default nextConfig;

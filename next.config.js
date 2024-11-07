/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      mdxRs: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
  },
};

module.exports = nextConfig;

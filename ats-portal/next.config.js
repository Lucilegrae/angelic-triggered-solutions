/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  allowedDevOrigins: ["192.168.100.28"],
  outputFileTracingRoot: __dirname,

  // Force Webpack instead of SWC (Termux-safe)
  experimental: {
    serverComponentsExternalPackages: [],
    turbo: {
      resolveAlias: {},
    },
  },

  // Disable SWC transforms entirely
  compiler: {
    removeConsole: false,
  },

  // Force Next.js to use Webpack for everything
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;

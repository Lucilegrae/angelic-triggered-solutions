/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 CRITICAL: disable corrupted Next.js typed route generation
  typedRoutes: false,

  allowedDevOrigins: ['192.168.100.28'],

  outputFileTracingRoot: __dirname,

  webpack: (config) => {
    config.cache = false;

    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '/data/**',
        '/storage/**',
        '/system/**',
        '/proc/**',
        '/dev/**'
      ],
    };

    return config;
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;

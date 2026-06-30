/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,

  // Allow LAN device access to HMR
  allowedDevOrigins: ['192.168.1.153'],

  webpack: (config) => {
    // Disable filesystem caching (Termux cannot snapshot dependencies)
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;

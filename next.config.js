/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.snapshot.managedPaths = [];
    config.watchOptions.ignored[1] = '**/node_modules/!(mapboxr-gl)';
    return config;
  }
};

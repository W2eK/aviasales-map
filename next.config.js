/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  webpack: config => {
    config.snapshot.managedPaths = [];
    config.watchOptions.ignored[1] = '**/node_modules/!(mapboxr-gl)';
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            replaceAttrValues: { '#9EA9B7': 'currentColor' },
            icon: true
          }
        }
      ]
    });
    return config;
  },
  images: {
    domains: ['photo.hotellook.com'],
    loader: 'custom'
  }
};

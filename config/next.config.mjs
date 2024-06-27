import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    appDir: true,
  },
  // Custom path for tsconfig.json
  typescript: {
    tsconfigPath: path.join(__dirname, 'tsconfig.json'),
  },
  // Custom path for pages directory
  webpack: (config) => {
    config.resolve.alias['@pages'] = path.join(__dirname, '../app/pages');
    return config;
  },
};

export default nextConfig;
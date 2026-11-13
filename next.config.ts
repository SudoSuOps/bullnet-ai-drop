import type { NextConfig } from 'next';

/** Static export: the whole site is prebuilt HTML, CSS and JS in ./out, served by Cloudflare Pages with no server. */
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;

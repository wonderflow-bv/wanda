/**
 * @type {import('next').NextConfig}
 */

import bundleAnalyzer from '@next/bundle-analyzer';
// import redirects from './redirects.js'
import mdx from '@next/mdx';
import withPlugins from 'next-compose-plugins';
import withImages from 'next-images';
import withTranspileModules from 'next-transpile-modules';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const withTm = withTranspileModules([
  '@wonderflow/react-components',
  '@wonderflow/charts',
], { debug: true });

const withMDX = mdx({
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [
      remarkMdxCodeMeta,
    ],
  },
});

const nextConfig = withPlugins([
  [withBundleAnalyzer],
  [withImages],
  [
    withMDX,
    {
      extension: /\.mdx?$/,
    },
  ],
  [withTm],
], {
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx', 'ts'],
  // Force the Terser/Babel minify path instead of swc. Vercel's build sandbox
  // fails to load the native swc binary and falls back to swc-wasm, whose
  // rayon threadpool panics with "operation not supported on this platform"
  // (see packages/AGENTS.md). Revisit once Next.js is upgraded past 12.
  swcMinify: false,
  images: {
    domains: ['media.hygraph.com', 'media.graphassets.com'],
  },
});

export default nextConfig;

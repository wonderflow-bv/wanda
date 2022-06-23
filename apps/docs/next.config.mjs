import bundleAnalyzer from '@next/bundle-analyzer';
// import redirects from './redirects.js'
import mdx from '@next/mdx';
import withPlugins from 'next-compose-plugins';
import withImages from 'next-images';
import withTranspileModules from 'next-transpile-modules';
import mdxLink from 'rehype-autolink-headings';
import mdxSlug from 'rehype-slug';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const withTm = withTranspileModules(['@wonderflow/react-components']);

const withMDX = mdx({
  options: {
    providerImportSource: '@mdx-js/react',
    rehypePlugins: [
      mdxSlug,
      [mdxLink, {
        behavior: 'append',
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['HeadingAnchor'] },
          children: [{ type: 'text', value: '' }],
        },
      }],
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
  swcMinify: true,
  images: {
    domains: ['media.graphcms.com', 'media.graphassets.com'],
  },
});

export default nextConfig;

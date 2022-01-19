import withTranspileModules from 'next-transpile-modules'
import bundleAnalyzer from '@next/bundle-analyzer'
import withImages from 'next-images'
import withPlugins from 'next-compose-plugins'
import mdxSlug from 'rehype-slug'
import mdxLink from 'rehype-autolink-headings'
import redirects from './redirects.js'
import mdx from '@next/mdx'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})
const withTm = withTranspileModules(['@wonderflow/react-components'])
const withMDX = mdx({
  options: {
    rehypePlugins: [
      mdxSlug,
      [mdxLink, {
        behavior: 'append',
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['HeadingAnchor'] },
          children: [{ type: 'text', value: '' }]
        }
      }]
    ]
  }
})

const nextConfig = withPlugins([
  [withBundleAnalyzer],
  [withImages],
  [
    withMDX,
    {
      extension: /\.mdx?$/
    }
  ],
  [withTm]
], {
  async redirects () {
    return redirects
  },
  async rewrites () {
    return [
      {
        destination: '/components/buttons/:path*',
        source: '/components/actions/:path*'
      }
    ]
  },
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx', 'ts'],
  swcMinify: true,
  images: {
    domains: ['media.graphcms.com']
  },
  experimental: {
    esmExternals: false
  }
})

export default nextConfig

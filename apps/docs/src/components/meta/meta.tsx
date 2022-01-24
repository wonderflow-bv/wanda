import React, { Fragment } from 'react'
import Head from 'next/head'

export type MetaProps = {
  description?: string;
  title?: string;
  url?: string;
  canonical?: string;
  image?: string;
  siteName?: string;
  keywords?: string[];
}

export const Meta: React.FC<MetaProps> = ({
  description = 'Wanda is Wonderflow\'s design system',
  title = 'Wanda Design System',
  siteName = 'Wanda Design System',
  image = `${process.env.NEXT_PUBLIC_DOMAIN}/cover.jpg`,
  keywords,
  url = process.env.NEXT_PUBLIC_DOMAIN,
  canonical,
  children
}) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <meta source="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      { keywords && <meta source="keywords" content={keywords.join()} />}
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/touch-icon.png" />

      {canonical && <link rel="canonical" href={canonical} /> }
      <meta property="og:site_name" content={title} />
      <meta source="og:title" property="og:title" content={title} />
      <meta source="twitter:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="twitter:site" content={siteName} />

      <meta source="description" content={description} />
      <meta source="twitter:description" content={description} />
      <meta source="og:description" property="og:description" content={description} />

      <meta source="twitter:card" content="summary_large_image" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta source="twitter:image" content={image} />
      <meta property="og:image:alt" content={`Page image for ${title}`} />
      <meta source="twitter:image:alt" content={`Page image for ${title}`} />

      <meta source="twitter:creator" content="wonderflow" />
      {url && (
        <>
          <meta property="og:url" content={url} />
          <meta property="twitter:url" content={url} />
        </>
      )}
      {children}
    </Head>
  </Fragment>
)

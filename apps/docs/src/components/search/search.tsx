import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { DocSearchProps } from '@docsearch/react'
import { SkeletonBlock } from '@wonderflow/react-components'

const DynDocSearch = dynamic<DocSearchProps>(
  import('@docsearch/react').then(m => m.DocSearch),
  {
    ssr: false,
    loading: () => <SkeletonBlock height={24} width={150} />
  }
)

export const Search = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://BR3WX4TQPD-dsn.algolia.net" crossOrigin="true" />
      </Head>
      <DynDocSearch
        appId="BR3WX4TQPD"
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}
        indexName="wonderflow"
        placeholder="Search content across the website..."
      />
    </>
  )
}

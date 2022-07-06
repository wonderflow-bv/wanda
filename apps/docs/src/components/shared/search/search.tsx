import { DocSearchProps } from '@docsearch/react';
import { Skeleton } from '@wonderflow/react-components';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynDocSearch = dynamic<DocSearchProps>(
  async () => import('@docsearch/react').then(m => m.DocSearch),
  {
    ssr: false,
    loading: () => <Skeleton height={32} width={32} circle />,
  },
);

export const Search = () => (
  <>
    <Head>
      <link rel="preconnect" href="https://BR3WX4TQPD-dsn.algolia.net" crossOrigin="anonymous" />
    </Head>
    <DynDocSearch
      appId="BR3WX4TQPD"
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}
      indexName="wonderflow"
      placeholder="Search content across the website..."
    />
  </>
);

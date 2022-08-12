import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ClientOnly } from '@/src/components/shared/client-only';
import { Stackblitz } from '@/src/components/shared/stackblitz';
import { getLayoutProps } from '@/utils/get-layout-props';

const PlaygroundPage: NextPage = () => {
  const [component, setComponent] = useState('');
  const router = useRouter();
  const pageURL = new URL(process.env.NEXT_PUBLIC_DOMAIN + router.asPath);
  const pageHash = pageURL.hash.slice(1);

  useEffect(() => {
    setComponent(pageHash || 'app');

    return () => {
      setComponent('app');
    };
  }, [pageHash]);

  return (
    <ClientOnly>
      <Stackblitz component={component} />
    </ClientOnly>
  );
};

export default PlaygroundPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    headerPosition: 'sticky',
    showFooter: false,
  },
});

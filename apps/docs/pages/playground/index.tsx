import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ClientOnly } from '@/src/components/shared/client-only';
import { Stackblitz } from '@/src/components/shared/stackblitz';
import { usePlaygroundContext } from '@/src/contexts/playground';
import { getLayoutProps } from '@/utils/get-layout-props';

const PlaygroundPage: NextPage = () => {
  const { component } = usePlaygroundContext();
  const { setComponent } = usePlaygroundContext();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setComponent('app'));
  }, [router, setComponent]);

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

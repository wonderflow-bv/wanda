import { NextPage } from 'next';
import { useEffect } from 'react';

import { ClientOnly } from '@/src/components/shared/client-only';
import { Stackblitz } from '@/src/components/shared/stackblitz';
import { usePlaygroundContext } from '@/src/contexts/playground';
import { getLayoutProps } from '@/utils/get-layout-props';

const PlaygroundPage: NextPage = () => {
  const { component, setComponent } = usePlaygroundContext();

  useEffect(() => {
    if (component === 'app') setComponent('app');
  }, [component, setComponent]);

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

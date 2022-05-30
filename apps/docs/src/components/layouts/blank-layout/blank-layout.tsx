
import dynamic from 'next/dynamic';

import { BaseLayout } from '@/components/layouts/base-layout';
import { Footer } from '@/components/shared/footer';
import { HeaderProps } from '@/components/shared/header';

export interface IPropsBlankLayout {
  headerPosition?: HeaderProps['position'];
}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({
  children,
  headerPosition,
}) => (
  <BaseLayout>
    <DynHeader position={headerPosition} />
    <main>{children}</main>
    <Footer />
  </BaseLayout>
);


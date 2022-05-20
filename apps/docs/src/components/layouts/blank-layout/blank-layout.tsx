
import dynamic from 'next/dynamic';

import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';

export interface IPropsBlankLayout {
  fixedHeader?: boolean;
}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({
  children,
  fixedHeader,
}) => (
  <BaseLayout>
    <DynHeader fixed={fixedHeader} />
    <main>{children}</main>
  </BaseLayout>
);


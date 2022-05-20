import dynamic from 'next/dynamic';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';

export interface IPropsDocLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const DocLayout: FCChildren<IPropsDocLayout> = ({ children }) => (
  <BaseLayout>
    <DynHeader position="sticky" />
    <div>SIDEBAR</div>
    <main>{children}</main>
  </BaseLayout>
);


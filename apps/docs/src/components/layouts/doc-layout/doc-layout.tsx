import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';
import { Header } from '@/components/shared/header';

export interface IPropsDocLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const DocLayout: FCChildren<IPropsDocLayout> = ({ children }) => (
  <BaseLayout>
    <Header />
    <div>SIDEBAR</div>
    <main>{children}</main>
  </BaseLayout>
);


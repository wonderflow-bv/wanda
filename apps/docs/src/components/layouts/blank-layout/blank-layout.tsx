import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';
import { Header } from '@/components/shared/header';

export interface IPropsBlankLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({ children }) => (
  <BaseLayout>
    <Header />
    <main>{children}</main>
  </BaseLayout>
);


import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';

export interface IPropsBlankLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({ children }) => <BaseLayout>{children}</BaseLayout>;


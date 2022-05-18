import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';

export interface IPropsDocLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const DocLayout: FCChildren<IPropsDocLayout> = () => <BaseLayout>doc layout</BaseLayout>;


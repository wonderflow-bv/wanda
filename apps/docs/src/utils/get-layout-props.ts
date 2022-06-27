import { GetStaticPropsResult } from 'next';

import { IPropsBlankLayout } from '@/components/layouts/blank-layout';
import { IPropsComponentLayout } from '@/components/layouts/component-layout';
import { IPropsDocLayout } from '@/components/layouts/doc-layout';
import { IPropsMDXLayout } from '@/components/layouts/mdx-layout';

type LayoutTypes = 'blank' | 'doc' | 'mdx'

type LayoutProps = {
  blank: IPropsBlankLayout;
  doc: IPropsDocLayout;
  mdx: IPropsMDXLayout;
  component: IPropsComponentLayout;
}

export type PagePropsType<T extends LayoutTypes> = {
  layout?: T | null;
  layoutProps?: LayoutProps[T] | null;
} & Record<string, unknown>

type getLayoutPropsFn = <T extends LayoutTypes>(
  customProps?: PagePropsType<T>,
  config?: Record<string, unknown>
) => GetStaticPropsResult<PagePropsType<T>>;

export const getLayoutProps: getLayoutPropsFn = (customProps, config) => ({
  props: {
    ...customProps,
    layout: customProps?.layout ?? null,
    layoutProps: customProps?.layoutProps ?? null,
  },
  ...config,
});

import { IPropsBlankLayout } from '@/components/layouts/blank-layout';
import { IPropsDocLayout } from '@/components/layouts/doc-layout';

type LayoutTypes = 'blank' | 'doc'

type LayoutProps = {
  blank: IPropsBlankLayout;
  doc: IPropsDocLayout;
}

export type PagePropsType<T extends LayoutTypes> = {
  layout?: T;
  layoutProps?: LayoutProps[T];
}

type GetPageStaticPropsFn = <T extends LayoutTypes>(props?: PagePropsType<T>) => () => {
  props: PagePropsType<T> | Record<string, unknown>;
};

export const getPageStaticProps: GetPageStaticPropsFn = (props) => {
  if (!props) {
    return () => ({ props: {} });
  }

  return () => ({
    props: {
      layout: props.layout ?? null,
      layoutProps: props.layoutProps ?? null,
    },
  });
};

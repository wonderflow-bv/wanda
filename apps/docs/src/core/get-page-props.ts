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
} & Record<string, unknown>

type getLayoutPropsFn = <T extends LayoutTypes>(props?: PagePropsType<T>) =>
PagePropsType<T> | Record<string, unknown>;

// export const getLayoutProps: getLayoutPropsFn = (props) => {
//   if (!props) {
//     return {};
//   }

//   return {
//     layout: props.layout ?? null,
//     layoutProps: props.layoutProps ?? null,
//   };
// };

export const getLayoutProps: getLayoutPropsFn = props => ({
  props: {
    ...props,
    layout: props?.layout ?? null,
    layoutProps: props?.layoutProps ?? null,
  },
});

import { MDXProvider } from '@mdx-js/react';
import type {
  ListItemProps, ListProps, SeparatorProps, TextProps, TitleProps,
} from '@wonderflow/react-components';
import * as Components from '@wonderflow/react-components';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

import { DocLayout, IPropsDocLayout } from '@/components/layouts/doc-layout';
import { Code, CodeProps } from '@/components/shared/code';

export interface IPropsMDXLayout extends IPropsDocLayout {}

const COMPONENTS = {
  pre: (props: any) => <div {...props} />,
  code: (props: CodeProps) => <Code {...props} />,
  h1: (props: TitleProps) => <Components.Title as="h1" level="2" {...props} />,
  h2: (props: TitleProps) => <Components.Title as="h2" level="3" {...props} />,
  h3: (props: TitleProps) => <Components.Title as="h3" level="4" {...props} />,
  h4: (props: TitleProps) => <Components.Title as="h4" level="5" {...props} />,
  p: (props: TextProps) => <Components.Text size={22} {...props} />,
  a: (props: PropsWithChildren<LinkProps>) => <Link {...props}><a>{props.children}</a></Link>,
  ul: (props: ListProps) => <Components.List {...props}>{props.children}</Components.List>,
  ol: (props: ListProps) => <Components.List as="ol" {...props}>{props.children}</Components.List>,
  li: (props: ListItemProps) => <Components.List.Li markerColor="var(--dimmed-5)" {...props}>{props.children}</Components.List.Li>,
  hr: (props: SeparatorProps) => <Components.Separator {...props} />,
  ...Object.keys(Components).reduce((acc, name) => ({
    ...acc,
    [name]: (props: any) => {
      const Component = Components[name];
      return <Component {...props} />;
    },
  }), {}),
};

export const MDXLayout: FCChildren<IPropsMDXLayout> = ({
  children,
  ...props
}) => (
  <MDXProvider components={COMPONENTS}>
    <DocLayout {...props}>
      <Components.Stack vPadding={56}>
        <Components.Prose>
          {children}
        </Components.Prose>
      </Components.Stack>
    </DocLayout>
  </MDXProvider>
);

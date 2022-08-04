import { MDXProvider } from '@mdx-js/react';
import type {
  GridItemProps,
  ListItemProps, ListProps, MenuItemCheckboxProps, MenuItemProps, SeparatorProps, TextProps, TitleProps,
} from '@wonderflow/react-components';
import * as Components from '@wonderflow/react-components';
import { TabPanelProps } from '@wonderflow/react-components/dist/components/tab/tabs-panel';
import Link, { LinkProps } from 'next/link';
import { ImgHTMLAttributes, PropsWithChildren } from 'react';

import { DocLayout, IPropsDocLayout } from '@/components/layouts/doc-layout';
import { Code, CodeProps } from '@/components/shared/code';
import { LiveArea } from '@/components/shared/live-area';
import { LiveAreaProps } from '@/components/shared/live-area/live-area';

export interface IPropsMDXLayout extends IPropsDocLayout {}

export const MDX_COMPONENTS = {
  pre: (props: CodeProps) => <Code {...props} />,
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <img alt={props.alt ?? ''} loading="lazy" decoding="async" {...props} />,
  h1: (props: TitleProps) => <Components.Title as="h1" level="2" anchor {...props} />,
  h2: (props: TitleProps) => <Components.Title as="h2" level="3" anchor {...props} />,
  h3: (props: TitleProps) => <Components.Title as="h3" level="4" anchor {...props} />,
  h4: (props: TitleProps) => <Components.Title as="h4" level="5" anchor {...props} />,
  p: (props: TextProps) => <Components.Text size={22} {...props} />,
  a: ({ children, ...props }: PropsWithChildren<LinkProps>) => <Link {...props}><a>{children}</a></Link>,
  ul: ({ ...props }: ListProps) => <Components.List {...props} />,
  ol: ({ ...props }: ListProps) => <Components.List as="ol" {...props} />,
  li: ({ ...props }: ListItemProps) => <Components.List.Li markerColor="var(--dimmed-5)" {...props} />,
  hr: (props: SeparatorProps) => <Components.Separator {...props} />,
  GridItem: (props: GridItemProps) => <Components.Grid.Item {...props} />,
  Code: (props: CodeProps) => <Code {...props} />,
  MenuItem: (props: MenuItemProps) => <Components.Menu.Item {...props} />,
  TabPanel: (props: TabPanelProps) => <Components.Tab.Panel {...props} />,
  ListLi: (props: ListItemProps) => <Components.List.Li {...props} />,
  MenuItemCheckbox: (props: MenuItemCheckboxProps) => <Components.Menu.ItemCheckbox {...props} />,
  MenuSeparator: (props: Record<string, unknown>) => <Components.Menu.Separator {...props} />,
  LiveArea: (props: LiveAreaProps) => <LiveArea {...props} />,
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
  <DocLayout {...props}>
    <MDXProvider components={MDX_COMPONENTS}>
      <Components.Stack vPadding={56}>
        <Components.Prose>
          {children}
        </Components.Prose>
      </Components.Stack>
    </MDXProvider>
  </DocLayout>
);

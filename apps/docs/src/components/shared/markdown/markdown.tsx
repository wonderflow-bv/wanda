import * as Components from '@wonderflow/react-components';
import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx';
import Link, { LinkProps } from 'next/link';

import { Code } from '@/components/shared/code';
// import { LiveArea } from '@/components/live-area'

const CustomLink: FCChildren<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href} {...props}><a>{children}</a></Link>
);

export type MarkdownProps = {
  children: string;
  options?: MarkdownToJSX.Options;
  hideMarkers?: boolean;
  UlMaker?: Components.ListItemProps['marker'];
}

export const Markdown: FCChildren<MarkdownProps> = ({
  children,
  options,
  hideMarkers = false,
  UlMaker,
}) => (
  <MarkdownToJsx
    options={{
      overrides: {
        img: { component: 'img', props: { loading: 'lazy', decoding: 'async' } },
        p: { component: Components.Text, props: { variant: 'body-1' } },
        ul: { component: Components.List, props: { as: 'ul', marker: UlMaker, hideMarker: hideMarkers } },
        ol: { component: Components.List, props: { as: 'ol', hideMarker: hideMarkers } },
        li: { component: Components.List.Li, props: { markerColor: 'var(--dimmed-5)' } },
        a: { component: CustomLink },
        pre: { component: Code },
        h1: { component: Components.Text, props: { variant: 'heading-2', as: 'h1' } },
        h2: { component: Components.Text, props: { variant: 'heading-3', as: 'h2' } },
        h3: { component: Components.Text, props: { variant: 'heading-4', as: 'h3' } },
        h4: { component: Components.Text, props: { variant: 'heading-5', as: 'h4' } },
        h5: { component: Components.Text, props: { variant: 'heading-6', as: 'h5' } },
        h6: { component: Components.Text, props: { variant: 'heading-6', as: 'h6' } },
        hr: { component: Components.Separator },
        // LiveArea: { component: LiveArea },
        ...Object.keys(Components).reduce((acc, name) => ({ ...acc, [name]: { component: Components[name] } }), {}),
      },
      ...options,
    }}
  >
    {children}
  </MarkdownToJsx>
);

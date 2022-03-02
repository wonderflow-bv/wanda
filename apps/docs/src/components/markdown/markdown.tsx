import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx'
import { CodeBlock } from '@/components/code-block'
import Link, { LinkProps } from 'next/link'
import * as Components from '@wonderflow/react-components'
import { LiveArea } from '@/components/live-area'

const CustomLink: React.FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href} {...props}><a>{children}</a></Link>
)

export type MarkdownProps = {
  children: string;
  options?: MarkdownToJSX.Options;
  hideMarkers?: boolean;
  UlMaker?: Components.ListProps['marker']
}

export const Markdown: React.FC<MarkdownProps> = ({
  children,
  options,
  hideMarkers = false,
  UlMaker
}) => {
  return (
    <MarkdownToJsx
      options={{
        overrides: {
          img: { component: 'img', props: { loading: 'lazy', decoding: 'async' } },
          p: { component: Components.Text, props: { size: 22 } },
          ul: { component: Components.List, props: { as: 'ul', marker: UlMaker, markerColor: 'var(--dimmed-4)', hideMarker: hideMarkers } },
          ol: { component: Components.List, props: { as: 'ol', markerColor: 'var(--dimmed-4)', hideMarker: hideMarkers } },
          a: { component: CustomLink },
          pre: CodeBlock,
          h1: { component: Components.Title, props: { level: '1', as: 'h1' } },
          h2: { component: Components.Title, props: { level: '2', as: 'h2' } },
          h3: { component: Components.Title, props: { level: '3', as: 'h3' } },
          h4: { component: Components.Title, props: { level: '4', as: 'h4' } },
          h5: { component: Components.Title, props: { level: '5', as: 'h5' } },
          h6: { component: Components.Title, props: { level: '6', as: 'h6' } },
          hr: { component: Components.Separator },
          LiveArea: { component: LiveArea },
          ...Object.keys(Components).reduce((acc, name) => ({ ...acc, [name]: { component: Components[name] } }), {})
        },
        ...options
      }}
    >
      {children}
    </MarkdownToJsx>
  )
}

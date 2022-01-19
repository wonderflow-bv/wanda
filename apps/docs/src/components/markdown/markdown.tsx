import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx'
import { CodeBlock } from '@/components/code-block'
import Link, { LinkProps } from 'next/link'
import {
  Text,
  List,
  Title,
  Separator,
  Snackbar,
  Button,
  Chip,
  Disclosure,
  Tooltip,
  ListProps
} from '@wonderflow/react-components'
import { LiveArea } from '@/components/live-area'

const CustomLink: React.FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href} {...props}><a>{children}</a></Link>
)

export type MarkdownProps = {
  children: string;
  options?: MarkdownToJSX.Options;
  hideMarkers?: boolean;
  UlMaker?: ListProps['marker']
}

export const Markdown: React.FC<MarkdownProps> = ({
  children,
  options,
  hideMarkers = false,
  UlMaker
}) => (
  <MarkdownToJsx
    options={{
      overrides: {
        img: { component: 'img', props: { loading: 'lazy', decoding: 'async' } },
        p: { component: Text, props: { size: 22 } },
        ul: { component: List, props: { as: 'ul', marker: UlMaker, markerColor: 'var(--dimmed-4)', hideMarker: hideMarkers } },
        ol: { component: List, props: { as: 'ol', markerColor: 'var(--dimmed-4)', hideMarker: hideMarkers } },
        a: { component: CustomLink },
        pre: CodeBlock,
        h1: { component: Title, props: { level: '1', as: 'h1' } },
        h2: { component: Title, props: { level: '2', as: 'h2' } },
        h3: { component: Title, props: { level: '3', as: 'h3' } },
        h4: { component: Title, props: { level: '4', as: 'h4' } },
        h5: { component: Title, props: { level: '5', as: 'h5' } },
        h6: { component: Title, props: { level: '6', as: 'h6' } },
        hr: { component: Separator },
        Button: { component: Button },
        Chip: { component: Chip },
        Disclosure: { component: Disclosure },
        Snackbar: { component: Snackbar },
        Tooltip: { component: Tooltip },
        LiveArea: { component: LiveArea }
      },
      ...options
    }}
  >
    {children}
  </MarkdownToJsx>
)

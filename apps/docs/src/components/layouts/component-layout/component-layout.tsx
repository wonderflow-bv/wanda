import { MDXProvider } from '@mdx-js/react';
import {
  List, Prose, Stack, Symbol, Title,
} from '@wonderflow/react-components';
import Markdown from 'markdown-to-jsx';
import slugify from 'slugify';

import { DocLayout } from '@/components/layouts/doc-layout';
import { IPropsMDXLayout, MDX_COMPONENTS } from '@/components/layouts/mdx-layout';

export interface IPropsComponentLayout extends IPropsMDXLayout {
  features?: string[];
  showMeta?: boolean;
  links?: Array<Record<string, string>>;
}

export const ComponentLayout: FCChildren<IPropsComponentLayout> = ({
  children,
  features,
  links,
  title,
  showMeta = true,
  ...otherProps
}) => {
  const slugName = slugify(title, { lower: true });

  return (
    <DocLayout title={title} {...otherProps}>
      {showMeta && (
      <Stack
        direction="row"
        wrap
        fill={false}
        hAlign="space-between"
        columnGap={40}
        vPadding={56}
        rowGap={40}
      >
        {features && (
        <Stack rowGap={24} hAlign="start" fill={false}>
          <Title as="h2" level="5">
            Features
          </Title>
          <List>
            {features.map(feat => (
              <List.Li marker="check" markerColor="var(--highlight-green-foreground)" key={feat}>
                <Markdown>{feat}</Markdown>
              </List.Li>
            ))}
          </List>
        </Stack>
        )}

        <Stack rowGap={24} hAlign="start" fill={false}>
          <Title as="h2" level="5">
            Links
          </Title>
          <Stack hAlign="start" rowGap={8} style={{ maxInlineSize: '12.11rem' }}>
            <a
              href={`https://github.com/wonderflow-bv/wanda/tree/main/packages/react-components/src/components/${slugName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
              {' '}
              <Symbol source="arrow-up-right" dimension={12} />
            </a>
            <a
              href="https://github.com/wonderflow-bv/wanda/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report an issue
              {' '}
              <Symbol source="arrow-up-right" dimension={12} />
            </a>
            {links?.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                {' '}
                <Symbol source="arrow-up-right" dimension={12} />
              </a>
            ))}
          </Stack>
        </Stack>
      </Stack>
      )}
      <MDXProvider components={MDX_COMPONENTS}>
        <Prose>
          {children}
        </Prose>
      </MDXProvider>
    </DocLayout>
  );
};

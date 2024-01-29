import { MDXProvider } from '@mdx-js/react';
import {
  Button,
  ButtonsGroup,
  Chip,
  List, Stack, Symbol, Text, useResponsiveContext,
} from '@wonderflow/react-components';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import slugify from 'slugify';

import { DocLayout } from '@/components/layouts/doc-layout';
import { MDX_COMPONENTS } from '@/components/layouts/mdx-layout';

import { ClientOnly } from '../../shared/client-only';
import { Prose } from '../../shared/prose';
import { IPropsComponentLayout } from '../component-layout';

export const ChartLayout: FCChildren<IPropsComponentLayout> = ({
  children,
  features,
  links,
  title,
  tags,
  showMeta = true,
  newLayout = false,
  ...otherProps
}) => {
  const slugName = slugify(title, { lower: true });
  const router = useRouter();
  const pageURL = new URL(process.env.NEXT_PUBLIC_DOMAIN + router.asPath);
  const isSubPage = useMemo(() => pageURL.pathname.split('/').pop() !== slugName, [pageURL.pathname, slugName]);
  const { matches } = useResponsiveContext();
  const endPathName = useMemo(() => router.asPath.split('/')
    .splice(3, 2)
    .map((e, i) => (i === 0 ? e.replace('-', '') : e))
    .join('-')
    .replace('backbone-', '')
    .replace('cartesians-', ''),
  [router]);

  return (
    <DocLayout title={title} {...otherProps}>
      {tags && (
        <Stack direction="row" rowGap={16} columnGap={8} fill={false} vPadding={16} wrap>
          {tags?.map(t => <Chip color={t.color}>{t.label}</Chip>)}
        </Stack>
      )}
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
              <Text variant="heading-5">
                Features
              </Text>
              <List dimension="big">
                {features.map(feat => (
                  <List.Li marker="check" markerColor="var(--highlight-green-foreground)" key={feat}>
                    <Markdown>{feat}</Markdown>
                  </List.Li>
                ))}
              </List>
            </Stack>
          )}

          <Stack rowGap={24} hAlign="start" fill={false}>
            <Text variant="heading-5">
              Links
            </Text>
            <Stack hAlign="start" rowGap={8} style={{ maxInlineSize: '14.11rem' }}>
              <Link href={`/playground#${slugName}`}>
                {/* eslint-disable-next-line */}
              <a>
                Open in playground
                {' '}
                <Symbol source="arrow-up-right" dimension={12} />
              </a>
              </Link>
              <a
                href={`https://wonderflow-bv.github.io/wanda/?path=/story/charts-${endPathName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Storybook
                {' '}
                <Symbol source="arrow-up-right" dimension={12} />
              </a>
              <a
                href={`https://github.com/wonderflow-bv/wanda/tree/main/packages/charts/src/components/${slugName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source
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

      {newLayout && (
        <ClientOnly>
          <Stack vAlign="center" vPadding={40}>
            <ButtonsGroup>
              <Link href={isSubPage ? './' : `${slugName}`} passHref>
                <Button
                  as="a"
                  fullWidth
                  dimension={matches.medium ? 'big' : 'regular'}
                  kind="secondary"
                  icon={matches.medium ? 'circle-info' : undefined}
                  pressed={pageURL.pathname.split('/').pop() === slugName}
                >
                  Overview
                </Button>
              </Link>

              <Link href={isSubPage ? 'specs' : `${slugName}/specs`}>
                <Button
                  as="a"
                  fullWidth
                  dimension={matches.medium ? 'big' : 'regular'}
                  kind="secondary"
                  icon={matches.medium ? 'style' : undefined}
                  pressed={pageURL.pathname.split('/').pop() === 'specs'}
                >
                  Specs
                </Button>
              </Link>

              <Link href={isSubPage ? 'guidelines' : `${slugName}/guidelines`}>
                <Button
                  as="a"
                  fullWidth
                  dimension={matches.medium ? 'big' : 'regular'}
                  kind="secondary"
                  icon={matches.medium ? 'todo' : undefined}
                  pressed={pageURL.pathname.split('/').pop() === 'guidelines'}
                >
                  Guidelines
                </Button>
              </Link>

              <Link href={isSubPage ? 'implementation' : `${slugName}/implementation`}>
                <Button
                  as="a"
                  fullWidth
                  dimension={matches.medium ? 'big' : 'regular'}
                  kind="secondary"
                  icon={matches.medium ? 'code' : undefined}
                  pressed={pageURL.pathname.split('/').pop() === 'implementation'}
                >
                  Implementation
                </Button>
              </Link>
            </ButtonsGroup>
          </Stack>
        </ClientOnly>
      )}

      <MDXProvider components={MDX_COMPONENTS}>
        <Prose>
          {children}
        </Prose>
      </MDXProvider>
    </DocLayout>
  );
};

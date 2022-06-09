import {
  Container, Separator, Stack, Text,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { domMax, LazyMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  CSSProperties, useMemo,
} from 'react';

import { DocHeader, DocHeaderProps } from '@/components/doc/doc-header';
import { DocNav } from '@/components/doc/doc-nav';
import { Toc } from '@/components/doc/toc';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Header } from '@/components/shared/header';
import { useResponsive } from '@/context/responsive';
import { useHeadingsData } from '@/hooks/headings-data';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends Pick<DocHeaderProps, 'title' | 'subtitle'> {
  color?: 'mint' | 'blue' | 'salmon' | 'indigo';
  showToc?: boolean;
}

export const DocLayout: FCChildren<IPropsDocLayout> = ({
  children,
  color,
  title,
  subtitle,
  showToc = true,
}) => {
  const { matches } = useResponsive();
  const router = useRouter();
  const { nestedHeadings } = useHeadingsData();

  const getPretitle = useMemo(() => {
    const pretitle = (router.asPath.split('/')[3] || router.asPath.split('/')[2]).replace(/-/g, ' ');
    const isDifferentFromTitle = pretitle.replace('-', ' ') !== title?.toLowerCase();
    return pretitle && isDifferentFromTitle ? pretitle : 'documentation';
  }, [router, title]);

  const dynamicStyle: CSSProperties = {
    '--layout-color-fg': `var(--highlight-${color ?? 'gray'}-foreground)`,
    '--layout-color-bg': `var(--highlight-${color ?? 'gray'}-background)`,
  };

  return (
    <BaseLayout>
      <Header position="sticky" />
      <span className={styles.Glow} />
      <LazyMotion features={domMax}>
        <Container dimension="large" style={dynamicStyle}>
          <Stack direction={matches.large ? 'row' : undefined} columnGap={56}>

            <div className={styles.Sidebar}>
              <Stack rowGap={40}>
                <DocNav />
              </Stack>
            </div>

            <main className={styles.Content}>
              <DocHeader preTitle={getPretitle} title={title} subtitle={subtitle} />

              {children}

              <Stack fill={false} vPadding={24} rowGap={24}>
                <Separator />
                <Stack rowGap={24}>
                  <Stack rowGap={8}>
                    <Text size={16} dimmed={6} lineHeight="none">
                      Created and maintained by Wonderflow.
                    </Text>
                    <Text size={16} dimmed={6} lineHeight="none">
                      &copy; Wonderflow
                      {' '}
                      {new Date().getFullYear()}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </main>

            {(showToc && nestedHeadings.length > 0) && (
              <div className={clsx(styles.Sidebar, styles.Toc)}>
                <Toc headings={nestedHeadings} />
              </div>
            )}
          </Stack>
        </Container>
      </LazyMotion>
    </BaseLayout>
  );
};


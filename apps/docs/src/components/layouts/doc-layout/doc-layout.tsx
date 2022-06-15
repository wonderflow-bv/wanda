import {
  Button,
  Container, Drawer, OverlayContainer, Separator, Stack, Text,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { domMax, LazyMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  CSSProperties, useMemo, useRef, useState,
} from 'react';
import { NavigationMenu } from 'types/data';

import { DocHeader, DocHeaderProps } from '@/components/doc/doc-header';
import { DocNav } from '@/components/doc/doc-nav';
import { Toc } from '@/components/doc/toc';
import { BaseLayout } from '@/components/layouts/base-layout';
import { ClientOnly } from '@/components/shared/client-only';
import { Header } from '@/components/shared/header';
import { Meta } from '@/components/shared/meta';
import { Navigation } from '@/components/shared/navigation';
import { useResponsive } from '@/context/responsive';
import { useToc } from '@/hooks/table-of-content';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends Pick<DocHeaderProps, 'title' | 'subtitle'> {
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
  showToc?: boolean;
  navigation?: NavigationMenu;
}

export const DocLayout: FCChildren<IPropsDocLayout> = ({
  children,
  color,
  title,
  subtitle,
  navigation,
  showToc = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { matches } = useResponsive();
  const router = useRouter();
  const { headings } = useToc();
  const containerRef = useRef<HTMLDivElement>(null);

  const getPretitle = useMemo(() => {
    const url = new URL(process.env.NEXT_PUBLIC_DOMAIN + router.asPath);
    const pretitle = (url.pathname.split('/')[3] || url.pathname.split('/')[2]).replace(/-/g, ' ');
    const isDifferentFromTitle = pretitle.replace('-', ' ') !== title?.toLowerCase();
    return pretitle && isDifferentFromTitle ? pretitle : 'documentation';
  }, [router, title]);

  const dynamicStyle: CSSProperties = {
    '--layout-color-fg': `var(--highlight-${color ?? 'gray'}-foreground)`,
    '--layout-color-bg': `var(--highlight-${color ?? 'gray'}-background)`,
  };

  return (
    <BaseLayout>
      <Meta title={title} description={subtitle} />
      <Header position="sticky" />
      <span className={styles.Glow} />
      <LazyMotion features={domMax}>
        <Container ref={containerRef} dimension="large" style={dynamicStyle}>
          <Stack direction={matches.large ? 'row' : undefined} columnGap={56}>

            <div className={styles.Sidebar}>
              <Stack rowGap={40}>
                {matches.large ? (
                  <>
                    <DocNav />
                    <ClientOnly>
                      {navigation && (
                        <>
                          <Separator />
                          <Navigation data={navigation} />
                        </>
                      )}
                    </ClientOnly>
                  </>
                ) : (
                  <>
                    {navigation && <Button kind="secondary" onClick={() => setIsMenuOpen(true)}>Navigation</Button>}
                  </>
                )}
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

            {(showToc && headings.length > 0) && (
            <div className={clsx(styles.Sidebar, styles.Toc)}>
              <Toc headings={headings} />
            </div>
            )}
          </Stack>
        </Container>
      </LazyMotion>
      {containerRef?.current && (
        <ClientOnly>
          <OverlayContainer
            root={containerRef?.current}
            onClose={() => setIsMenuOpen(false)}
            obfuscate={false}
          >
            {isMenuOpen && (
            <Drawer title="Drawer title" maxWidth="100vw" theme="auto">
              <Stack rowGap={40} hPadding={24} vPadding={32}>
                <DocNav />
                {navigation && (
                  <>
                    <Separator />
                    <Navigation data={navigation} />
                  </>
                )}
              </Stack>
            </Drawer>
            )}
          </OverlayContainer>
        </ClientOnly>
      )}
    </BaseLayout>
  );
};


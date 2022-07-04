import {
  Button,
  Container, ContainerProps, Drawer, OverlayContainer, Separator, Stack, useResponsiveContext,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { domMax, LazyMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  CSSProperties, useEffect, useMemo, useState,
} from 'react';
import { NavigationMenu } from 'types/data';

import { DocHeader, DocHeaderProps } from '@/components/doc/doc-header';
import { DocNav } from '@/components/doc/doc-nav';
import { Toc } from '@/components/doc/toc';
import { BaseLayout } from '@/components/layouts/base-layout';
import { ClientOnly } from '@/components/shared/client-only';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Meta } from '@/components/shared/meta';
import { Navigation } from '@/components/shared/navigation';
import { Headings, HeadingType, useToc } from '@/hooks/table-of-content';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends Pick<DocHeaderProps, 'title' | 'subtitle'> {
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
  showToc?: boolean;
  navigation?: NavigationMenu;
  contentSize?: ContainerProps['dimension'];
}

export const DocLayout: FCChildren<IPropsDocLayout> = ({
  children,
  color,
  title,
  subtitle,
  navigation,
  showToc = true,
  contentSize = 'medium',
}) => {
  const [staticHeadings, setStaticHeadings] = useState<HeadingType[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { matches } = useResponsiveContext();
  const router = useRouter();
  const { headings, getNestedHeadings } = useToc();

  const getPretitle = useMemo(() => {
    const url = new URL(process.env.NEXT_PUBLIC_DOMAIN + router.asPath);
    const pretitle = (url.pathname.split('/')[3] || url.pathname.split('/')[2]).replace(/-/g, ' ');
    const isDifferentFromTitle = pretitle.replace('-', ' ') !== title?.toLowerCase();
    return pretitle && isDifferentFromTitle ? pretitle : 'documentation';
  }, [router, title]);

  const dynamicStyle: CSSProperties = {
    paddingTop: 72,
    '--layout-color-fg': `var(--highlight-${color ?? 'gray'}-foreground)`,
    '--layout-color-bg': `var(--highlight-${color ?? 'gray'}-background)`,
  };

  useEffect(() => {
    if (headings.length === 0) {
      const headingElements: Headings = Array.from(
        document.querySelectorAll('h2, h3'),
      );

      setStaticHeadings(getNestedHeadings(headingElements));
    }
  }, [getNestedHeadings, headings]);

  return (
    <BaseLayout>
      <Meta title={title} description={subtitle} />
      <Header position="fixed" />
      <span className={styles.Glow} />
      <LazyMotion features={domMax}>
        <Container style={dynamicStyle}>
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
                  <Button kind="secondary" onClick={() => setIsMenuOpen(true)}>
                    Navigation
                  </Button>
                )}
              </Stack>
            </div>

            <Container as="main" dimension={contentSize} className={styles.Content}>
              <DocHeader preTitle={getPretitle} title={title} subtitle={subtitle} color={color} />

              {children}

              <Stack fill={false} vPadding={24} rowGap={24}>
                <Footer compact />
              </Stack>
            </Container>

            <div className={clsx(styles.Sidebar, styles.Toc)}>
              {(showToc && (headings.length > 0 || staticHeadings.length > 0)) && (
                <>
                  {headings.length === 0 && <Toc headings={staticHeadings} />}
                  {headings.length > 0 && <Toc headings={headings} />}
                </>
              )}
            </div>
          </Stack>
        </Container>
      </LazyMotion>
      <ClientOnly>
        <OverlayContainer
          onClose={() => setIsMenuOpen(false)}
          obfuscate={false}
        >
          {(isMenuOpen && !matches.large) && (
            <Drawer title="Navigation" maxWidth="100vw" theme="auto">
              <Stack rowGap={40} hPadding={24} vPadding={32}>
                <DocNav />
                {navigation && (
                  <>
                    <Separator />
                    {navigation && <Navigation data={navigation} />}
                  </>
                )}
              </Stack>
            </Drawer>
          )}
        </OverlayContainer>
      </ClientOnly>
    </BaseLayout>
  );
};


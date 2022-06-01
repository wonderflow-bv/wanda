import {
  Container, Stack,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CSSProperties, useMemo } from 'react';

import { DocHeader, DocHeaderProps } from '@/components/doc/doc-header';
import { DocNav } from '@/components/doc-nav';
import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';
import { useResponsive } from '@/context/responsive';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends Pick<DocHeaderProps, 'title' | 'subtitle'> {
  color?: 'mint' | 'blue' | 'salmon' | 'indigo';
}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const DocLayout: FCChildren<IPropsDocLayout> = ({
  children,
  color,
  title,
  subtitle,
}) => {
  const { matches } = useResponsive();
  const router = useRouter();
  const getPretitle = useMemo(() => {
    const pretitle = (router.asPath.split('/')[3] || router.asPath.split('/')[2]).replace(/-/g, ' ');
    const isDifferentFromTitle = pretitle.replace('-', ' ') !== title?.toLowerCase();
    return pretitle && isDifferentFromTitle ? pretitle : undefined;
  }, [router, title]);

  const dynamicStyle: CSSProperties = {
    '--layout-color-fg': `var(--highlight-${color ?? 'gray'}-foreground)`,
    '--layout-color-bg': `var(--highlight-${color ?? 'gray'}-background)`,
  };

  return (
    <BaseLayout>
      <DynHeader position="sticky" />
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
          </main>

          <div className={clsx(styles.Sidebar, styles.Toc)}>toc</div>
        </Stack>
      </Container>
    </BaseLayout>
  );
};


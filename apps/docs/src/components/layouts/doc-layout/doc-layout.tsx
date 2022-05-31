import {
  Container, Icon, Stack, Text,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { HTMLAttributes, PropsWithChildren, useCallback } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';
import { useResponsiveContext } from '@/context/responsive';
import DocNav from '@/data/doc-nav';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const DocLayout: FCChildren<IPropsDocLayout> = ({ children }) => {
  const { matches } = useResponsiveContext();
  const router = useRouter();

  const includesPath = useCallback(
    (path: NextRouter['asPath']) => {
      const matchURL = router.asPath.split('/')[1] === path;
      return matchURL && router.asPath.split('/')[1].length > 0;
    },
    [router.asPath],
  );

  return (
    <BaseLayout>
      <DynHeader position="sticky" />
      <Container dimension="large">
        <Stack direction={matches.large ? 'row' : undefined} columnGap={56}>

          <div className={styles.Sidebar}>
            <Stack rowGap={40}>
              <Stack rowGap={8}>
                {DocNav.map(link => (
                  <Link href={link.url} passHref>
                    <Stack
                      as="a"
                      className={styles.NavItem}
                      style={{
                        '--bg': `var(--highlight-${link.color ?? 'gray'}-background)`,
                        '--fg': `var(--highlight-${link.color ?? 'gray'}-foreground)`,
                      }}
                      direction="row"
                      columnGap={8}
                      hAlign="start"
                      vAlign="center"
                      fill={false}
                      aria-current={includesPath(link.url.split('/')[1]) ? 'true' : undefined}
                    >
                      <Stack as="span" hAlign="center" vAlign="center" className={styles.IconWrapper}>
                        <Icon source={link.icon} dimension={18} weight="duotone" />
                      </Stack>
                      <Text as="span" weight="bold" size={16}>{link.label}</Text>
                    </Stack>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </div>

          <main className={styles.Content}>
            {children}
          </main>

          <div className={clsx(styles.Sidebar, styles.Toc)}>toc</div>
        </Stack>
      </Container>
    </BaseLayout>
  );
};


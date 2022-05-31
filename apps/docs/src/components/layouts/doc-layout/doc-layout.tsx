import { Container, Stack } from '@wonderflow/react-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';
import { useResponsiveContext } from '@/context/responsive';

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

  return (
    <BaseLayout>
      <DynHeader position="sticky" />
      <Container dimension="large">
        <Stack direction={matches.large ? 'row' : undefined} columnGap={56}>
          <div className={styles.Sidebar}>
            <Stack>
              SIDEBAR
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


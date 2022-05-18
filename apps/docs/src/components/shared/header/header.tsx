/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, Skeleton, Stack } from '@wonderflow/react-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Logo } from '@/components/shared/logo';
import { MainNav } from '@/components/shared/main-nav';
import { useResponsiveContext } from '@/context/responsive';

import styles from './header.module.css';

const DynThemeSwitcher = dynamic<Record<string, any>>(
  async () => import('@/components/shared/theme-switcher').then(mod => mod.ThemeSwitcher),
  {
    ssr: false,
    loading: () => <Skeleton height={40} width={40} circle />,
  },
);

export const Header = () => {
  const { matches } = useResponsiveContext();

  return (
    <header>
      <Container dimension="large">
        <Stack
          fill={false}
          direction="row"
          hAlign="space-between"
          vAlign="center"
          vPadding={16}
          columnGap={24}
        >
          <Link href="/"><a className={styles.LogoLink}><Logo /></a></Link>
          {matches.small && <MainNav />}
          <Stack>
            <DynThemeSwitcher />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
};

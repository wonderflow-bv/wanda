/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card,
  Container, Elevator, IconButton,
  Popover, Skeleton,
  Stack,
} from '@wonderflow/react-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Logo } from '@/components/shared/logo';
import { MainNav } from '@/components/shared/main-nav';
import { Search } from '@/components/shared/search';
import { useResponsiveContext } from '@/context/responsive';

import styles from './header.module.css';

const DynThemeSwitcher = dynamic<Record<string, any>>(
  async () => import('@/components/shared/theme-switcher').then(mod => mod.ThemeSwitcher),
  {
    ssr: false,
    loading: () => <Skeleton height={40} width={40} circle />,
  },
);

export const Header: FCClass = ({
  className,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return (
    <header className={className} {...otherProps}>
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
          {matches.medium && <MainNav />}
          <Stack direction="row" vAlign="center" fill={false} columnGap={8}>
            {!matches.medium && (
              <Popover trigger={<IconButton icon="bars" kind="flat" iconPosition="right" aria-label="Show main menu" />}>
                <Elevator resting={2}>
                  <Card bordered padding={8}>
                    <MainNav direction="column" />
                  </Card>
                </Elevator>
              </Popover>
            )}
            <Search />
            <DynThemeSwitcher />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
};

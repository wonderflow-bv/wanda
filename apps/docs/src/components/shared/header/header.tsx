import {
  Card,
  Container, Elevator, IconButton,
  Popover, Skeleton,
  Stack,
} from '@wonderflow/react-components';
import { useScroll } from 'ahooks';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Logo } from '@/components/shared/logo';
import { MainNav } from '@/components/shared/main-nav';
import { Search } from '@/components/shared/search';
import { useResponsive } from '@/context/responsive';

import styles from './header.module.css';

export type HeaderProps = {
  position?: 'fixed' | 'absolute' | 'sticky';
}

const DynThemeSwitcher = dynamic<Record<string, any>>(
  async () => import('@/components/shared/theme-switcher').then(mod => mod.ThemeSwitcher),
  {
    ssr: false,
    loading: () => <Skeleton height={32} width={32} circle />,
  },
);

export const Header: FCClass<HeaderProps> = ({
  className,
  position,
  ...otherProps
}) => {
  const { matches } = useResponsive();
  const scroll = useScroll(() => document, val => val.top >= 0 && val.top < 1000);

  return (
    <header
      data-header-position={position}
      className={clsx(styles.Header, className)}
      style={{ '--blur': `${Math.min(Math.max(scroll?.top ?? 0, 0), 24)}px` }}
      {...otherProps}
    >
      <div
        className={styles.BgContainer}
        style={{
          '--bg-opacity': `${Math.min(Math.max(scroll?.top ?? 0, 0), 70)}%`,
        }}
      >
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
            <Stack direction="row" vAlign="center" fill={false} columnGap={8}>
              {matches.medium && <MainNav />}
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
              <IconButton
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/wonderflow-bv/wanda"
                kind="flat"
                icon="github"
                aria-label="Wanda on GitHub"
              />
            </Stack>
          </Stack>
        </Container>
      </div>
    </header>
  );
};

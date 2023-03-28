import {
  Card, Chip, Container, Elevator, IconButton,
  Popover, Skeleton, Stack, useResponsiveContext,
} from '@wonderflow/react-components';
import { useScroll } from 'ahooks';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Logo } from '@/components/shared/logo';
import { MainNav } from '@/components/shared/main-nav';
import { Search } from '@/components/shared/search';

import pkg from '../../../../package.json';
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
  const { matches } = useResponsiveContext();
  const scroll = useScroll(() => document, val => val.top >= 0 && val.top < 500);

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
        <Container>
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
              <Chip className={styles.Version} dimension="small" icon="tags" color="green">
                {`v${pkg.dependencies['@wonderflow/react-components']}`}
              </Chip>
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
              <IconButton
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/wonderflow-bv/wanda"
                kind="flat"
                icon="github"
                aria-label="Wanda on GitHub"
              />
              <DynThemeSwitcher />
            </Stack>
          </Stack>
        </Container>
      </div>
    </header>
  );
};

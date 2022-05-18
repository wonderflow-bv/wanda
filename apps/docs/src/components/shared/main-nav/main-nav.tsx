/* eslint-disable jsx-a11y/anchor-is-valid */
import { Stack } from '@wonderflow/react-components';
import { m } from 'framer-motion';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import styles from './main-nav.module.css';

const MENU = [
  {
    label: 'Documentation',
    url: '/get-started/introduction',
  },
  {
    label: 'Playground',
    url: '/playground',
  },
  {
    label: 'Learn',
    url: '/learn',
  },
];

export const MainNav = () => {
  const router = useRouter();

  const includesPath = useCallback(
    (path: NextRouter['asPath']) => router.asPath === path,
    [router.asPath],
  );

  return (
    <Stack as="nav" direction="row" columnGap={8}>
      {MENU.map(item => (
        <Link href={item.url} key={item.label}>
          <a
            className={styles.Link}
            aria-current={includesPath(item.url) ? 'page' : undefined}
          >
            {includesPath(item.url) && <m.span layoutId="mainNav" className={styles.Highlight} />}
            {item.label}
          </a>
        </Link>
      ))}
    </Stack>
  );
};

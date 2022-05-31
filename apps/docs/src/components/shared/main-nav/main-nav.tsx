import { Stack } from '@wonderflow/react-components';
import { m } from 'framer-motion';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import Nav from '@/data/nav';

import styles from './main-nav.module.css';

type MainNavProps = {
  direction?: 'row' | 'column';
}

export const MainNav: FCClass<MainNavProps> = ({
  direction = 'row',
}) => {
  const router = useRouter();

  const includesPath = useCallback(
    // (path: NextRouter['asPath']) => router.asPath === path,
    (path: NextRouter['asPath']) => {
      const matchURL = router.asPath.split('/')[1] === path.split('/')[1];
      return matchURL && router.asPath.split('/')[1].length > 0;
    },
    [router.asPath],
  );

  return (
    <Stack as="nav" direction={direction} columnGap={8}>
      {Nav.map(item => (
        <Link href={item.url} key={item.label}>
          <a
            className={styles.Link}
            target={item.blank ? '_blank' : undefined}
            rel={item.blank ? 'noopener noreferrer' : undefined}
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

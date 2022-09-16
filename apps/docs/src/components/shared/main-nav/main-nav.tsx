import { Stack } from '@wonderflow/react-components';
import {
  domMax, LazyMotion, m,
} from 'framer-motion';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import Nav from '@/data/main-nav';

import styles from './main-nav.module.css';

type MainNavProps = {
  direction?: 'row' | 'column';
}

export const MainNav: FCClass<MainNavProps> = ({
  direction = 'row',
}) => {
  const { asPath } = useRouter();

  const includesPath = useCallback(
    // (path: NextRouter['asPath']) => router.asPath === path,
    (pageUrl: NextRouter['asPath']) => {
      const isMatchingUrl = asPath.split('/')[1] === pageUrl.split('/')[1];
      return isMatchingUrl && asPath.split('/')[1].length > 0;
    },
    [asPath],
  );

  return (
    <LazyMotion features={domMax}>
      <Stack as="nav" direction={direction} columnGap={8}>
        {Nav.map(item => (
          <Link href={item.url} key={item.label}>
            <a
              className={styles.Link}
              target={item.blank ? '_blank' : undefined}
              rel={item.blank ? 'noopener noreferrer' : undefined}
              aria-current={includesPath(item.url) ? 'page' : undefined}
            >
              {includesPath(item.url) && (
                <m.span
                  layoutId="mainNav"
                  layoutDependency={item.url}
                  className={styles.Highlight}
                />
              )}
              {item.label}
            </a>
          </Link>
        ))}
      </Stack>
    </LazyMotion>
  );
};

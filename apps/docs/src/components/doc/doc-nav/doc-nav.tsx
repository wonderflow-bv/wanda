import { Stack, Symbol, Text } from '@wonderflow/react-components';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useCallback } from 'react';

import DocSubNav from '@/data/doc-nav';

import styles from './doc-nav.module.css';

export const DocNav = () => {
  const router = useRouter();

  const includesPath = useCallback(
    (path: NextRouter['asPath']) => {
      const matchURL = router.asPath.split('/')[2] === path.split('/')[2];
      return matchURL && router.asPath.split('/')[2].length > 0;
    },
    [router.asPath],
  );

  return (
    <Stack rowGap={8}>
      {DocSubNav.map(link => (
        <Link key={link.label} href={link.url} passHref>
          <Stack
            as="a"
            className={styles.NavItem}
            direction="row"
            columnGap={8}
            hAlign="start"
            vAlign="center"
            vPadding={4}
            fill={false}
            aria-current={includesPath(link.url) ? 'true' : undefined}
            style={{
              '--bg': `var(--highlight-${link.color ?? 'gray'}-background)`,
              '--fg': `var(--highlight-${link.color ?? 'gray'}-foreground)`,
            }}
          >
            <Stack as="span" hAlign="center" vAlign="center" className={styles.IconWrapper}>
              <Symbol source={link.icon} dimension={18} weight="duotone" />
            </Stack>
            <Text as="span" weight="bold" size={16}>{link.label}</Text>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

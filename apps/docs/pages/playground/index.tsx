import { Spinner } from '@wonderflow/react-components';
import { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { getLayoutProps } from '@/utils/get-layout-props';

import styles from './playground.module.css';

const PlaygroundPage: NextPage = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { theme } = useTheme();

  const mediaMatches = (matches: boolean) => {
    setIsDark(matches);
  };

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => mediaMatches(matches));

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', ({ matches }) => mediaMatches(matches));
    };
  }, [theme]);

  const computeSrc = () => {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    const computedTheme = (theme === 'system' && isDark) ? 'dark' : 'light';

    return `https://stackblitz.com/edit/wanda?embed=1&file=src/app.tsx&hideNavigation=1&hideFileExplorer=0&theme=${theme === 'system' ? computedTheme : currentTheme}`;
  };

  return (
    <>
      <Spinner className={styles.Spinner} />
      <iframe
        loading="lazy"
        className={styles.Iframe}
        title="Playground"
        src={computeSrc()}
      />
    </>
  );
};

export default PlaygroundPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    headerPosition: 'sticky',
    showFooter: false,
  },
});

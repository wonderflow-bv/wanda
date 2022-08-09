import { Spinner } from '@wonderflow/react-components';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

import styles from './stackblitz.module.css';

type StackblitzProps = {
  component?: string;
}

export const Stackblitz: FC<StackblitzProps> = ({
  component = 'app',
}) => {
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
  }, [theme, component]);

  const computeSrc = () => {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    const computedTheme = (theme === 'system' && isDark) ? 'dark' : 'light';
    const src = new URL(`https://stackblitz.com/edit/wanda?embed=1&file=src/routes/${component}.tsx`);
    const params = new URLSearchParams(src.search);

    params.set('hideNavigation', '0');
    params.set('hideFileExplorer', '0');
    params.set('theme', theme === 'system' ? computedTheme : currentTheme);

    return src;
  };

  return (
    <>
      <Spinner className={styles.Spinner} />
      <iframe
        loading="lazy"
        className={styles.Frame}
        title="Playground"
        src={computeSrc()}
      />
    </>
  );
};

import {
  Elevator, Stack,
} from '@wonderflow/react-components';
// @ts-expect-error missing JSON module declaration
import darkTheme from '@wonderflow/themes/dark.json';
// @ts-expect-error missing JSON module declaration
import lightTheme from '@wonderflow/themes/light.json';
import { m } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Browser } from '@/components/shared/browser';
import { ClientOnly } from '@/components/shared/client-only';
import { ThemeList } from '@/components/shared/theme-list';

import styles from './themes.module.css';

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
};

const ANIMATION = {
  hidden: {
    x: -10,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
};

export const Themes = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      setIsDark(matches);
    });
  }, [theme]);

  return (
    <ClientOnly>
      <m.div variants={ANIMATION} initial="hidden" animate="visible" exit="visible">
        <Elevator resting={4}>
          <Browser className={styles.Themes}>
            <Stack hPadding={16} vPadding={16}>
              {(theme && theme !== 'system') && <ThemeList theme={THEMES[theme]} />}
              {(theme && theme === 'system') && <ThemeList theme={isDark ? THEMES.dark : THEMES.light} />}
            </Stack>
          </Browser>
        </Elevator>
      </m.div>
    </ClientOnly>
  );
};

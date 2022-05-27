import {
  ClampText, Icon, Stack, Text,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';

import { ThemeSwitcherProps } from '@/components/shared/theme-switcher';

import styles from './browser.module.css';

type BrowserProps = {
  url?: string;
  maxHeight?: string;
  ratio?: string;
}

const DynThemeSwitcher = dynamic<ThemeSwitcherProps >(
  async () => import('@/components/shared/theme-switcher').then(mod => mod.ThemeSwitcher),
  { ssr: false },
);

export const Browser: FCChildrenClass<BrowserProps> = ({
  className,
  children,
  url = 'design.wonderflow.ai',
  maxHeight = '28rem',
  ratio,
  style,
  ...otherProps
}) => {
  const dynamicStyle: CSSProperties = {
    '--max-height': maxHeight,
    '--ratio': ratio,
  };

  return (
    <Stack
      className={clsx(styles.Window, className)}
      vAlign="start"
      fill={false}
      aria-hidden="true"
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.Toolbar}>
        <Stack direction="row" columnGap={24} inline fill={false}>
          <Stack
            direction="row"
            columnGap={8}
            fill={false}
            vAlign="center"
            className={styles.TrafficLight}
          >
            <span />
            <span />
            <span />
          </Stack>
          <Stack direction="row" columnGap={8}>
            <Icon source="chevron-left" dimension={12} />
            <Icon source="chevron-right" dimension={12} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          className={styles.Address}
          hAlign="center"
          vAlign="center"
          vPadding={4}
          hPadding={4}
          fill={false}
          columnGap={8}
        >
          <Icon source="lock" dimension={12} />
          <Text size={14} lineHeight="none">
            <ClampText rows={1}>{url}</ClampText>
          </Text>
        </Stack>

        <Stack direction="row" hAlign="end" fill={false}>
          <DynThemeSwitcher dimension="small" />
        </Stack>
      </div>
      <div className={styles.Viewport}>
        {children}
      </div>
    </Stack>
  );
};

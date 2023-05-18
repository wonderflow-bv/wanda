import { Separator, Stack } from '@wonderflow/react-components';
import type { TokensTypes } from '@wonderflow/tokens/platforms/web';
import clsx from 'clsx';

import styles from './dos-and-donts.module.css';

export type DosAndDontsProps = {
  color?: TokensTypes['colors'] ;
  maxWidth?: string;
}

export const DosAndDonts: FCChildrenClass<DosAndDontsProps> = ({
  children,
  className,
  color = 'green',
  maxWidth = '100%',
  ...otherProps
}) => (
  <Stack vPadding={16} rowGap={16} maxWidth={maxWidth} className={clsx(styles.DAD, className)} {...otherProps}>
    <Separator
      data-separator-color={color}
      className={styles.Separator}
      style={{ borderBottom: `3px solid var(--highlight-${color}-foreground)` }}
    />
    {children}
  </Stack>
);

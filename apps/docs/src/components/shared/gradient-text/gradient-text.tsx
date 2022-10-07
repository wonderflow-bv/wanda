import type { TokensTypes } from '@wonderflow/tokens/platforms/web';
import clsx from 'clsx';

import styles from './gradient-text.module.css';

export type GradientTextProps = {
  color?: 'rainbow' | TokensTypes['colors'];
}

export const GradientText: FCChildrenClass<GradientTextProps> = ({
  children,
  className,
  color = 'rainbow',
  ...otherProps
}) => (
  <span className={clsx(styles.GradientText, className)} data-gradient-text={color} {...otherProps}>{children}</span>
);

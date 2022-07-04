import clsx from 'clsx';

import styles from './gradient-text.module.css';

export type GradientTextProps = {
  color?: 'rainbow' | 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
}

export const GradientText: FCChildrenClass<GradientTextProps> = ({
  children,
  className,
  color = 'rainbow',
  ...otherProps
}) => (
  <span className={clsx(styles.GradientText, className)} data-gradient-text={color} {...otherProps}>{children}</span>
);

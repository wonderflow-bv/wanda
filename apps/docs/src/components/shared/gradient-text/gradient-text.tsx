import clsx from 'clsx';

import styles from './gradient-text.module.css';

type GradientTextProps = {
  color?: 'rainbow' | 'indigo' | 'orange';
}

export const GradientText: FCChildrenClass<GradientTextProps> = ({
  children,
  className,
  color = 'rainbow',
  ...otherProps
}) => (
  <span className={clsx(styles.GradientText, className)} data-gradient-text={color} {...otherProps}>{children}</span>
);

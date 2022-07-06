import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

import styles from './separator.module.css';

export type SeparatorProps = HTMLAttributes<HTMLHRElement>

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  ...otherProps
}, forwardedRef) => (
  <hr
    ref={forwardedRef}
    className={clsx(styles.Separator, className)}
    {...otherProps}
  />
));

Separator.displayName = 'Separator';

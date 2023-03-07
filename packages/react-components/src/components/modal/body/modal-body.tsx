import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import * as styles from './modal-body.module.css';

export type ModalBodyProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(({
  children,
  className,
  theme = 'light',
  ...otherProps
}, forwardedRef) => (
  <div
    className={clsx(styles.Body, className)}
    ref={forwardedRef}
    data-theme={theme}
    {...otherProps}
  >
    {children}
  </div>
));

ModalBody.displayName = 'Modal.Body';

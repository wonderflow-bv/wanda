import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import * as styles from './modal-footer.module.css';

export type ModalFooterProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(({
  children,
  className,
  theme = 'light',
  ...otherProps
}, forwardedRef) => (
  <div
    className={clsx(styles.Footer, className)}
    ref={forwardedRef}
    data-theme={theme}
    {...otherProps}
  >
    {children}
  </div>
));

ModalFooter.displayName = 'Modal.Footer';

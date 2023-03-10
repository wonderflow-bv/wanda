import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';
import { AutoFocusInside } from 'react-focus-on';

import * as styles from './modal-content.module.css';

export type ModalContentProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className,
  theme = 'light',
  ...otherProps
}, forwardedRef) => (
  <div
    className={clsx(styles.Content, className)}
    ref={forwardedRef}
    data-theme={theme}
    {...otherProps}
  >
    <AutoFocusInside>
      {children}
    </AutoFocusInside>
  </div>
));

ModalContent.displayName = 'Modal.Content';

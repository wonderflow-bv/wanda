import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';
import { AutoFocusInside } from 'react-focus-on';

import * as styles from './modal-content.module.css';

export type ModalContentProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set Modal content vertically in the center on a mobile screen.
   */
  alignContentCenter?: boolean;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export type ModalContentComponent = React.ForwardRefExoticComponent<ModalContentProps>

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className,
  alignContentCenter = false,
  theme = 'light',
  ...otherProps
}, forwardedRef) => (
  <div
    className={clsx(styles.Content, className)}
    ref={forwardedRef}
    data-theme={theme}
    data-center-vertically={alignContentCenter}
    {...otherProps}
  >
    <AutoFocusInside>
      {children}
    </AutoFocusInside>
  </div>
));

ModalContent.displayName = 'Modal.Content';

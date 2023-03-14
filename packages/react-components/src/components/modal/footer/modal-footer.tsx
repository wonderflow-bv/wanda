import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';
import { AutoFocusInside } from 'react-focus-on';

import * as styles from './modal-footer.module.css';

export type ModalFooterProps = PropsWithChildren<PropsWithClass<{
  /**
   * Display the border at the top of the footer. This will be automatically dismissed
   * if no actions are provided.
   */
  hideBorder?: boolean;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export type ModalFooterComponent = React.ForwardRefExoticComponent<ModalFooterProps>

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(({
  children,
  className,
  hideBorder = false,
  theme = 'light',
  ...otherProps
}, forwardedRef) => (
  <div
    className={clsx(styles.Footer, className)}
    ref={forwardedRef}
    data-theme={theme}
    data-border-hidden={hideBorder || !children}
    {...otherProps}
  >
    <AutoFocusInside>
      {children}
    </AutoFocusInside>
  </div>
));

ModalFooter.displayName = 'Modal.Footer';

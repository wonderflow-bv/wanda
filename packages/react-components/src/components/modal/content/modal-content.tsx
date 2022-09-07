import clsx from 'clsx';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { AutoFocusInside } from 'react-focus-on';

import {
  Elevator, IconButton, Stack, Title, useOverlayContext,
} from '@/components';

import * as styles from './modal-content.module.css';

export type ModalContentProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the accessible title of the modal. This is used by screen readers to
   * announce the title of the modal when opened.
   */
  title: ReactNode;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className,
  title,
  theme = 'light',
  ...otherProps
}, forwardedRef) => {
  const { onClose, titleId } = useOverlayContext();

  return (
    <Elevator resting={4}>
      <div
        className={clsx(styles.Content, className)}
        ref={forwardedRef}
        data-theme={theme}
        {...otherProps}
      >
        <Stack vAlign="center" fill={false} hAlign="space-between" direction="row" className={styles.Header}>
          <Title responsive={false} level="5" id={titleId}>{title}</Title>
          {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="xmark" kind="flat" />}
        </Stack>
        <AutoFocusInside>
          {children}
        </AutoFocusInside>
      </div>
    </Elevator>
  );
});

ModalContent.displayName = 'Modal.Content';

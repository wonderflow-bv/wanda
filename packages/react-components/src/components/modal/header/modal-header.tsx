/*
 * Copyright 2022-2023 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import clsx from 'clsx';
import { forwardRef, PropsWithChildren, useMemo } from 'react';

import { IconButton, Stack, useOverlayContext } from '@/components';

import * as styles from './modal-header.module.css';

export type ModalHeaderProps = PropsWithChildren<PropsWithClass<{
  /**
   * Display the Close icon Button.
   */
  hideCloseButton?: boolean;
  /**
   * Display the border at the bottom of the header. This will be automatically dismissed
   * if no content is provided.
   */
  hideBorder?: boolean;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
}>>

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(({
  children,
  className,
  hideCloseButton = false,
  hideBorder = false,
  theme = 'light',
  ...otherProps
}, forwardedRef) => {
  const { onClose } = useOverlayContext();

  const isBorderHidden = useMemo(() => hideBorder || !children, [hideBorder, children]);

  return (
    <div
      className={clsx(styles.HeaderWrapper, className)}
      ref={forwardedRef}
      data-theme={theme}
      {...otherProps}
    >
      <Stack vAlign="center" fill={false} hAlign="space-between" direction="row" className={styles.Header} data-border-hidden={isBorderHidden}>
        <div>{children}</div>
        {(onClose && !hideCloseButton) && (
          <IconButton onClick={onClose} className={styles.CloseButton} icon="xmark" kind="flat" />
        )}
      </Stack>
    </div>
  );
});

ModalHeader.displayName = 'Modal.Header';

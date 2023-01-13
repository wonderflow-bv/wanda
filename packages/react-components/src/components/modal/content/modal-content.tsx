/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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

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
import {
  forwardRef, PropsWithChildren,
} from 'react';

import {
  Button,
  Elevator, Modal, Stack, Text, Title,
  // IconButton, Stack, Title, useOverlayContext,
} from '@/components';

import * as styles from './modal-content.module.css';

export type ModalContentProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the Modal Header title.
   */
  title?: React.ReactNode;
  /**
   * Set the Modal Header subtitle. This value depends on the presence of the title.
   */
  subtitle?: React.ReactNode;
  /**
   * Display the Close icon Button.
   */
  hideCloseButton?: boolean;
  /**
   * Display the border at the bottom of the header. This will be automatically dismissed
   * if no content is provided inside the Modal Header.
   */
  hideHeaderBorder?: boolean;
  /**
   * Display the border at the top of the footer. This will be automatically dismissed
   * if no actions are provided inside the Modal Footer.
   */
  hideFooterBorder?: boolean;
  /**
   * Set the Modal Body content.
   */
  content?: React.ReactNode;
  /**
   * Set the Primary Modal Action label.
   */
  primaryActionLabel?: React.ReactNode;
  /**
   * Set the Primary Modal Action behaviour.
   */
  primaryAction?: () => void;
  /**
   * Set the Secondary Modal Action label.
   */
  secondaryActionLabel?: React.ReactNode;
  /**
   * Set the Secondary Modal Action behaviour.
   */
  secondaryAction?: () => void;
  /**
   * Set a Custom Modal Action element.
   */
  tertiaryAction?: React.ReactNode;
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
  title,
  subtitle,
  hideCloseButton,
  hideHeaderBorder,
  hideFooterBorder,
  content,
  primaryActionLabel,
  primaryAction,
  secondaryActionLabel,
  secondaryAction,
  tertiaryAction,
  ...otherProps
}, forwardedRef) => {
  const hasActions = tertiaryAction ?? secondaryActionLabel ?? primaryActionLabel;
  return (
    <Elevator resting={4}>
      <div
        className={clsx(styles.Content, className)}
        ref={forwardedRef}
        data-theme={theme}
        {...otherProps}
      >
        {children ?? (
          <>
            <Modal.Header
              hideCloseButton={hideCloseButton}
              theme={theme}
              hideBorder={(!title ?? !subtitle) || hideHeaderBorder}
            >
              {title && <Title level="5">{title}</Title>}
              {(title && subtitle) && <Text size={14}>{subtitle}</Text>}
            </Modal.Header>

            {content && <Modal.Body theme={theme}>{content}</Modal.Body>}

            {hasActions && (
              <Modal.Footer theme={theme} hideBorder={hideFooterBorder}>
                <Stack direction="row" fill={false} hAlign="space-between">
                  {tertiaryAction && <div>{tertiaryAction}</div>}

                  <Stack direction="row" columnGap={8}>
                    {(secondaryActionLabel && secondaryAction) && (
                      <Button
                        kind="secondary"
                        dimension="regular"
                        onClick={secondaryAction}
                      >
                        {secondaryActionLabel}
                      </Button>
                    )}

                    {(primaryActionLabel && primaryAction) && (
                      <Button
                        kind="primary"
                        dimension="regular"
                        onClick={primaryAction}
                      >
                        {primaryActionLabel}
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Modal.Footer>
            )}
          </>
        )}
      </div>
    </Elevator>
  );
});

ModalContent.displayName = 'Modal.Content';

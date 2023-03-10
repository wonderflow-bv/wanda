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

import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { FocusOn } from 'react-focus-on';

import {
  Button, Elevator, OverlayContainer, OverlayContainerProps, Stack, Text, Title, useResponsiveContext,
} from '@/components';

// import { OverlayContainer } from '../overlay-container/overlay-container.module.css';
import { ModalBody, ModalBodyProps } from './body/modal-body';
import { ModalFooter, ModalFooterProps } from './footer/modal-footer';
import { ModalHeader, ModalHeaderProps } from './header/modal-header';
import * as styles from './modal.module.css';

export type ModalProps = PropsWithChildren<PropsWithClass<{
  /**
   * Display the Modal
   */
  isVisible: boolean;
  /**
   * Callback function to be called when the Modal is closed.
   */
  onCloseModal: () => void;
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
  /**
   * This enable the modal to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the modal.
   */
  closeOnClickOutside?: boolean;
}>> & OverlayContainerProps

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  Header: React.ForwardRefExoticComponent<ModalHeaderProps>;
  Body: React.ForwardRefExoticComponent<ModalBodyProps>;
  Footer: React.ForwardRefExoticComponent<ModalFooterProps>;
}

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
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
  isVisible = false,
  onCloseModal,
  closeOnClickOutside = true,
  ...otherProps
}, forwardedRef) => {
  const { matches } = useResponsiveContext();
  const hasActions = tertiaryAction ?? secondaryActionLabel ?? primaryActionLabel;

  const ModalAnimation = useMemo(() => ({
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        ease: cssEasingToArray(tkns.easing.entrance),
        duration: parseFloat(tkns.duration[300].replace('s', '')),
      },
    },
    hidden: {
      scale: matches.small ? 0.98 : 1,
      opacity: matches.small ? 0 : 1,
      y: matches.small ? 0 : '100%',
      transition: {
        ease: cssEasingToArray(tkns.easing.exit),
        duration: matches.small ? parseFloat(tkns.duration[200].replace('s', '')) : parseFloat(tkns.duration[500].replace('s', '')),
      },
    },
  }), [matches]);

  return (
    <>
      {isVisible && (
        <OverlayContainer
          onClose={onCloseModal}
          overlayColor={otherProps.overlayColor}
          root={otherProps.root}
          index={otherProps.index}
          obfuscate={otherProps.obfuscate}
        >
          <div
            aria-modal="true"
            aria-labelledby={(typeof title === 'string') ? title : 'modal-label'}
            className={clsx(styles.Modal, className)}
            ref={forwardedRef}
            {...otherProps}
          >
            <FocusOn
              onClickOutside={closeOnClickOutside ? onCloseModal : undefined}
              onEscapeKey={onCloseModal}
            >
              <LazyMotion features={domMax}>
                <m.div
                  role="dialog"
                  variants={ModalAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={styles.Container}
                >
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

                                <Stack direction="row" columnGap={16}>
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
                </m.div>
              </LazyMotion>
            </FocusOn>
          </div>
        </OverlayContainer>
      )}
    </>
  );
}) as ModalComponent;

Modal.displayName = 'Modal';
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

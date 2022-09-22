/*
 * Copyright 2022 Wonderflow
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

import { useOverlayContext, useResponsiveContext } from '@/components';

import { ModalContent, ModalContentProps } from './content/modal-content';
import * as styles from './modal.module.css';

export type ModalProps = PropsWithChildren<PropsWithClass<{
  /**
   * This enable the modal to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the modal.
   */
  closeOnClickOutside?: boolean;
}>>

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  Content: React.ForwardRefExoticComponent<ModalContentProps>;
}

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  className,
  closeOnClickOutside = true,
  ...otherProps
}, forwardedRef) => {
  const { titleId, onClose } = useOverlayContext();
  const { matches } = useResponsiveContext();

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(styles.Modal, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <FocusOn
        onClickOutside={closeOnClickOutside ? onClose : undefined}
        onEscapeKey={onClose}
      >
        <LazyMotion features={domMax}>
          <m.div
            variants={ModalAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.Container}
          >
            {children}
          </m.div>
        </LazyMotion>
      </FocusOn>
    </div>
  );
}) as ModalComponent;

Modal.displayName = 'Modal';
Modal.Content = ModalContent;

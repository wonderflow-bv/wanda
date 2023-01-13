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

import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { useKeyPress } from 'ahooks';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  CSSProperties, forwardRef, ReactNode, Ref,
} from 'react';
import { AutoFocusInside, FocusOn } from 'react-focus-on';

import {
  Elevator, IconButton, Stack, Title, useOverlayContext,
} from '@/components';

import * as styles from './drawer.module.css';

export type DrawerProps = {
  /**
   * This enable the drawer to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the drawer.
   *
   * @important This property is considered only when `isModal` is `true`.
   */
  closeOnClickOutside?: boolean;
  /**
   * Set the accessible title of the drawer. This is used by screen readers to
   * announce the title of the drawer when opened.
   */
  title?: ReactNode;
  /**
   * Hide or show the drawer header which includes the title and the close button.
   * If you hide the title, make sure to add yuor own title element in order
   * to provide an accessible label to the drawer.
   */
  showHeader?: boolean;
  /**
   * Set the maximum width of the drawer, on mobile the drawer will be
   * automatically collapsed when the width is reached.
   */
  maxWidth?: string;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
  /**
   * Set the side on which the drawer will be positioned.
   */
  side?: 'left' | 'right';
  /**
   * Disable the modal behavior of the drawer.
   * If `false`, disable the prop `closeOnClickOutside` and
   * the page is not blocked when the drawer is open.
   */
  isModal?: boolean;
}

export const Drawer: FCChildrenClass<DrawerProps> = forwardRef(({
  children,
  className,
  closeOnClickOutside = true,
  showHeader = true,
  maxWidth = '400px',
  side = 'right',
  theme = 'light',
  isModal = true,
  title,
  ...otherProps
}, forwardedRef: Ref<HTMLDivElement>) => {
  const { titleId, onClose } = useOverlayContext();

  useKeyPress('esc', () => (!isModal && onClose) && onClose());

  const dynamicStyle: CSSProperties = {
    '--max-w': maxWidth,
  };

  const DrawerAnimation = {
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: parseFloat(tkns.duration[500].replace('s', '')),
      },
    },
    hidden: {
      x: side === 'right' ? '100%' : '-100%',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: parseFloat(tkns.duration[500].replace('s', '')),
      },
    },
  };

  return (
    <div
      role="dialog"
      aria-modal={isModal}
      data-theme={theme}
      aria-labelledby={titleId}
      className={clsx(styles.Drawer, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <FocusOn
        enabled={isModal}
        onClickOutside={closeOnClickOutside ? onClose : undefined}
        onEscapeKey={onClose}
      >
        <LazyMotion features={domMax}>
          <m.div
            variants={DrawerAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.Container}
            data-drawer-side={side}
          >
            <Elevator resting={4}>
              <div
                className={styles.Content}
                style={dynamicStyle}
                ref={forwardedRef}
                {...otherProps}
              >
                {(showHeader && title) && (
                  <Stack
                    vAlign="center"
                    hAlign="space-between"
                    direction="row"
                    className={styles.Header}
                    columnGap={24}
                  >
                    <Title responsive={false} level="6" id={titleId}>{title}</Title>
                    {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="xmark" kind="flat" />}
                  </Stack>
                )}
                <AutoFocusInside>
                  {children}
                </AutoFocusInside>
              </div>
            </Elevator>
          </m.div>
        </LazyMotion>
      </FocusOn>
    </div>
  );
});

Drawer.displayName = 'Drawer';

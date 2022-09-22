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

import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUIDSeed } from 'react-uid';

import { OverlayProvider } from '@/components';

import * as styles from './overlay-container.module.css';

export type OverlayContainerProps = {
  /**
   * The children to render inside the overlay container. This content
   * will be rendered in a React `portal`, which means that it will be
   * rendered outside of the DOM hierarchy of the parent component.
   */
  children: ReactNode;
  /**
   * Set the root element to render the overlay container into.
   */
  root?: HTMLElement;
  /**
   * Set the css `z-index` of the overlay container. This must be used only
   * if necessary.
   */
  index?: number;
  /**
   * Set the overlay style. This is used to obscure the content
   * behind the overlay if `obfuscate` is `true`. If set to `auto`, the overlay
   * color is determined by the global active theme (light or dark).
   */
  overlayColor?: 'light' | 'dark' | 'auto';
  /**
   * The callback function that is called when the overlay is closed.
   */
  onClose?: () => void;
  /**
   * Set the overlay to be obscuring the page content behind it.
   */
  obfuscate?: boolean;
}

export const OverlayContainer: FCChildren<OverlayContainerProps> = ({
  children,
  root = document.body,
  overlayColor = 'dark',
  index = 4,
  obfuscate = true,
  onClose,
}) => {
  const seedID = useUIDSeed();

  useEffect(() => {
    if (root.closest('[data-overlay-container]')) {
      throw new Error('An OverlayContainer must not be inside another container. Please change the root prop.');
    }
  }, [root]);

  const content = (
    <OverlayProvider onClose={onClose}>
      <AnimatePresence exitBeforeEnter>
        {children && (
          <div
            data-overlay-container
            data-overlay-container-obfuscate={obfuscate}
            className={styles.OverlayContainer}
            style={{ zIndex: index }}
          >
            <LazyMotion features={domMax}>
              {obfuscate && (
                <m.span
                  key={seedID('modal-backdrop')}
                  className={styles.Backdrop}
                  data-overlay-color={overlayColor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.95 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {children}
            </LazyMotion>
          </div>
        )}
      </AnimatePresence>
    </OverlayProvider>
  );
  return createPortal(content, root);
};

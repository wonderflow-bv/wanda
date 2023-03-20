/*
 * Copyright 2023 Wonderflow Design Team
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
    aria-label="Content"
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

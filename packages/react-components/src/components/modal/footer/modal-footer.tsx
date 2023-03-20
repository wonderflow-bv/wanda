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

import * as styles from './modal-footer.module.css';

export type ModalFooterProps = PropsWithChildren<PropsWithClass<{
  /**
   * Hide the border at the top of the footer. This will be automatically dismissed
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
    aria-label="Footer"
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

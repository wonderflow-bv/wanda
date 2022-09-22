/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import * as styles from './selection-controls.module.css';

export type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Set the size of the toggle.
   */
  dimension?: 'regular' | 'small';
  /**
   * Callback function to be called when is toggled.
   * A parameter `ChangeEvent<HTMLInputElement>` is passed with the event details
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  className,
  disabled,
  dimension = 'regular',
  onChange,
  ...otherProps
}, forwardedRef) => (
  <input
    type="checkbox"
    disabled={disabled}
    aria-disabled={disabled}
    data-control-dimension={dimension}
    onChange={onChange}
    className={clsx(styles.Toggle, className)}
    ref={forwardedRef}
    {...otherProps}
  />
));

Toggle.displayName = 'Toggle';

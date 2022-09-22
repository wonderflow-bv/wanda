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

import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import * as styles from './selection-controls.module.css';

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
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

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className,
  disabled,
  dimension = 'regular',
  onChange,
  hidden,
  ...otherProps
}, forwardedRef) => (
  <LazyMotion features={domAnimation} strict>
    <m.span
      className={clsx(styles.InputWrapper, className)}
      whileTap={{ scale: 1.15 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
      data-radio-control={hidden}
    >
      <input
        type="radio"
        disabled={disabled}
        aria-disabled={disabled}
        data-control-dimension={dimension}
        onChange={onChange}
        className={styles.RadioInput}
        ref={forwardedRef}
        hidden={hidden}
        {...otherProps}
      />
    </m.span>
  </LazyMotion>
));

Radio.displayName = 'Radio';

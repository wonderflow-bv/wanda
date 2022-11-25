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
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useMemo, useRef,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Stack, Text } from '@/components';

import * as styles from './selection-controls.module.css';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Set the indeterminate state. This state is used to indicate that the checkbox is partially checked.
   * Is used when a subset of the options are selected but not all of them.
   */
  indeterminate?: boolean;
  /**
   * Define the accessible label of the input. While this is not
   * mandatory, an input should always have a label. If not using this property
   * you can bind a custom label to the input by using an id.
   */
  label?: string;
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  disabled,
  dimension = 'regular',
  onChange,
  indeterminate,
  id,
  label,
  hidden,
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);
  const seedID = useUIDSeed();
  const fieldID = useMemo(() => id ?? seedID('checkbox'), [id, seedID]);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        className={clsx(styles.InputWrapper, className)}
        whileTap={{ scale: 1.15 }}
        transition={{ duration: 0.3, ease: 'backOut' }}
        data-radio-control={hidden}
      >
        <Stack
          as="span"
          direction="row"
          columnGap={8}
          vAlign="center"
          fill={false}
          wrap
        >
          <input
            type="checkbox"
            disabled={disabled}
            aria-disabled={disabled}
            data-control-dimension={dimension}
            onChange={onChange}
            className={styles.CheckboxInput}
            ref={ref}
            hidden={hidden}
            id={fieldID}
            {...otherProps}
          />
          {label && (
            <Text
              as="label"
              aria-disabled={disabled}
              className={styles.Label}
              size={dimension === 'small' ? 14 : 16}
              htmlFor={fieldID}
            >
              {label}
            </Text>
          )}
        </Stack>
      </m.span>
    </LazyMotion>
  );
});

Checkbox.displayName = 'Checkbox';

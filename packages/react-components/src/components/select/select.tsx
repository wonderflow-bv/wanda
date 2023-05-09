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
  ChangeEvent, forwardRef, ReactNode, SelectHTMLAttributes,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Stack, Symbol, SymbolProps, Text,
} from '@/components';

import * as styles from './select.module.css';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Pass the children `option` elements. This is required.
   */
  children: ReactNode;
  /**
   * Change the default icon displayed on the side of the select.
   */
  icon?: SymbolProps['source'];
  /**
   * Set the accessible label for the select.
   */
  label?: ReactNode;
  /**
   * Set how many options can be selected at once.
   */
  kind?: 'single' | 'multiple';
  /**
   * Set the size of the select. This affects alsosize and style of the icon.
   */
  dimension?: 'regular' | 'small' | 'big';
  /**
   * Set disabled state. The select is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Callback function to be called when a new value is selected.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  children,
  className,
  disabled = false,
  icon = 'chevron-down',
  label,
  kind = 'single',
  dimension = 'regular',
  onChange,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();

  const iconSizes = {
    small: 12,
    regular: 16,
    big: 24,
  };

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Select, className)}
      data-select-is-multiple={kind === 'multiple'}
      data-select-has-label={Boolean(label)}
      data-select-dimension={dimension}
      aria-disabled={disabled}
      hAlign="start"
      vAlign="start"
      inline
      tabIndex={disabled ? 0 : undefined}
    >
      {label && <Text as="label" aria-disabled={disabled} className={styles.Label} variant={dimension === 'big' ? 'body-1' : 'body-2'} htmlFor={seedID('select')}>{label}</Text>}
      <div className={styles.FieldContainer}>
        <select
          disabled={disabled}
          className={styles.Field}
          id={seedID('select')}
          multiple={kind === 'multiple'}
          onChange={onChange}
          ref={forwardedRef}
          {...otherProps}
        >
          {children}
        </select>

        { kind === 'single' && (
          <Symbol
            className={styles.Icon}
            source={icon}
            dimension={iconSizes[dimension] as SymbolProps['dimension']}
          />
        ) }
      </div>
    </Stack>
  );
});

Select.displayName = 'Select';

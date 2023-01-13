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

import clsx from 'clsx';
import {
  forwardRef, InputHTMLAttributes, useCallback, useMemo, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Stack, Symbol, SymbolProps, Text, Textfield,
} from '@/components';

import * as styles from './slider.module.css';

export type SliderProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set the minimum value of the slider. This value must be lower than `max`.
   */
  min?: number;
  /**
   * Set the maximum value of the slider. This value must be higher than `min`.
   */
  max?: number;
  /**
   * Set the step value of the slider.
   * This allows the user to select a value in increments of `step`.
   */
  step?: number;
  /**
   * Callback function to be called when the value is changed.
   * A parameter `number` is passed to get the new value.
   */
  onInput?: (value: number) => void;
  /**
   * Set the initial value of the slider.
   */
  defaultValue?: number;
  /**
   * Show or hide the values beside the slider.
   */
  showValues?: boolean;
  /**
   * Add an icon representing the minimum value.
   * This is only available when `showValues` is `false`.
   */
  iconMin?: SymbolProps['source'];
  /**
   * Add an icon representing the maximum value.
   * This is only available when `showValues` is `false`.
   */
  iconMax?: SymbolProps['source'];
  /**
   * Set the size of the slider.
   */
  dimension?: 'small' | 'regular';
  /**
   * Define the accessible label of the input. While this is not
   * mandatory, an input should always have a label. If not using this property
   * you can bind a custom label to the input by using an id.
   */
  label?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(({
  min = 0,
  max = 100,
  step,
  onInput,
  className,
  defaultValue = 0,
  dimension = 'regular',
  showValues,
  iconMin,
  iconMax,
  disabled,
  label,
  id,
  ...otherProps
}, forwardedRef) => {
  const [value, setValue] = useState<number>(defaultValue);
  const isSmall = dimension === 'small';
  const handleInput = useCallback(
    ({ currentTarget }) => {
      onInput?.(currentTarget.valueAsNumber);
      setValue(currentTarget.valueAsNumber);
    },
    [onInput],
  );

  const seedID = useUIDSeed();
  const fieldID = useMemo(() => id ?? seedID('slider'), [id, seedID]);

  return (
    <Stack direction="column" rowGap={8}>
      {label && <Text as="label" size={isSmall ? 14 : 16} className={styles.Label} aria-disabled={disabled} htmlFor={fieldID}>{label}</Text>}

      <Stack
        direction="row"
        vAlign="center"
        columnGap={8}
        className={clsx(styles.Slider, className)}
        data-slider-dimension={dimension}
      >
        {showValues && <Text as="span" size={isSmall ? 14 : 16} weight="bold" textAlign="end" className={styles.Value} aria-disabled={disabled}>{min}</Text>}
        {(iconMin && !showValues) && (
          <Symbol
            source={iconMin}
            dimension={isSmall ? 16 : 24}
            className={styles.Icon}
            aria-disabled={disabled}
          />
        )}

        <input
          ref={forwardedRef}
          className={styles.Input}
          type="range"
          min={min}
          max={max}
          defaultValue={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
          step={step}
          onInput={handleInput}
          disabled={disabled}
          id={fieldID}
          {...otherProps}
        />

        {showValues && <Text as="span" size={isSmall ? 14 : 16} weight="bold" className={styles.Value} aria-disabled={disabled}>{max}</Text>}
        {showValues && <Textfield readOnly dimension="small" size={String(max).length} value={value} disabled={disabled} />}
        {(iconMax && !showValues) && (
          <Symbol
            source={iconMax}
            dimension={isSmall ? 16 : 24}
            className={styles.Icon}
            aria-disabled={disabled}
          />
        )}
      </Stack>
    </Stack>
  );
});

Slider.displayName = 'Slider';

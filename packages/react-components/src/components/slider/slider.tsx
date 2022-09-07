import clsx from 'clsx';
import {
  forwardRef, InputHTMLAttributes, useCallback, useState,
} from 'react';

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

  return (
    <Stack
      direction="row"
      vAlign="center"
      columnGap={8}
      className={clsx(styles.Slider, className)}
      data-slider-dimension={dimension}
    >
      {showValues && <Text as="span" size={isSmall ? 14 : 16} weight="bold" textAlign="end" className={styles.Value}>{min}</Text>}
      {(iconMin && !showValues) && <Symbol source={iconMin} dimension={isSmall ? 16 : 24} />}

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
        step={step}
        onInput={handleInput}
        {...otherProps}
      />

      {showValues && <Text as="span" size={isSmall ? 14 : 16} weight="bold" className={styles.Value}>{max}</Text>}
      {showValues && <Textfield readOnly dimension="small" size={String(max).length} value={value} className={styles.CurrentValue} />}
      {(iconMax && !showValues) && <Symbol source={iconMax} dimension={isSmall ? 16 : 24} />}
    </Stack>
  );
});

Slider.displayName = 'Slider';

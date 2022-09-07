import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useRef,
} from 'react';

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
  hidden,
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);

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
        <input
          type="checkbox"
          disabled={disabled}
          aria-disabled={disabled}
          data-control-dimension={dimension}
          onChange={onChange}
          className={styles.CheckboxInput}
          ref={ref}
          hidden={hidden}
          {...otherProps}
        />
      </m.span>
    </LazyMotion>
  );
});

Checkbox.displayName = 'Checkbox';

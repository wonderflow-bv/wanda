import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import styles from './selection-controls.module.css';

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

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
  ...otherProps
}, forwardedRef) => (
  <LazyMotion features={domAnimation} strict>
    <m.span
      className={styles.InputWrapper}
      whileTap={{ scale: 1.15 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
    >
      <input
        type="radio"
        disabled={disabled}
        aria-disabled={disabled}
        data-control-dimension={dimension}
        onChange={onChange}
        className={clsx(styles.RadioInput, className)}
        ref={forwardedRef}
        {...otherProps}
      />
    </m.span>
  </LazyMotion>
));

Radio.displayName = 'Radio';

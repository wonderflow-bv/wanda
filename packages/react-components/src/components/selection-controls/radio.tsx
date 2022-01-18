import clsx from 'clsx'
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import styles from './selection-controls.module.css'

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Set the size of the toggle.
   */
  dimension?: 'regular' | 'small',
  /**
   * Callback function to be called when is toggled.
   * A parameter `ChangeEvent<HTMLInputElement>` is passed with the event details
   */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className,
  disabled,
  dimension = 'regular',
  onChange,
  ...otherProps
}, forwardedRef) => {
  return (
    <input
      type="radio"
      disabled={disabled}
      aria-disabled={disabled}
      data-control-dimension={dimension}
      onChange={onChange}
      className={clsx(styles.Radio, className)}
      ref={forwardedRef}
      {...otherProps}
    />
  )
})

Radio.displayName = 'Radio'

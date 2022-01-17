import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './base-field.module.css'
import { Polymorphic } from '../../..'
import clsx from 'clsx'

/**
 * @internal
 */
export type PrimitiveInputType = HTMLInputElement | HTMLTextAreaElement

/**
 * @internal
 */
export type BaseFieldProps = InputHTMLAttributes<PrimitiveInputType> & {
  invalid?: boolean;
}

/**
 * @internal
 */
type PolymorphicBaseField = Polymorphic.ForwardRefComponent<'input', BaseFieldProps>;

export const BaseField = forwardRef(({
  as: Wrapper = 'input',
  invalid,
  className,
  ...otherProps
}, forwardedRef) => {
  return (
    <Wrapper
      ref={forwardedRef}
      data-basefield-invalid={invalid}
      className={clsx(styles.BaseField, className)}
      {...otherProps}
    />
  )
}) as PolymorphicBaseField

BaseField.displayName = 'BaseField'

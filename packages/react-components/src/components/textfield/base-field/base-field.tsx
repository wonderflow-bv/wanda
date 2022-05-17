import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import { Polymorphic } from '../../..';
import styles from './base-field.module.css';

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
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    data-basefield-invalid={invalid}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolymorphicBaseField;

BaseField.displayName = 'BaseField';

import clsx from 'clsx';
import {
  forwardRef, InputHTMLAttributes,
} from 'react';

import { Polymorphic } from '../../..';
import * as styles from './base-field.module.css';

/**
 * @internal
 */
export type PrimitiveInputType = HTMLInputElement | HTMLTextAreaElement

/**
 * @internal
 */
export type BaseFieldProps<T = Record<string, unknown>> = InputHTMLAttributes<PrimitiveInputType> & {
  invalid?: boolean;
} & T

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
    ref={forwardedRef as any}
    data-basefield-invalid={invalid}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolymorphicBaseField;

BaseField.displayName = 'BaseField';

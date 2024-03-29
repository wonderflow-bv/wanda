import clsx from 'clsx';
import {
  ChangeEvent, CSSProperties, forwardRef, Ref, useCallback, useMemo, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  IconButton, IconButtonProps, Stack, Symbol, SymbolProps, Text,
} from '@/components';

import { BaseField, BaseFieldProps, PrimitiveInputType } from './base-field';
import * as styles from './textfield.module.css';

export type TextfieldProps<T = Record<string, unknown>> = BaseFieldProps<{
  /**
   * Set the icon to show on the left or right side of the input.
   */
  icon?: SymbolProps['source'];
  /**
   * Set in which side of the field the icon should be displayed.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Define the accessible label of the input. While this is not
   * mandatory, an input should always have a label. If not using this property
   * you can bind a custom label to the input by using an id.
   */
  label?: string;
  /**
   * Optional hint text field, it provides additional help or context
   * to the user, it is often used to explain the correct format of the textfield data.
   */
  message?: string;
  /**
   * Set the input type. The value can be anything that
   * is supported by the HTML input element.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
   */
  type?: string;
  /**
   * Set the input to be a textarea instead of a single line field.
   * This property completely changes the rendered element from an input to a textarea.
   */
  textarea?: boolean;
  /**
   * Set the size of the field
   */
  dimension?: 'regular' | 'small' | 'big';
  /**
   * Set the field into a readonly state. When readonly, the field value
   * cannot be edited but it can still be selected and copied.
   */
  readOnly?: boolean;
  /**
   * Set the field into a disabled state. When disabled, the field value cannot be
   * edited, selected or copied, but it can still be focused and navigated by AT.
   */
  disabled?: boolean;
  /**
   * The callback function that is called when the input value changes.
   */
  onChange?: (event: ChangeEvent<PrimitiveInputType>) => void;
  /**
   * Make the textfield full width, filling the available space.
   */
  fullWidth?: boolean;
  /**
   * Set a minimum number of rows for the textarea only.
   */
  minRows?: number;
  /**
   * Set a maximum number of rows for the textarea only. The rest of the content will be scrollable.
   */
  maxRows?: number;
}> & T

export const Textfield = forwardRef<PrimitiveInputType, TextfieldProps>(({
  children,
  className,
  disabled = false,
  icon,
  label,
  textarea,
  readOnly,
  invalid,
  id,
  iconPosition = 'right',
  dimension = 'regular',
  message,
  type,
  style,
  fullWidth,
  minRows = 4,
  maxRows = 6,
  onChange,
  ...otherProps
}: TextfieldProps, forwardedRef) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const seedID = useUIDSeed();
  const isPassword = type === 'password';
  const fieldID = useMemo(() => id ?? seedID('field'), [id, seedID]);

  const handlePasswordVisibility = useCallback(
    () => {
      setPasswordVisible(visibility => !visibility);
    },
    [],
  );

  const dynamicStyle: CSSProperties = {
    '--textarea-min-height': (minRows > 0) ? `${24 * minRows + 16 + 2}px` : 'unset',
    '--textarea-max-height': (maxRows > 0) ? `${24 * maxRows + 16 + 2}px` : 'unset',
    '--textarea-overflow-y': (maxRows > 0) ? 'scroll' : 'unset',
  };

  const iconSizes = {
    small: 12,
    regular: 16,
    big: 24,
  };

  const actionSizes = {
    small: 'small',
    regular: 'regular',
    big: 'big',
  };

  const commonProps = {
    readOnly,
    invalid: invalid && !disabled,
    disabled,
    onChange,
  };

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Textfield, className)}
      data-testid="Textfield"
      data-textfield-has-icon={isPassword || Boolean(icon)}
      data-textfield-icon-position={iconPosition}
      data-textfield-dimension={dimension}
      data-textfield-invalid={invalid && !disabled}
      data-textfield-fullwidth={fullWidth}
      aria-disabled={disabled}
      aria-invalid={invalid && !disabled}
      hAlign="stretch"
      vAlign="start"
      tabIndex={disabled ? 0 : undefined}
      style={style}
    >
      {label && <Text as="label" aria-disabled={disabled} className={styles.Label} variant={dimension === 'big' ? 'body-1' : 'body-2'} htmlFor={fieldID}>{label}</Text>}

      <div className={styles.FieldContainer}>
        {textarea
          ? (
            <BaseField
              ref={forwardedRef as Ref<HTMLTextAreaElement>}
              as="textarea"
              className={styles.Textarea}
              style={{ ...dynamicStyle }}
              id={fieldID}
              {...commonProps}
              {...otherProps}
            />
          )
          : (
            <BaseField
              className={styles.InputField}
              id={fieldID}
              ref={forwardedRef as Ref<HTMLInputElement>}
              type={isPasswordVisible ? 'text' : type}
              spellCheck={isPassword ? false : undefined}
              {...commonProps}
              {...otherProps}
            />
          )
          }
        {isPassword && (
          <IconButton
            className={styles.IconButton}
            dimension={actionSizes[dimension] as IconButtonProps['dimension']}
            onClick={handlePasswordVisibility}
            kind="flat"
            aria-label="Reveal password"
            data-testid="RevealIcon"
            icon={isPasswordVisible ? 'eye-slash' : 'eye'}
            // eslint-disable-next-line no-nested-ternary
            iconColor={disabled
              ? 'var(--global-disabled-foreground)'
              : invalid
                ? 'var(--highlight-red-foreground)'
                : 'var(--global-foreground)'}
            disabled={disabled}
          />
        )}

        { !textarea && icon && !isPassword && (
          <Symbol
            className={styles.Icon}
            source={icon}
            dimension={iconSizes[dimension] as SymbolProps['dimension']}
            aria-disabled={disabled}
            fill={disabled ? 'var(--global-disabled-foreground)' : 'currentcolor'}
          />
        )}
      </div>

      {message && <Text as="label" color={(invalid && !disabled) ? 'danger' : undefined} aria-disabled={disabled} className={styles.Label} variant={dimension === 'big' ? 'body-2' : 'body-3'}>{message}</Text>}

    </Stack>
  );
});

Textfield.displayName = 'Textfield';

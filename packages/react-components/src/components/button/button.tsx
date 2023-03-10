/*
 * Copyright 2022-2023 Wonderflow Design Team
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
  Children, cloneElement, forwardRef, isValidElement, MouseEvent, ReactElement, useCallback,
} from 'react';

import {
  Polymorphic, Spinner,
  Symbol, SymbolProps,
} from '@/components';

import * as styles from './button.module.css';

export type ButtonProps = {
  /**
   * Set the style of the button.
   * When `disabled` this property is overwritten.
   */
  kind?: 'primary' | 'secondary' | 'flat';
  /**
   * Set the size of the button.
   */
  dimension?: 'regular' | 'small' | 'big';
  /**
   * Make the button full width, filling the available space.
   */
  fullWidth?: boolean;
  /**
   * Define the icon to use.
   */
  icon?: SymbolProps['source'];
  /**
   * Set the position of the icon. Used only when icon is defined.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Override the color of the icon. Used only when icon is defined.
   */
  iconColor?: string;
  /**
   * Set disabled state. The button is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Pass the HTML attribute `type` to the button.
   * If not specified, the type is always 'button' when rendered as `<button>.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Set the loading state and show a spinner.
   */
  busy?: boolean;
  /**
   * Set the pressed state and add required aria attributes.
   */
  pressed?: boolean;
  /**
   * Callback function to be called when the button is pressed.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export type PolymorphicButton = Polymorphic.ForwardRefComponent<'button', ButtonProps>;

export const Button = forwardRef((
  {
    kind = 'primary',
    dimension = 'regular',
    className,
    children,
    fullWidth,
    icon,
    disabled,
    iconPosition = 'left',
    iconColor,
    type = 'button',
    pressed,
    onClick,
    busy,
    as: Wrapper = 'button',
    ...otherProps
  }, forwardedRef,
) => {
  const handleClick = useCallback(
    () => (event: any) => {
      if (!disabled && onClick) onClick(event);
      if (disabled) event.preventDefault();
    },
    [disabled, onClick],
  );

  const iconSize = {
    big: 18,
    regular: 16,
    small: 12,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      type={Wrapper === 'button' ? type : undefined}
      className={clsx(styles.Button, className)}
      data-testid="Button"
      data-button-icon-position={iconPosition}
      data-button-dimension={dimension}
      data-button-kind={kind}
      data-button-fullwidth={fullWidth}
      aria-disabled={disabled}
      aria-busy={busy}
      aria-pressed={pressed}
      aria-live={busy ? 'polite' : undefined}
      onClick={handleClick()}
      {...otherProps}
    >
      {icon && (
        <Symbol
          source={icon}
          fill={iconColor}
          weight="solid"
          dimension={iconSize[dimension] as SymbolProps['dimension']}
        />
      )}
      {(children && busy) ? <span>{children}</span> : children}
      {busy && (
        <span className={styles.SpinnerIndicator}>
          <Spinner dimension={dimension} />
        </span>
      )}
    </Wrapper>
  );
}) as PolymorphicButton;

export type ButtonsGroupProps = PropsWithClass & Pick<ButtonProps, 'dimension' | 'kind'>

export const ButtonsGroup: FCChildren<ButtonsGroupProps> = ({
  children,
  className,
  kind,
  dimension = 'regular',
}) => (
  <div className={clsx(styles.ButtonsGroup, className)}>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child as ReactElement,
      {
        kind,
        dimension,
      },
    ))}
  </div>
);

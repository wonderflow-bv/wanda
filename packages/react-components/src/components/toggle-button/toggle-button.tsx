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
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  forwardRef, useCallback, useEffect, useState,
} from 'react';
import { Except } from 'type-fest';

import {
  IconButton, IconButtonProps, Polymorphic,
  Symbol, SymbolProps,
} from '@/components';

import * as styles from './toggle-button.module.css';

type OmitIcon<T = Record<string, unknown>> = T extends IconButtonProps ? Except<T, 'icon'> : never;

export type ToggleButtonProps<T = Record<string, unknown>> = OmitIcon & PropsWithClass<{
  /**
   * Set the icon to show when the button is resting.
   */
  restingIcon: IconButtonProps['icon'];
  /**
   * Set the icon to show when the button is pressed/active.
   */
  pressedIcon?: IconButtonProps['icon'];
  /**
   * Set the pressed state of the button. If `pressedIcon` is set,
   * the icon will be shown instead of the resting icon.
   */
  pressed?: boolean;
}> & T

type PolymorphicToggleButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof IconButton>,
ToggleButtonProps<Polymorphic.OwnProps<typeof IconButton>>
>;

const scaleAnimation = {
  scaleIn: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.34, 1],
      delay: 0,
    },
  },
  scaleOut: {
    scale: 0,
    transition: {
      duration: 0.2,
      ease: [0.3, 0.07, 1, 1],
      delay: 0,
    },
  },
};

export const ToggleButton = forwardRef(({
  className,
  restingIcon,
  pressedIcon,
  dimension,
  kind,
  disabled,
  iconColor,
  pressed = false,
  squared = false,
  onClick,
  ...otherProps
}, forwardedRef) => {
  const [isPressed, setIsPressed] = useState<boolean>(pressed);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, [pressed]);

  const handleClick = useCallback(
    (event) => {
      setIsPressed(!isPressed);
      onClick?.(event);
    },
    [onClick, isPressed],
  );

  const renderIcon = useCallback(
    (icon, dimension) => {
      const iconSize: Record<string, SymbolProps['dimension']> = {
        big: 24,
        regular: 16,
        small: 12,
      };

      return (<Symbol source={icon} dimension={iconSize[dimension]} />);
    },
    [],
  );

  return (
    <IconButton
      as="button"
      ref={forwardedRef as any}
      dimension={dimension}
      aria-pressed={isPressed}
      kind={kind}
      disabled={disabled}
      onClick={handleClick}
      data-icon-button-squared={squared}
      className={clsx(styles.ToggleButton, className)}
      data-testid="ToggleButton"
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        {isPressed && pressedIcon
          ? (
            <m.span
              key="pressedIcon"
              variants={scaleAnimation}
              initial={isFirstRender && isPressed ? false : 'scaleOut'}
              animate="scaleIn"
            >
              {renderIcon(pressedIcon, dimension)}
            </m.span>
          )
          : restingIcon && (
            <m.span
              key="restingIcon"
              variants={scaleAnimation}
              initial={isFirstRender && !isPressed ? false : 'scaleOut'}
              animate="scaleIn"
            >
              {renderIcon(restingIcon, dimension)}
            </m.span>
          )
      }
      </LazyMotion>
    </IconButton>
  );
}) as PolymorphicToggleButton;

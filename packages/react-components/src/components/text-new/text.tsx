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
  cloneElement, CSSProperties, forwardRef, isValidElement, ReactElement,
  useMemo,
} from 'react';

import {
  ChipProps, Polymorphic,
  SymbolProps,
} from '@/components';

import * as styles from './text.module.css';

type VariantDisplay = 'display-1' | 'display-2' | 'display-3' | 'display-4';
type VariantHeading = 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6';
type VariantSubtitle = 'subtitle-1' | 'subtitle-2';
type VariantBody = 'body-1' | 'body-2' | 'body-3';
export type TextVariants = VariantDisplay | VariantHeading | VariantSubtitle | VariantBody;

type DecoratorSize = Record<VariantBody, {
  chip: {
    small: 'small' | 'regular' | 'big';
    medium: 'small' | 'regular' | 'big';
    big: 'small' | 'regular' | 'big';
  };
  icon: {
    small: number;
    regular: number;
    big: number;
  };
}>;

const decoratorSizeConfig: DecoratorSize = {
  'body-1': {
    chip: {
      small: 'small',
      medium: 'regular',
      big: 'big',
    },
    icon: {
      small: 16,
      regular: 18,
      big: 18,
    },
  },
  'body-2': {
    chip: {
      small: 'small',
      medium: 'regular',
      big: 'big',
    },
    icon: {
      small: 12,
      regular: 16,
      big: 18,
    },
  },
  'body-3': {
    chip: {
      small: 'small',
      medium: 'regular',
      big: 'big',
    },
    icon: {
      small: 12,
      regular: 12,
      big: 12,
    },
  },
};

export type TextProps = {
  /**
   * Apply typographic style of text
   */
  variant?: TextVariants;
  /**
   * Set the sentiment of the text.
   */
  color?: 'positive' | 'informative' | 'danger' | 'warning';
  /**
   * Set the text alignment of the text. This is a logical property
   * based on the direction of the text.
   */
  textAlign?: 'start' | 'center' | 'end' | 'justify';
  /**
   * Disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  preventResponsive?: boolean;
  /**
   * Truncate text overflow with ellipsis.
   */
  truncate?: boolean;
  /**
   * Place a Decorator before the string. This is required to be a Symbol or a Chip component.
   */
  decoratorStart?: React.ReactElement<SymbolProps> | React.ReactElement<ChipProps>;
  /**
   * Place a Decorator after the string. This is required to be a Symbol or a Chip component.
   */
  decoratorEnd?: React.ReactElement<SymbolProps> | React.ReactElement<ChipProps>;
  /**
   * Set the size of the decoration according to the variant.
   */
  decoratorSize?: 'small' | 'regular' | 'big';
}

type PolymorphicText = Polymorphic.ForwardRefComponent<'p', TextProps>;

export const Text = forwardRef(({
  children,
  className,
  variant = 'body-1',
  color,
  textAlign = 'start',
  as: Wrapper = 'p',
  preventResponsive = false,
  truncate = false,
  decoratorStart,
  decoratorEnd,
  decoratorSize = 'regular',
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--t-align': textAlign,
  };

  const isBodyVariant = useMemo(() => ['body-1', 'body-2', 'body-3'].some(b => b === variant), [variant]);
  const hasStart = useMemo(() => !!(isBodyVariant && decoratorStart), [decoratorStart, isBodyVariant]);
  const hasEnd = useMemo(() => !!(isBodyVariant && decoratorEnd), [decoratorEnd, isBodyVariant]);
  const iconSize = useMemo(() => (isBodyVariant
    ? decoratorSizeConfig[variant as VariantBody].icon[decoratorSize]
    : undefined),
  [decoratorSize, isBodyVariant, variant]);

  const dec = decoratorStart;
  console.debug(dec?.type.render.displayName);
  const isDecoratorStartIcon = decoratorStart?.type.displayName === 'Symbol';
  const decoratorStartDimension = isDecoratorStartIcon ? iconSize : decoratorSize;

  const isDecoratorEndIcon = decoratorEnd?.type.displayName === 'Symbol';
  const decoratorEndDimension = isDecoratorEndIcon ? iconSize : decoratorSize;

  return (
    <Wrapper
      ref={forwardedRef}
      data-text-variant={variant}
      data-text-color={color}
      data-text-prevent-responsive={preventResponsive}
      data-text-truncate={truncate}
      data-text-decorator={hasStart || hasEnd}
      className={clsx(styles.Text, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {hasStart
          && isValidElement(decoratorStart)
          && cloneElement(decoratorStart as ReactElement,
            {
              ...decoratorStart.props as React.ComponentPropsWithRef<
              React.ElementType<SymbolProps> | React.ElementType<ChipProps>>,
              dimension: decoratorStartDimension,
            })}

      {children}

      {hasEnd
          && isValidElement(decoratorEnd)
          && cloneElement(decoratorEnd as ReactElement,
            {
              ...decoratorEnd.props as React.ComponentPropsWithRef<
              React.ElementType<SymbolProps> | React.ElementType<ChipProps>>,
              dimension: decoratorEndDimension,
            })}
    </Wrapper>
  );
}) as PolymorphicText;

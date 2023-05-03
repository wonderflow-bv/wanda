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
  Children,
  cloneElement, CSSProperties, forwardRef, isValidElement, ReactElement,
  useCallback, useMemo,
} from 'react';
import slugify from 'slugify';

import {
  ChipProps, Polymorphic,
  Symbol,
  SymbolProps,
  useSSR,
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
    regular: 'small' | 'regular' | 'big';
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
      regular: 'regular',
      big: 'big',
    },
    icon: {
      small: 16,
      regular: 16,
      big: 18,
    },
  },
  'body-2': {
    chip: {
      small: 'small',
      regular: 'regular',
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
      regular: 'small',
      big: 'small',
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
   * Prevent text from overflowing.
   */
  breakWord?: boolean;
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
  /**
   * Auto generate anchor link inside the heading. This should be
   * used only when the title define a new content section and has
   * a semantic tag.
   *
   * @default: `false`
   */
  anchor?: boolean;
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
  breakWord = false,
  decoratorStart,
  decoratorEnd,
  decoratorSize = 'regular',
  anchor = false,
  style,
  id,
  ...otherProps
}, forwardedRef) => {
  const { isBrowser } = useSSR();

  const dynamicStyle: CSSProperties = {
    '--t-align': textAlign,
  };

  const isBodyVariant = useMemo(() => ['body-1', 'body-2', 'body-3'].some(b => b === variant), [variant]);
  const isTitle = useMemo(() => !['body-1', 'body-2', 'body-3', 'subtitle-1', 'subtitle-2'].some(b => b === variant), [variant]);

  const hasStart = useMemo(() => !!(isBodyVariant && decoratorStart), [decoratorStart, isBodyVariant]);
  const hasEnd = useMemo(() => !!(isBodyVariant && decoratorEnd), [decoratorEnd, isBodyVariant]);

  const isDecoratorAnIcon = (d: React.ReactElement<SymbolProps> | React.ReactElement<ChipProps>) => Object.prototype.hasOwnProperty.call(d?.props, 'source');

  const isDecoratorStartAnIcon = hasStart
  && isDecoratorAnIcon(decoratorStart as React.ReactElement<SymbolProps> | React.ReactElement<ChipProps>);

  const isDecoratorEndAnIcon = hasEnd
  && isDecoratorAnIcon(decoratorEnd as React.ReactElement<SymbolProps> | React.ReactElement<ChipProps>);

  const getDecoratorSize = (w: 'start' | 'end') => {
    if (w === 'start') {
      return isDecoratorStartAnIcon
        ? decoratorSizeConfig[variant as VariantBody].icon[decoratorSize]
        : decoratorSizeConfig[variant as VariantBody].chip[decoratorSize];
    }

    return isDecoratorEndAnIcon
      ? decoratorSizeConfig[variant as VariantBody].icon[decoratorSize]
      : decoratorSizeConfig[variant as VariantBody].chip[decoratorSize];
  };

  const decoratorStartDimension = hasStart ? getDecoratorSize('start') : 'regular';
  const decoratorEndDimension = hasEnd ? getDecoratorSize('end') : 'regular';

  const getTextFromChildren = useCallback(() => {
    let label = '';

    Children.map(children, (child) => {
      if (typeof child === 'string') {
        label += child;
      }
    });

    return label;
  }, [children]);

  const generatedID = slugify(String(id ?? getTextFromChildren()), { lower: true });

  const saveToClipboard = async () => {
    if (isBrowser) {
      console.debug('***', `${window.location.href}#${generatedID}`);
      await navigator.clipboard.writeText(`${window.location.href}#${generatedID}`);
    }
  };

  return (
    <Wrapper
      ref={forwardedRef}
      data-text-variant={variant}
      data-text-color={color}
      data-text-prevent-responsive={preventResponsive}
      data-text-truncate={truncate}
      data-text-decorator={hasStart || hasEnd}
      data-text-break-word={breakWord}
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

      {(anchor && isTitle) && (
        <a href={`#${generatedID}`} onClick={saveToClipboard} className={styles.Anchor} rel="noreferrer">
          <Symbol source="link" weight="duotone" dimension={24} />
        </a>
      )}

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

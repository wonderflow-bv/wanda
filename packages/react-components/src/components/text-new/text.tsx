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
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic } from '@/components';

import * as styles from './text.module.css';

type VariantDisplay = 'display-1' | 'display-2' | 'display-3' | 'display-4';
type VariantHeading = 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6';
type VariantSubtitle = 'subtitle-1' | 'subtitle-2';
type VariantBody = 'body-1' | 'body-2' | 'body-3';

export type TextProps = {
  /**
   * Apply typographic style of text
   */
  variant?: VariantDisplay | VariantHeading | VariantSubtitle | VariantBody;
  /**
   * Set the sentiment of the text.
   */
  color?: 'positive' | 'informative' | 'danger' | 'warning';
  /**
   * Set the font weight of the text. The values are
   * consistent with the typography system.
   */
  fontWeight?: 'regular' | 'semibold' | 'bold';
  /**
   * Set the maximum width of the text after which it will wrap.
   */
  maxWidth?: string;
  /**
   * Set the text alignment of the text. This is a logical property
   * based on the direction of the text.
   */
  textAlign?: 'start' | 'center' | 'end' | 'justify' | 'inherit';
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  responsive?: boolean;
}

type PolymorphicText = Polymorphic.ForwardRefComponent<'p', TextProps>;

export const Text = forwardRef(({
  children,
  className,
  variant,
  color,
  fontWeight,
  maxWidth,
  textAlign = 'inherit',
  as: Wrapper = 'p',
  responsive = true,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--max-w': maxWidth,
    '--t-align': textAlign,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      data-text-variant={variant}
      data-text-weight={fontWeight}
      data-text-color={color}
      data-text-responsive={responsive}
      className={clsx(styles.Text, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicText;

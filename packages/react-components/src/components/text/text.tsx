/*
 * Copyright 2022 Wonderflow
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

import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic } from '@/components';

import * as styles from './text.module.css';

export type TextProps = {
  /**
   * Set the dimension of the text from one of
   * the typography system values
   */
  size?: TokensTypes['font']['size'];
  /**
   * Set the sentiment of the text.
   */
  sentiment?: 'positive' | 'informative' | 'danger' | 'warning';
  /**
   * Set the dimmed color of the text. To keep readability and contrast,
   * you can only use dimmed colors `5`, `6`, and `7`.
   */
  dimmed?: 5 | 6 | 7;
  /**
   * Set the font weight of the text. The values are
   * consistent with the typography system.
   */
  weight?: 'thin' | 'bold';
  /**
   * Set the maximum width of the text after which it will wrap.
   */
  maxWidth?: string;
  /**
   * Set the text alignment of the text. This is a logical property
   * based on the direction of the text.
   */
  textAlign?: 'start' | 'center' | 'end';
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  responsive?: boolean;
  /**
   * Set the text line-height of the text. This uses
   * the predefined tokens from the typography system.
   */
  lineHeight?: 'none' | 'small' | 'large';
}

type PolymorphicText = Polymorphic.ForwardRefComponent<'p', TextProps>;

export const Text = forwardRef(({
  children,
  className,
  size,
  sentiment,
  dimmed,
  weight,
  maxWidth,
  textAlign = 'start',
  as: Wrapper = 'p',
  responsive = true,
  lineHeight = 'large',
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
      data-text-size={size}
      data-text-weight={weight}
      data-text-sentiment={sentiment}
      data-text-dimmed={dimmed}
      data-text-line-height={lineHeight}
      data-text-responsive={size === 14 ? 14 : responsive}
      className={clsx(styles.Text, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicText;

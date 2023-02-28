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

import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic } from '@/components';

import * as styles from './stack.module.css';

export type StackProps = {
  /**
   * Add a gap between rows.
   */
  rowGap?: TokensTypes['space'];
  /**
   * Add a gap between columns.
   */
  columnGap?: TokensTypes['space'];
  /**
   * Display the element as inline-flex
   */
  inline?: boolean;
  /**
   * Wrap children whene there is no space for them.
   */
  wrap?: boolean;
  /**
   * Make the children grow to fill the available space instead
   * of being sized based on their content.
   */
  fill?: boolean;
  /**
   * Set the vertical content placement instead of
   * growing to fill the available space.
   */
  vAlign?: string;
  /**
   * Set the horizontal content placement instead of
   * growing to fill the available space.
   */
  hAlign?: string;
  /**
   * Set the horizontal padding (left/right)
   */
  hPadding?: TokensTypes['space'];
  /**
   * Set the vertical padding (top/bottom)
   */
  vPadding?: TokensTypes['space'];
  /**
   * Renderes children as rows or columns. The value can be one of the flex directions.
   * More info: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * Set a max width for the stack container.
   */
  maxWidth?: string;
}

type PolymorphicStack = Polymorphic.ForwardRefComponent<'div', StackProps>;

export const Stack = forwardRef(({
  children,
  className,
  rowGap,
  columnGap,
  as: Wrapper = 'div',
  inline = false,
  direction = 'column',
  wrap = false,
  fill = true,
  vAlign = 'initial',
  hAlign = 'initial',
  hPadding,
  vPadding,
  style,
  maxWidth,
  ...otherProps
}, forwardedRef) => {
  const alignmentTemplate = (prop: string) => {
    if (prop.includes('start') || prop.includes('end')) {
      return `flex-${prop}`;
    }

    return prop;
  };

  const computedStyle: CSSProperties = {
    '--r-gap': rowGap ? tkns.space[rowGap] : 0,
    '--c-gap': columnGap ? tkns.space[columnGap] : 0,
    '--v-align': vAlign && alignmentTemplate(vAlign),
    '--h-align': hAlign && alignmentTemplate(hAlign),
    '--v-padding': vPadding ? tkns.space[vPadding] : 0,
    '--h-padding': hPadding ? tkns.space[hPadding] : 0,
    '--max-w': maxWidth,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      style={{ ...computedStyle, ...style }}
      data-stack-inline={inline}
      data-stack-wrap={wrap}
      data-stack-direction={direction}
      data-stack-fill={fill}
      data-stack-has-padding={Boolean(hPadding ?? vPadding)}
      className={clsx(styles.Stack, className)}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicStack;

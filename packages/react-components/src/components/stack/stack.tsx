import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic } from '@/components';

import styles from './stack.module.css';

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
  ...otherProps
}, forwardedRef) => {
  const alignmentTemplate = (prop: string) => {
    if (prop.includes('start') || prop.includes('end')) {
      return `flex-${prop}`;
    }
    return prop;
  };

  const computedStyle: CSSProperties = {
    '--rGap': rowGap ? tkns.space[rowGap] : 0,
    '--cGap': columnGap ? tkns.space[columnGap] : 0,
    '--vAlign': vAlign && alignmentTemplate(vAlign),
    '--hAlign': hAlign && alignmentTemplate(hAlign),
    '--vPadding': vPadding ? tkns.space[vPadding] : 0,
    '--hPadding': hPadding ? tkns.space[hPadding] : 0,
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
      className={clsx(styles.Stack, styles.StackWrapper, className)}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicStack;

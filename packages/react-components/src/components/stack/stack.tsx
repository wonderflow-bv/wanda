import { CSSProperties, forwardRef } from 'react'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import { Polymorphic } from '../..'
import styles from './stack.module.css'
import clsx from 'clsx'

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
   * Place the content vertically centered instead of
   * growing to fill the available space.
   */
  verticalAlign?: string;
  /**
   * Place the content horizontally centered instead of
   * growing to fill the available space.
   */
  horizontalAlign?: string;
  /**
   * Set the horizontal padding (left/right)
   */
  horizontalPadding?: TokensTypes['space'];
  /**
   * Set the vertical padding (top/bottom)
   */
  verticalPadding?: TokensTypes['space'];
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
  verticalAlign = 'initial',
  horizontalAlign = 'initial',
  horizontalPadding,
  verticalPadding,
  style,
  ...otherProps
}, forwardedRef) => {
  const alignmentTemplate = (prop: string) => {
    if (prop.includes('start') || prop.includes('end')) {
      return `flex-${prop}`
    }
    return prop
  }

  const computedStyle: CSSProperties = {
    '--rGap': rowGap ? tkns.space[rowGap] : 0,
    '--cGap': columnGap ? tkns.space[columnGap] : 0,
    '--vAlign': verticalAlign && alignmentTemplate(verticalAlign),
    '--hAlign': horizontalAlign && alignmentTemplate(horizontalAlign),
    '--vPadding': verticalPadding ? tkns.space[verticalPadding] : 0,
    '--hPadding': horizontalPadding ? tkns.space[horizontalPadding] : 0
  }

  return (
    <Wrapper
      ref={forwardedRef}
      style={{ ...computedStyle, ...style }}
      data-stack-inline={inline}
      data-stack-wrap={wrap}
      data-stack-direction={direction}
      data-stack-fill={fill}
      data-stack-has-padding={Boolean(horizontalPadding || verticalPadding)}
      className={clsx(styles.Stack, styles.StackWrapper, className)}
      {...otherProps}
    >
      {children}
    </Wrapper>
  )
}) as PolymorphicStack

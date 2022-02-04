import { CSSProperties, forwardRef } from 'react'
import { Polymorphic } from '@/components'
import styles from './text.module.css'
import clsx from 'clsx'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'

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
    '--maxW': maxWidth,
    '--tAlign': textAlign
  }

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
  )
}) as PolymorphicText

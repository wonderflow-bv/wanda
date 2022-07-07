import clsx from 'clsx';
import { CSSProperties, forwardRef, ReactNode } from 'react';

import { Polymorphic } from '@/components';

import styles from './clamp-text.module.css';

export type ClampTextProps = {
  /**
   * The text content to be displayed and clamped
   */
  children: ReactNode;
  /**
   * Define how many lines the text should be clamped to.
   */
  rows?: number;
  /**
   * Show the full text when element is hovered with pointer.
   */
  expandOnHover?: boolean;
}

type PolymorphicClampText = Polymorphic.ForwardRefComponent<'span', ClampTextProps>;

export const ClampText = forwardRef(({
  className,
  children,
  rows = 1,
  style,
  expandOnHover,
  as: Wrapper = 'span',
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--r': rows,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.ClampText, className)}
      data-clamp-text-expand={expandOnHover}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicClampText;

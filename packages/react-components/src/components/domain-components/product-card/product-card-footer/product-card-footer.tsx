
import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic, Stack, StackProps } from '@/components';

export type PolymorphicProductCardFooter = Polymorphic.ForwardRefComponent<'div', StackProps>

export const ProductCardFooter = forwardRef(({
  as: Wrapper = 'div',
  children,
  className,
  style,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(className)}
    style={{ ...style }}
    {...otherProps}
  >
    {children && (
      <Stack hPadding={24} vPadding={16} {...otherProps}>
        {children}
      </Stack>
    )}
  </Wrapper>
)) as PolymorphicProductCardFooter;

ProductCardFooter.displayName = 'ProductCardFooter';

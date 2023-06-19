
import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  Polymorphic, Skeleton, Stack, StackProps,
} from '@/components';

export type ProductCardFooterProps = {
  /**
   *
   */
  isLoading?: boolean;
}

export type PolymorphicProductCardFooter = Polymorphic.ForwardRefComponent<'div', StackProps & ProductCardFooterProps>;

export const ProductCardFooter = forwardRef(({
  as: Wrapper = 'div',
  isLoading = false,
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
    <Stack hPadding={24} vPadding={16} {...otherProps}>
      {isLoading ? <Skeleton height="24px" style={{ lineHeight: '1.5rem' }} /> : children}
    </Stack>
  </Wrapper>
)) as PolymorphicProductCardFooter;

ProductCardFooter.displayName = 'ProductCardFooter';

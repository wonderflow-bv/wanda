
import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components';

export type ProductCardMediaProps = {
  source?: string;
}

export type PolymorphicProductCardMedia = Polymorphic.ForwardRefComponent<'div', ProductCardMediaProps>

export const ProductCardMedia = forwardRef(({
  as: Wrapper = 'div',
  source,
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
    {source
      && (
        <img
          src={source}
          alt="product"
          width="100%"
          height="auto"
        />
      )
    }
  </Wrapper>
)) as PolymorphicProductCardMedia;

ProductCardMedia.displayName = 'ProductCardMedia';

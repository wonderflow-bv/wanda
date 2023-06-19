
import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  AspectRatio, AspectRatioProps, Polymorphic, Skeleton,
} from '@/components';

import * as styles from './product-card-media.module.css';

export type ProductCardMediaProps = {
  source?: string;
  isLoading?: boolean;
} & Pick<AspectRatioProps, 'ratio'>

export type PolymorphicProductCardMedia = Polymorphic.ForwardRefComponent<'div', ProductCardMediaProps>

export const ProductCardMedia = forwardRef(({
  as: Wrapper = 'div',
  source,
  isLoading = false,
  className,
  style,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Media, className)}
    style={{ ...style }}
  >
    <AspectRatio ratio={otherProps.ratio || '1'}>

      {isLoading && (
        <Skeleton
          style={{ borderRadius: '0px', lineHeight: '2rem' }}
          width="inherit"
          height="inherit"
        />
      )}

      {source && !isLoading
      && (
        <img
          src={source}
          alt="product"
          width="auto"
          height="auto"
        />
      )
    }
    </AspectRatio>
  </Wrapper>
)) as PolymorphicProductCardMedia;

ProductCardMedia.displayName = 'ProductCardMedia';

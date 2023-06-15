import clsx from 'clsx';
import React, { forwardRef } from 'react';

import {
  Elevator,
  Polymorphic, Stack,
} from '@/components';

import * as styles from './product-card.module.css';
import { PolymorphicProductCardFooter, ProductCardFooter } from './product-card-footer/product-card-footer';
import { PolymorphicProductCardHeader, ProductCardHeader, ProductCardHeaderProps } from './product-card-header/product-card-header';
import { PolymorphicProductCardKpis, ProductCardKpis, ProductCardKpisProps } from './product-card-kpis/product-card-kpis';
import { PolymorphicProductCardMedia, ProductCardMedia, ProductCardMediaProps } from './product-card-media/product-card-media';

export type ProductCardProps = {
  /**
   * Set the direction of the component.
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Add a border to the card to increase its visual weight and contrast.
   */
  bordered?: boolean;
  /**
   * Change the background color of the card when it is hovered.
   */
  highlightOnHover?: boolean;
  /**
   * Add content on the footer.
   */
  footer?: React.ReactNode;
} & ProductCardKpisProps & ProductCardHeaderProps & ProductCardMediaProps;

type PolymorphicProductCard = Polymorphic.ForwardRefComponent<'div', ProductCardProps> & {
  Media: PolymorphicProductCardMedia;
  Kpis: PolymorphicProductCardKpis;
  Header: PolymorphicProductCardHeader;
  Footer: PolymorphicProductCardFooter;
};

export const ProductCard = forwardRef(({
  as: Wrapper = 'div',
  direction = 'vertical',
  footer,
  bordered = false,
  highlightOnHover = false,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef) => (
  <Elevator resting={1} hover={highlightOnHover ? 2 : undefined}>
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Card, className)}
      style={{ ...style }}
      data-card-bordered={bordered}
      data-card-highlight-hover={highlightOnHover}
      {...otherProps}
    >
      <Stack
        data-inner-element="ProductCard-Container"
        direction="row"
        className={styles.Row}
        fill={false}
      >
        <Stack
          direction={direction === 'vertical' ? 'column' : 'row'}
          className={styles.Direction}
          data-inner-element="ProductCard-Direction"
        >

          <ProductCard.Media {...otherProps} />

          <Stack
            rowGap={16}
            direction="column"
            data-inner-element="ProductCard-Content"
          >

            <ProductCard.Header {...otherProps} />
            <ProductCard.Kpis {...otherProps} />

            <Stack hPadding={24} data-inner-element="ProductCard-Children">
              {children}
            </Stack>

            <ProductCard.Footer data-inner-element="ProductCard-Footer">
              {footer}
            </ProductCard.Footer>
          </Stack>

        </Stack>

      </Stack>
    </Wrapper>
  </Elevator>
)) as PolymorphicProductCard;

ProductCard.displayName = 'ProductCard';
ProductCard.Media = ProductCardMedia;
ProductCard.Header = ProductCardHeader;
ProductCard.Kpis = ProductCardKpis;
ProductCard.Footer = ProductCardFooter;

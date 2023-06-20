import clsx from 'clsx';
import React, { forwardRef } from 'react';

import {
  Elevator,
  Polymorphic, Stack,
} from '@/components';

import * as styles from './product-card.module.css';
import { PolymorphicProductCardFooter, ProductCardFooter, ProductCardFooterProps } from './product-card-footer/product-card-footer';
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
   *
   */
  overlayActions?: React.ReactNode;
  /**
   *
   */
  menuActions?: React.ReactNode;
  /**
   * Add content on the footer.
   */
  footer?: React.ReactNode;
  /**
   *
   */
  isLoading?: boolean;
  /**
   *
   */
  onClick?: () => void;
} & ProductCardKpisProps & ProductCardHeaderProps & ProductCardMediaProps & ProductCardFooterProps;

type PolymorphicProductCard = Polymorphic.ForwardRefComponent<'div', ProductCardProps> & {
  Media: PolymorphicProductCardMedia;
  Kpis: PolymorphicProductCardKpis;
  Header: PolymorphicProductCardHeader;
  Footer: PolymorphicProductCardFooter;
};

export const ProductCard = forwardRef(({
  direction = 'vertical',
  footer,
  bordered = false,
  highlightOnHover = false,
  overlayActions,
  menuActions,
  onClick,
  isLoading,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef) => {
  const hasOverlay = !!(overlayActions && !menuActions && !onClick && !isLoading);
  const hasMenu = !!(menuActions && !overlayActions && !onClick);
  const hasHighlight = !!(onClick || highlightOnHover);

  return (
    <Elevator resting={1} hover={hasHighlight ? 2 : undefined}>
      <Stack
        ref={forwardedRef}
        className={clsx(styles.Card, className)}
        style={{ ...style }}
        data-card-bordered={bordered}
        data-card-highlight-hover={highlightOnHover}
        data-card-clickable={!!(!isLoading && onClick)}
        onClick={isLoading ? undefined : onClick}
      >
        <Stack
          data-inner-element="ProductCard-Container"
          direction="row"
          className={styles.Row}
          fill={false}
        >
          {hasOverlay && (
            <Stack direction="row" hPadding={24} vAlign="center" hAlign="center" className={styles.OverlayActions}>
              <Stack>
                {overlayActions}
              </Stack>
            </Stack>
          )}

          <Stack
            direction={direction === 'vertical' ? 'column' : 'row'}
            className={styles.Content}
            data-inner-element="ProductCard-Content"
          >

            <ProductCard.Media {...otherProps} isLoading={isLoading} data-inner-element="ProductCard-Media" />

            <Stack
              rowGap={16}
              direction="column"
            >

              <ProductCard.Header {...otherProps} isLoading={isLoading} menuActions={hasMenu && menuActions} />
              <ProductCard.Kpis {...otherProps} isLoading={isLoading} />

              {children && !isLoading && (
                <Stack hPadding={24} data-inner-element="ProductCard-Children">
                  {children}
                </Stack>
              )}

              <ProductCard.Footer {...otherProps} isLoading={isLoading} data-inner-element="ProductCard-Footer">
                {footer}
              </ProductCard.Footer>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Elevator>
  );
}) as PolymorphicProductCard;

ProductCard.displayName = 'ProductCard';
ProductCard.Media = ProductCardMedia;
ProductCard.Header = ProductCardHeader;
ProductCard.Kpis = ProductCardKpis;
ProductCard.Footer = ProductCardFooter;

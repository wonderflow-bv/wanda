import { useDebounce } from 'ahooks';
import clsx from 'clsx';
import React, {
  forwardRef, PropsWithChildren,
  useRef,
} from 'react';

import {
  Elevator,
  Stack,
  Text,
} from '@/components';

import * as styles from './product-card.module.css';
import { ProductCardFooter, ProductCardFooterComponent } from './product-card-footer/product-card-footer';
import { ProductCardHeader, ProductCardHeaderComponent, ProductCardHeaderProps } from './product-card-header/product-card-header';
import { ProductCardKpis, ProductCardKpisComponent, ProductCardKpisProps } from './product-card-kpis/product-card-kpis';
import { ProductCardMedia, ProductCardMediaComponent, ProductCardMediaProps } from './product-card-media/product-card-media';

export type ProductCardProps = PropsWithClass<PropsWithChildren<{
  /**
   * Change the product card layout.
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Add a border to the card to increase its visual weight and contrast.
   */
  bordered?: boolean;
  /**
   * Change the style of the card when it is hovered.
   */
  highlightOnHover?: boolean;
  /**
   * Set the content to be displayed on the overlay layer.
   */
  overlayActions?: React.ReactNode;
  /**
   * Add content to the footer.
   */
  footer?: React.ReactNode;
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
  /**
   * Shows a colored cover with the first two letters of the title.
   */
  hasColoredCover?: boolean;
  /**
   * Set an action to be performed when clicked.
   */
  onClick?: () => void;
}>>
& Pick<ProductCardMediaProps, 'ratio' | 'source'>
& Pick<ProductCardHeaderProps, 'title' | 'titleRows' | 'subtitle' | 'menuActions'>
& Pick<ProductCardKpisProps, 'rating' | 'feedbackCount' | 'votesCount' | 'votesRating' | 'users' | 'skus' | 'sentiment' | 'priceMin' | 'priceMax' | 'nps' | 'kpisRowGap' | 'kpiItems' | 'groups' | 'tgw' | 'skusCap' | 'usersCap' | 'currency' |
'currencyDecimals'>

const getColorFromString = (input: string): string => {
  // Generate a hash from the input string
  let hash = 0;
  let color = '#';
  const rgb = [];

  for (let i = 0; i < input.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xFF;
    rgb.push(value);
    color += (`00${value.toString(16)}`).slice(-2);
  }

  // Calculate luminance to check if the color is too light
  const [r, g, b] = rgb.map(v => v / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luminance > 0.8) {
    const darkenedRgb = rgb.map(v => Math.floor(v * 0.6));
    color = darkenedRgb.map(value => (`00${value.toString(16)}`).slice(-2)).join('');
    color = `#${color}`;
  }

  return color;
};

export type ProductCardComponent = React.ForwardRefExoticComponent<ProductCardProps> & {
  Media: ProductCardMediaComponent;
  Kpis: ProductCardKpisComponent;
  Header: ProductCardHeaderComponent;
  Footer: ProductCardFooterComponent;
};

export const ProductCard = forwardRef(({
  direction = 'vertical',
  bordered = false,
  highlightOnHover = false,
  title,
  titleRows = 3,
  subtitle,
  menuActions,
  rating,
  feedbackCount,
  votesCount,
  votesRating,
  sentiment,
  nps,
  groups,
  tgw,
  priceMin,
  priceMax,
  currency,
  currencyDecimals,
  users,
  usersCap,
  skus,
  skusCap,
  kpiItems,
  kpisRowGap,
  ratio,
  source,
  footer,
  overlayActions,
  onClick,
  isLoading = false,
  hasColoredCover = false,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const hasOverlay = !!(overlayActions && !menuActions && !onClick && !isLoading);
  const hasMenu = !!(menuActions && !overlayActions && !onClick);
  const hasHighlight = !!(onClick ?? highlightOnHover);
  const isClickable = !!(!isLoading && onClick);

  const containerRef = useRef(null);

  const mediaSizeStyle = (direction: 'vertical' | 'horizontal') => {
    if (containerRef?.current) {
      // @ts-expect-error: getBoundingClientRect()
      const { width, height } = containerRef.current.getBoundingClientRect();

      if (direction === 'vertical') {
        return ({
          flexGrow: 0,
          height: 'auto',
          width: '100%',
        });
      }

      return ({
        flexGrow: 0,
        width: `${Math.min(width, height)}px`,
        height: 'auto',
      });
    }

    return ({});
  };

  const deboucedStyle = useDebounce(mediaSizeStyle(direction), { wait: 500 });

  return (
    <Elevator resting={1} hover={hasHighlight ? 2 : undefined}>
      <Stack
        ref={forwardedRef}
        className={clsx(styles.Card, className)}
        style={{ ...style }}
        data-card-bordered={bordered}
        data-card-clickable={isClickable}
        onClick={isLoading ? undefined : onClick}
        {...otherProps}
      >

        <Stack
          data-inner-element="ProductCard-Container"
          direction="row"
          className={styles.Row}
          fill={false}
          ref={containerRef}
        >
          {hasOverlay && (
            <Stack
              direction="row"
              hPadding={24}
              vAlign="center"
              hAlign="center"
              className={styles.OverlayActions}
              data-inner-element="ProductCard-OverlayActions"
            >
              <Stack>
                {overlayActions}
              </Stack>
            </Stack>
          )}

          <Stack
            data-inner-element="ProductCard-Group"
            direction={(direction === 'vertical') ? 'column' : 'row'}
            className={styles.Content}
          >

            {hasColoredCover && !source?.length && (
              <Stack style={{ backgroundColor: `${getColorFromString(title ?? '')}`, width: '100%', height: '125px' }} hAlign="center" vAlign="center" fill={false}>
                <Text variant="heading-1" textAlign="center">
                  {title?.slice(0, 2)}
                </Text>
              </Stack>
            )}

            <ProductCard.Media
              source={source}
              isLoading={isLoading}
              ratio={ratio}
              data-inner-element="ProductCard-Media"
              style={deboucedStyle}
            />

            <Stack
              direction="column"
            >

              <ProductCard.Header
                data-inner-element="ProductCard-Header"
                title={title}
                titleRows={titleRows}
                subtitle={subtitle}
                isLoading={isLoading}
                menuActions={hasMenu && menuActions}
              />

              <ProductCardKpis
                data-inner-element="ProductCard-Kpis"
                rating={rating}
                feedbackCount={feedbackCount}
                votesCount={votesCount}
                votesRating={votesRating}
                sentiment={sentiment}
                nps={nps}
                groups={groups}
                tgw={tgw}
                priceMin={priceMin}
                priceMax={priceMax}
                currency={currency}
                currencyDecimals={currencyDecimals}
                users={users}
                usersCap={usersCap}
                skus={skus}
                skusCap={skusCap}
                isLoading={isLoading}
                kpiItems={kpiItems}
                kpisRowGap={kpisRowGap}
              />

              {children && !isLoading && (
                <Stack hPadding={24} data-inner-element="ProductCard-Children">
                  {children}
                </Stack>
              )}

              <ProductCard.Footer isLoading={isLoading} data-inner-element="ProductCard-Footer">
                {footer}
              </ProductCard.Footer>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Elevator>
  );
}) as ProductCardComponent;

ProductCard.displayName = 'ProductCard';

ProductCard.Media = ProductCardMedia;
ProductCard.Header = ProductCardHeader;
ProductCard.Kpis = ProductCardKpis;
ProductCard.Footer = ProductCardFooter;

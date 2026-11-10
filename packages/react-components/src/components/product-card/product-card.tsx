import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren } from 'react';

import {
  Chip,
  Elevator,
  Separator,
  Stack,
  Text,
} from '@/components';

import * as styles from './product-card.module.css';
import { ProductCardFooter, ProductCardFooterComponent } from './product-card-footer/product-card-footer';
import { ProductCardHeader, ProductCardHeaderComponent, ProductCardHeaderProps } from './product-card-header/product-card-header';
import { ProductCardKpis, ProductCardKpisComponent, ProductCardKpisProps } from './product-card-kpis/product-card-kpis';
import { ProductCardMedia, ProductCardMediaComponent, ProductCardMediaProps } from './product-card-media/product-card-media';
import { ProductCardTopBar, ProductCardTopBarComponent, ProductCardTopBarProps } from './product-card-top-bar/product-card-top-bar';

export type ProductCardProps = PropsWithClass<PropsWithChildren<{
  /**
   * Add a border to the card to increase its visual weight and contrast.
   *
   * @default true
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
  /**
   * Set the name of the marketplace the product comes from.
   * The top bar is rendered only when this is set.
   */
  sourceLabel?: ProductCardTopBarProps['sourceLabel'];
  /**
   * Set the logo of the marketplace, displayed before the `sourceLabel`.
   */
  sourceIcon?: ProductCardTopBarProps['sourceIcon'];
  /**
   * Set a label (e.g. "New") displayed as a badge over the top-right corner of the cover.
   * It is not displayed while loading or when the card has no cover.
   */
  badge?: string;
}>>
& Pick<ProductCardMediaProps, 'ratio' | 'source'>
& Pick<ProductCardHeaderProps, 'title' | 'titleRows' | 'subtitle' | 'description' | 'descriptionRows'>
& Pick<ProductCardKpisProps, 'rating' | 'feedbackCount' | 'votesCount' | 'votesRating' | 'users' | 'skus' | 'sentiment' | 'priceMin' | 'priceMax' | 'nps' | 'kpisRowGap' | 'kpiItems' | 'groups' | 'tgw' | 'skusCap' | 'usersCap' | 'currency' |
'currencyDecimals'>

const getColorFromString = (input: string): string => {
  const colorPalette = tkns.color;
  // Generate a hash from the input string
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Get all color keys
  const colorKeys = Object.keys(colorPalette).filter((color: string) => color !== 'support');
  // Pick a color family based on the hash
  const colorFamily = colorKeys[Math.abs(hash) % colorKeys.length];

  // Return the first shade of the selected color family
  const shades = colorPalette[colorFamily as keyof typeof colorPalette];
  const firstShade = Object.values(shades)[5];

  return `hsl(${firstShade})`;
};

export type ProductCardComponent = React.ForwardRefExoticComponent<ProductCardProps> & {
  Media: ProductCardMediaComponent;
  Kpis: ProductCardKpisComponent;
  Header: ProductCardHeaderComponent;
  Footer: ProductCardFooterComponent;
  TopBar: ProductCardTopBarComponent;
};

export const ProductCard = forwardRef(({
  bordered = true,
  highlightOnHover = false,
  title,
  titleRows = 3,
  subtitle,
  description,
  descriptionRows,
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
  sourceLabel,
  sourceIcon,
  badge,
  isLoading = false,
  hasColoredCover = false,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const hasOverlay = !!(overlayActions && !onClick && !isLoading);
  const hasHighlight = !!(onClick ?? highlightOnHover);
  const isClickable = !!(!isLoading && onClick);

  const hasTopBar = !!sourceLabel;
  const hasColoredCard = hasColoredCover && !source?.length;
  const hasMedia = !hasColoredCover && !!source?.length;
  const hasCover = hasColoredCard || hasMedia;
  const hasKpis = kpiItems !== 0;
  const hasFooterSeparator = !!footer || isLoading;

  return (
    <Elevator resting={1} hover={hasHighlight ? 2 : undefined}>
      <Stack
        ref={forwardedRef}
        className={clsx(styles.Card, className)}
        style={{ ...style }}
        fill={false}
        data-card-bordered={bordered}
        data-card-clickable={isClickable}
        onClick={isLoading ? undefined : onClick}
        {...otherProps}
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

        {hasTopBar && (
          <>
            <ProductCard.TopBar
              data-inner-element="ProductCard-TopBar"
              sourceLabel={sourceLabel}
              sourceIcon={sourceIcon}
              isLoading={isLoading}
            />
            <Separator />
          </>
        )}

        {hasCover && (
          <div className={styles.Cover}>
            {hasColoredCard && (
              <Stack
                className={styles.ColoredCard}
                style={{ backgroundColor: `${getColorFromString(title ?? '')}` }}
                hAlign="center"
                vAlign="center"
                fill={false}
              >
                <Text variant="heading-1" textAlign="center" style={{ color: '#fff' }}>
                  {title?.slice(0, 2)}
                </Text>
              </Stack>
            )}

            {hasMedia && (
              <ProductCard.Media
                source={source}
                isLoading={isLoading}
                ratio={ratio}
                data-inner-element="ProductCard-Media"
              />
            )}

            {badge && !isLoading && (
              <Chip color="yellow" className={styles.Badge} data-inner-element="ProductCard-Badge">
                {badge}
              </Chip>
            )}
          </div>
        )}

        <ProductCard.Header
          data-inner-element="ProductCard-Header"
          title={title}
          titleRows={titleRows}
          subtitle={subtitle}
          description={description}
          descriptionRows={descriptionRows}
          isLoading={isLoading}
        />

        {hasKpis && (
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
        )}

        {children && !isLoading && (
          <Stack hPadding={16} data-inner-element="ProductCard-Children">
            {children}
          </Stack>
        )}

        <div className={styles.Bottom}>
          {hasFooterSeparator && <Separator />}
          <ProductCard.Footer isLoading={isLoading} data-inner-element="ProductCard-Footer">
            {footer}
          </ProductCard.Footer>
        </div>
      </Stack>
    </Elevator>
  );
}) as ProductCardComponent;

ProductCard.displayName = 'ProductCard';

ProductCard.Media = ProductCardMedia;
ProductCard.Header = ProductCardHeader;
ProductCard.Kpis = ProductCardKpis;
ProductCard.Footer = ProductCardFooter;
ProductCard.TopBar = ProductCardTopBar;

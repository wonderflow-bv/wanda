import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import React, {
  forwardRef, PropsWithChildren, useCallback, useEffect, useRef, useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

import {
  AspectRatio,
  Chip,
  Elevator,
  Separator,
  Skeleton,
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
   * Set the content to be displayed over the cover (image or colored cover) on hover.
   * Ignored when the card is clickable or loading.
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
   * It is not displayed while loading.
   */
  badge?: string;
}>>
& Pick<ProductCardMediaProps, 'ratio' | 'source'>
& Pick<ProductCardHeaderProps, 'title' | 'titleRows' | 'subtitle' | 'description' | 'descriptionRows'>
& Pick<ProductCardKpisProps, 'rating' | 'feedbackCount' | 'votesCount' | 'votesRating' | 'users' | 'skus' | 'sentiment' | 'priceMin' | 'priceMax' | 'nps' | 'kpisRowGap' | 'kpiItems' | 'expandable' | 'expandLabel' | 'collapseLabel' | 'groups' | 'tgw' | 'skusCap' | 'usersCap' | 'currency' |
'currencyDecimals'>

// Must be longer than the KPIs collapse animation (fade + slide).
const LOCK_RELEASE_FALLBACK_MS = 500;

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
  expandable,
  expandLabel,
  collapseLabel,
  ratio,
  source,
  footer,
  overlayActions,
  onClick,
  sourceLabel,
  sourceIcon,
  badge,
  isLoading = false,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [lockedHeight, setLockedHeight] = useState<number>();
  const [isLocked, setIsLocked] = useState(false);

  const hasOverlay = !!(overlayActions && !onClick && !isLoading);
  const hasHighlight = !!(onClick ?? highlightOnHover);
  const isClickable = !!(!isLoading && onClick);

  const hasTopBar = !!sourceLabel;
  const hasMedia = !!source?.length;
  const hasKpis = kpiItems !== 0;
  const hasFooterSeparator = !!footer || isLoading;

  const isKpisExpanded = !!expandable && isExpanded && !isLoading;
  const isShowingAllKpis = isKpisExpanded && !isPeeking;
  const isKpisAvailable = !!expandable && !isLoading;
  // While the overlay actions are open, the KPIs give their space back to the cover.
  const isKpisHidden = hasOverlay && isOverlayOpen && hasKpis;

  const lock = useCallback(() => {
    if (isLocked) return;

    setLockedHeight(cardRef.current?.offsetHeight);
    setIsLocked(true);
  }, [isLocked]);

  const unlock = useCallback(() => {
    setIsLocked(false);
    setLockedHeight(undefined);
  }, []);

  useEffect(() => {
    if (!isKpisAvailable) {
      setIsExpanded(false);
      unlock();
    }
  }, [isKpisAvailable, unlock]);

  useEffect(() => {
    if (!isKpisExpanded) setIsPeeking(false);
  }, [isKpisExpanded]);

  useEffect(() => {
    if (!hasOverlay) setIsOverlayOpen(false);
  }, [hasOverlay]);

  // The lock is kept while the collapse animation plays, then released on transition end (or after a fallback delay).
  useEffect(() => {
    if (!isLocked || isKpisExpanded || isOverlayOpen) return undefined;

    const timeout = setTimeout(unlock, LOCK_RELEASE_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, [isLocked, isKpisExpanded, isOverlayOpen, unlock]);

  const handleExpandedChange = useCallback((expanded: boolean) => {
    if (expanded) lock();

    setIsExpanded(expanded);
  }, [lock]);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isLocked && !isKpisExpanded && !isOverlayOpen && event.propertyName === 'grid-template-rows') unlock();
  };

  const handleCoverMouseEnter = () => {
    if (hasOverlay) {
      if (hasKpis) lock();
      setIsOverlayOpen(true);
    } else if (isKpisExpanded) {
      setIsPeeking(true);
    }
  };

  const handleCoverMouseLeave = () => {
    if (hasOverlay) setIsOverlayOpen(false);
    else if (isKpisExpanded) setIsPeeking(false);
  };

  return (
    <Elevator resting={1} hover={hasHighlight ? 2 : undefined}>
      <Stack
        ref={mergeRefs([cardRef, forwardedRef])}
        className={clsx(styles.Card, className)}
        style={{ ...style, height: isLocked ? lockedHeight : style?.height }}
        fill={false}
        data-card-bordered={bordered}
        data-card-clickable={isClickable}
        data-card-expanded={isShowingAllKpis}
        data-card-locked={isLocked}
        data-card-overlay-open={hasOverlay && isOverlayOpen}
        onClick={isLoading ? undefined : onClick}
        onTransitionEnd={handleTransitionEnd}
        {...otherProps}
      >
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

        <div
          className={styles.Cover}
          data-inner-element="ProductCard-Cover"
          onMouseEnter={handleCoverMouseEnter}
          onMouseLeave={handleCoverMouseLeave}
        >
          {hasMedia
            ? (
              <ProductCard.Media
                source={source}
                isLoading={isLoading}
                ratio={ratio}
                data-inner-element="ProductCard-Media"
              />
            )
            : (
              <AspectRatio ratio={ratio ?? '1'}>
                {isLoading
                  ? (
                    <Skeleton
                      style={{ borderRadius: '0', lineHeight: '2rem' }}
                      width="inherit"
                      height="inherit"
                    />
                  )
                  : (
                    <Stack
                      className={styles.ColoredCard}
                      style={{ backgroundColor: getColorFromString(title ?? '') }}
                      hAlign="center"
                      vAlign="center"
                      fill={false}
                      data-inner-element="ProductCard-ColoredCover"
                    >
                      <Text variant="heading-1" textAlign="center" style={{ color: '#fff' }}>
                        {title?.slice(0, 2)}
                      </Text>
                    </Stack>
                  )}
              </AspectRatio>
            )}

          {badge && !isLoading && (
            <Chip color="yellow" className={styles.Badge} data-inner-element="ProductCard-Badge">
              {badge}
            </Chip>
          )}

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
        </div>

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
          <div
            className={styles.KpisCollapse}
            data-kpis-hidden={isKpisHidden}
            aria-hidden={isKpisHidden || undefined}
            data-inner-element="ProductCard-KpisCollapse"
          >
            <div className={styles.KpisCollapseContent}>
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
                expandable={expandable}
                expandLabel={expandLabel}
                collapseLabel={collapseLabel}
                isExpanded={isShowingAllKpis}
                onExpandedChange={handleExpandedChange}
              />
            </div>
          </div>
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

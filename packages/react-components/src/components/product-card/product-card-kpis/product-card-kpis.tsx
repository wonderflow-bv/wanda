/*
 * Copyright 2023-2026 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  forwardRef, MouseEvent, TransitionEvent, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import {
  Button,
  Skeleton,
  Symbol,
  Text,
} from '@/components';

import {
  formatKpiValue, formatPriceRangeValues, isGreaterThan, isValueOverCap,
} from '../../../utils/formatting';
import * as styles from './product-card-kpis.module.css';

export type Currency = 'AED' | 'AUD' | 'BRL' | 'CAD' | 'EGP' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'MXN' | 'PLN' | 'SAR' | 'SEK' | 'SGD' | 'TRY' | 'USD' | 'ZAR';

export type ProductCardKpisProps = PropsWithClass<{
  /**
   * Set the stars rating value.
   */
  rating?: number;
  /**
   * Set the feedback count value.
   */
  feedbackCount?: number;
  /**
   * Set the votes count value.
   */
  votesCount?: number;
  /**
   * Set the votes rating value.
   */
  votesRating?: number;
  /**
   * Set the sentiment index value.
   */
  sentiment?: number;
  /**
   * Set the NPS value.
   */
  nps?: number;
  /**
   * Set the groups value.
   */
  groups?: number;
  /**
   * Set the TGW value.
   */
  tgw?: number;
  /**
   * Set the minimum price value.
   */
  priceMin?: number;
  /**
   * Set the maximum price value.
   */
  priceMax?: number;
  /**
   * Set the price currency code based on ISO 4217.
  */
  currency?: Currency;
  /**
   * Set the number of decimal to be used for currency formatting.
  */
  currencyDecimals?: number;
  /**
   * Set the users value.
  */
  users?: number;
  /**
  * Set a cap value for users.
  */
  usersCap?: number;
  /**
  * Set the SKUs value.
  */
  skus?: number;
  /**
  * Set the a cap value for SKUs.
  */
  skusCap?: number;
  /**
   * Set the maximum number of Kpis items to be displayed (and the skeleton rows while loading).
   * When used through `ProductCard`, `0` hides the KPIs block (and its spacing) entirely.
   */
  kpiItems?: number;
  /**
   * Set the space between Kpis items.
   */
  kpisRowGap?: TokensTypes['space'];
  /**
   * Show a toggle to reveal the Kpis beyond `kpiItems`.
   * The toggle does not depend on how many Kpis have a value: the consumer can provide them on demand
   * (e.g. when `onExpandedChange` is called) and they are revealed with the same animation.
   *
   * @default false
   */
  expandable?: boolean;
  /**
   * Set the label of the toggle when the Kpis are collapsed.
   *
   * @default 'Show more'
   */
  expandLabel?: string;
  /**
   * Set the label of the toggle when the Kpis are expanded.
   *
   * @default 'Show less'
   */
  collapseLabel?: string;
  /**
   * Control the expanded state. When not set, the state is handled internally.
   */
  isExpanded?: boolean;
  /**
   * Callback called when the toggle is pressed.
   */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
}>

export type ProductCardKpisComponent = React.ForwardRefExoticComponent<ProductCardKpisProps>;

type KpiItemType = {
  property: string;
  value?: string;
  icon: any;
  iconColor?: string;
}

// Must be longer than the extras collapse animation (delay + slide).
const EXTRAS_UNMOUNT_FALLBACK_MS = 500;

export const ProductCardKpis = forwardRef(({
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
  currency = 'EUR',
  currencyDecimals = 0,
  users,
  usersCap,
  skus,
  skusCap,
  kpiItems = 3,
  kpisRowGap = 8,
  expandable = false,
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  isExpanded: isExpandedProp,
  onExpandedChange,
  isLoading = false,
  className,
  style,
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const config: KpiItemType[] = useMemo(() => ([
    {
      property: 'feedback-rating',
      value: formatKpiValue(rating, { decimal: 1, minRange: 0, maxRange: 5 }),
      icon: 'feedback-rating',
      iconColor: isGreaterThan(3.99, rating) ? `hsl(${tkns.color.yellow['30']})` : undefined,
    },
    {
      property: 'nps',
      value: formatKpiValue(nps, { decimal: 0, minRange: -100, maxRange: 100 }),
      icon: 'nps',
    },
    {
      property: 'feedback-count',
      value: formatKpiValue(feedbackCount, { decimal: 0, minRange: 0, compact: true }),
      icon: 'message',
    },
    {
      property: 'votes-rating',
      value: formatKpiValue(votesRating, { decimal: 1, minRange: 0, maxRange: 5 }),
      icon: 'star',
      iconColor: isGreaterThan(3.99, votesRating) ? `hsl(${tkns.color.yellow['20']})` : undefined,
    },
    {
      property: 'votes-count',
      value: formatKpiValue(votesCount, { decimal: 0, minRange: 0, compact: true }),
      icon: 'votes-count',
    },
    {
      property: 'sentiment',
      value: formatKpiValue(sentiment, { decimal: 1, minRange: -1, maxRange: 1 }),
      icon: 'hearts-suit',
      iconColor: isGreaterThan(0.5, sentiment) ? 'var(--highlight-red-foreground)' : undefined,
    },
    {
      property: 'tgw',
      value: formatKpiValue(tgw, { decimal: 1, minRange: 0 }),
      icon: 'frown',
    },
    {
      property: 'price',
      value: formatPriceRangeValues(priceMin, priceMax, { currency, decimals: currencyDecimals }),
      icon: 'tags',
    },
    {
      property: 'groups',
      value: formatKpiValue(groups, { decimal: 0, minRange: 0, compact: true }),
      icon: 'grid',
    },
    {
      property: 'users',
      value: formatKpiValue(users, {
        decimal: 0, minRange: 0, cap: usersCap, compact: true,
      }),
      icon: 'users',
      iconColor: isValueOverCap(users, usersCap) ? 'var(--highlight-red-foreground)' : undefined,
    },
    {
      property: 'skus',
      value: formatKpiValue(skus, {
        decimal: 0, minRange: 0, cap: skusCap, compact: true,
      }),
      icon: 'rectangle-barcode',
      iconColor: isValueOverCap(skus, skusCap) ? 'var(--highlight-red-foreground)' : undefined,
    },
  ]), [
    rating,
    sentiment,
    feedbackCount,
    votesCount,
    votesRating,
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
    skusCap]);

  const [isExpandedState, setIsExpandedState] = useState(false);
  const isExpanded = isExpandedProp ?? isExpandedState;

  const availableKpis = config.filter(el => el.value);
  const hasToggle = expandable;
  const defaultKpis = availableKpis.slice(0, kpiItems);
  const extraKpis = expandable ? availableKpis.slice(kpiItems) : [];
  const hasExtras = extraKpis.length > 0;

  // The extras can be provided (and withdrawn) at any time, e.g. once an async request resolves or when the consumer
  // collapses the card and drops them. To animate in both directions:
  // - late extras are mounted hidden and revealed only after the browser has computed the hidden style,
  //   otherwise there is nothing to transition from;
  // - withdrawn extras are kept mounted (with their last values) until the collapse animation is over.
  const extrasRef = useRef<HTMLDivElement>(null);
  const lastExtrasRef = useRef(extraKpis);
  if (hasExtras) lastExtrasRef.current = extraKpis;
  const renderedExtras = hasExtras ? extraKpis : lastExtrasRef.current;

  const [isRevealed, setIsRevealed] = useState(hasExtras);
  const [isExtrasMounted, setIsExtrasMounted] = useState(hasExtras);

  useEffect(() => {
    if (hasExtras) {
      setIsExtrasMounted(true);
      // Reading a layout property forces a style recalculation: the hidden state is computed (and committed as the
      // transition start) even if the commit, this effect and the reveal all happen within the same frame.
      extrasRef.current?.getBoundingClientRect();
      setIsRevealed(true);
      return undefined;
    }

    setIsRevealed(false);
    const timeout = setTimeout(() => setIsExtrasMounted(false), EXTRAS_UNMOUNT_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, [hasExtras]);

  const handleExtrasTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (!hasExtras && event.target === event.currentTarget && event.propertyName === 'grid-template-rows') {
      setIsExtrasMounted(false);
    }
  };

  const isShowingAll = isExpanded && hasToggle && hasExtras && isRevealed;
  const rowGap = kpisRowGap ? tkns.space[kpisRowGap] : 0;

  const renderKpi = (el: KpiItemType) => (
    <Text
      key={el.property}
      className={styles.Kpi}
      variant="body-2"
      decoratorStart={<Symbol source={el.icon} color={el.iconColor} weight="solid" />}
      decoratorSize="medium"
    >
      {el.value}
    </Text>
  );

  const handleToggle = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setIsExpandedState(!isExpanded);
    onExpandedChange?.(!isExpanded);
  }, [isExpanded, onExpandedChange]);

  return (
    <div className={clsx(styles.Kpis, className)} style={style} ref={forwardedRef}>
      {isLoading
        ? (
          <div className={styles.Grid} style={{ rowGap }}>
            {Array.from({ length: kpiItems }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton key={i} height="20px" width="100%" inline />
            ))}
          </div>
        )
        : (
          <>
            <div className={styles.Grid} style={{ rowGap }}>
              {defaultKpis.map(renderKpi)}
            </div>
            {(hasExtras || isExtrasMounted) && (
              <div
                ref={extrasRef}
                className={styles.Extras}
                data-extras-visible={isShowingAll}
                aria-hidden={!isShowingAll}
                data-inner-element="ProductCard-KpisExtras"
                onTransitionEnd={handleExtrasTransitionEnd}
              >
                <div className={styles.ExtrasContent}>
                  <div className={styles.Grid} style={{ rowGap, paddingBlockStart: rowGap }}>
                    {renderedExtras.map(renderKpi)}
                  </div>
                </div>
              </div>
            )}
            {hasToggle && (
              <Button
                kind="flat"
                dimension="small"
                icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                iconPosition="right"
                className={styles.Toggle}
                aria-expanded={isExpanded}
                data-inner-element="ProductCard-KpisToggle"
                onClick={handleToggle}
              >
                {isExpanded ? collapseLabel : expandLabel}
              </Button>
            )}
          </>
        )}
    </div>
  );
}) as ProductCardKpisComponent;

ProductCardKpis.displayName = 'ProductCardKpis';

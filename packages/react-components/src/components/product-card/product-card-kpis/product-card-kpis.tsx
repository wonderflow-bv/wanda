/*
 * Copyright 2023 Wonderflow Design Team
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
  CSSProperties, forwardRef, useMemo,
} from 'react';

import {
  Skeleton, Stack,
  Symbol, Text,
} from '@/components';

import { formatKpiValue, formatPriceRangeValues, isValueOverCap } from '../../../utils/formatting';
import * as styles from './product-card-kpis.module.css';

export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CNY';

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
   * Set the number of Kpis items to be displayed.
   */
  kpiItems?: number;
  /**
   * Set the space between Kpis items.
   */
  kpisRowGap?: TokensTypes['space'];
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
  isLoading = false,
  className,
  style,
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const getCurrency = (currency: Currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'JPY':
      case 'CNY':
        return '¥';
      default:
        return '€';
    }
  };

  const config: KpiItemType[] = useMemo(() => ([
    {
      property: 'feedback-rating',
      value: formatKpiValue(rating, { decimal: 2, minRange: 0, maxRange: 5 }),
      icon: 'feedback-rating',
      iconColor: `hsl(${tkns.color.yellow['30']})`,
    },
    {
      property: 'sentiment',
      value: formatKpiValue(sentiment, { decimal: 2, minRange: -1, maxRange: 1 }),
      icon: 'hearts-suit',
      iconColor: (typeof sentiment === 'number' && sentiment > 0.5) ? 'var(--highlight-red-foreground)' : undefined,
    },
    {
      property: 'feedback-count',
      value: formatKpiValue(feedbackCount),
      icon: 'message',
    },
    {
      property: 'votes-count',
      value: formatKpiValue(votesCount),
      icon: 'votes-count',
    },
    {
      property: 'votes-rating',
      value: formatKpiValue(votesRating, { decimal: 2, minRange: 0, maxRange: 5 }),
      icon: 'star',
      iconColor: `hsl(${tkns.color.yellow['20']})`,
    },
    {
      property: 'nps',
      value: formatKpiValue(nps, { decimal: 0, minRange: 0, maxRange: 100 }),
      icon: 'nps',
    },
    {
      property: 'groups',
      value: formatKpiValue(groups),
      icon: 'grid',
    },
    {
      property: 'tgw',
      value: formatKpiValue(tgw, { decimal: 2, minRange: 0 }),
      icon: 'frown',
    },
    {
      property: 'price',
      value: formatPriceRangeValues(priceMin, priceMax, { currency: getCurrency(currency), decimal: currencyDecimals }),
      icon: 'tags',
    },
    {
      property: 'users',
      value: formatKpiValue(users, { decimal: 0, minRange: 0, cap: usersCap }),
      icon: 'users',
      iconColor: isValueOverCap(users, usersCap) ? 'var(--highlight-red-foreground)' : undefined,
    },
    {
      property: 'skus',
      value: formatKpiValue(skus, { decimal: 0, minRange: 0, cap: skusCap }),
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

  const itemHeight = 20;
  const dynamicStyle: CSSProperties = {
    '--height': `${kpiItems * itemHeight + ((kpiItems - 1) * (+kpisRowGap))}px`,
  };

  return (
    <div className={clsx(styles.Kpis, className)} style={{ ...dynamicStyle, ...style }} ref={forwardedRef}>
      {isLoading
        ? (
          <Stack hPadding={24}>
            <Skeleton height="20px" width="50%" count={kpiItems} />
          </Stack>
        )
        : (
          <Stack rowGap={kpisRowGap} hPadding={24}>
            {config
              .filter(el => el.value)
              .map(el => (
                <Text
                  key={el.property}
                  variant="body-2"
                  decoratorStart={<Symbol source={el.icon} color={el.iconColor} weight="solid" />}
                  decoratorSize="small"
                >
                  <b>{el.value}</b>
                </Text>
              ))}
          </Stack>
        )}
    </div>
  );
}) as ProductCardKpisComponent;

ProductCardKpis.displayName = 'ProductCardKpis';

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

import clsx from 'clsx';
import { SymbolNames } from 'packages/symbols/dist';
import { TokensTypes } from 'packages/tokens/platforms/web';
import {
  CSSProperties, forwardRef, ReactElement, useMemo,
} from 'react';

import {
  Polymorphic, Skeleton, Stack,
  Symbol, Text,
} from '@/components';

import { formatPriceRangeValues } from '../../../../utils';
import * as styles from './product-card-kpi.module.css';

export type ProductCardKpisProps = {
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
   * Set the minimum price value.
   */
  priceMin?: number;
  /**
   * Set the maximum price value.
   */
  priceMax?: number;
  /**
   * Set the users value.
  */
  users?: number;
  /**
  * Set the SKUs value.
  */
  skus?: number;
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
}

export type PolymorphicProductCardKpis = Polymorphic.ForwardRefComponent<'div', ProductCardKpisProps>;

type KpiItemType = {
  property: string;
  value?: string;
  icon: SymbolNames | ReactElement<HTMLOrSVGElement>;
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
  priceMin,
  priceMax,
  users,
  skus,
  kpiItems = 3,
  kpisRowGap = 8,
  isLoading = false,
  className,
  style,
}, forwardedRef) => {
  const config: KpiItemType[] = useMemo(() => ([
    {
      property: 'rating',
      value: rating?.toFixed(2),
      icon: 'star',
      iconColor: 'orange',
    },
    {
      property: 'feedback-count',
      value: feedbackCount?.toFixed(0),
      icon: 'file-alt',
    },
    {
      property: 'votes-count',
      value: votesCount?.toFixed(0),
      icon: 'thumbs-up',
    },
    {
      property: 'votes-rating',
      value: votesRating?.toFixed(2),
      icon: 'arrow-trend-up',
    },
    {
      property: 'sentiment',
      value: sentiment?.toFixed(2),
      icon: 'hearts-suit',
      iconColor: 'red',
    },
    {
      property: 'nps',
      value: nps?.toFixed(2),
      icon: 'nps',
    },
    {
      property: 'groups',
      value: groups?.toFixed(0),
      icon: 'grid',
    },
    {
      property: 'price',
      value: formatPriceRangeValues(priceMin, priceMax),
      icon: 'tags',
    },
    {
      property: 'users',
      value: users?.toFixed(0),
      icon: 'users',
    },
    {
      property: 'skus',
      value: skus?.toFixed(0),
      icon: 'rectangle-barcode',
    },
  ]), [feedbackCount, groups, nps, rating, sentiment, priceMin, priceMax, skus, users, votesCount, votesRating]);

  const dynamicStyle: CSSProperties = {
    '--height': `${kpiItems * 20 + ((kpiItems - 1) * (+kpisRowGap))}px`,
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
            {config.map(el => ((el.value)
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            && <Text variant="body-2" key={el.property} decoratorStart={<Symbol source={el.icon} color={el.iconColor} weight="solid" />} decoratorSize="small"><b>{el.value}</b></Text>
            ))}
          </Stack>
        )}
    </div>
  );
}) as PolymorphicProductCardKpis;

ProductCardKpis.displayName = 'ProductCard.Kpis';

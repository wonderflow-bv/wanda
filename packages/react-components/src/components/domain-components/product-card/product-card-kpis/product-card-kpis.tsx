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

import * as styles from './product-card-kpi.module.css';

export type ProductCardKpisProps = {
  /**
   * Set the stars rating value
   */
  rating?: number;
  /**
   * Set the feedback count value
   */
  feedbackCount?: number;
  /**
   * Set the votes count value
   */
  votesCount?: number;
  /**
   * Set the votes rating value
   */
  votesRating?: number;
  /**
   * Set the sentiment index value
   */
  sentiment?: number;
  /**
   * Set the NPS value
   */
  nps?: number;
  /**
   * Set the groups value
   */
  groups?: number;
  /**
   * Set the price value
   */
  price?: number;
  /**
   * Set the users value
  */
  users?: number;
  /**
  * Set the SKUs value
  */
  skus?: number;
  /**
   *
   */
  kpiItems?: number;
  /**
   *
   */
  kpisRowGap?: TokensTypes['space'];
  /**
   *
   */
  isLoading?: boolean;
}

export type PolymorphicProductCardKpis = Polymorphic.ForwardRefComponent<'div', ProductCardKpisProps>;

type KpiItemType = {
  property: string;
  value?: string;
  icon: SymbolNames | ReactElement<HTMLOrSVGElement>;
  iconColor?: string;
  defaultValue?: string;
}

export const ProductCardKpis = forwardRef(({
  rating,
  feedbackCount,
  votesCount,
  votesRating,
  sentiment,
  nps,
  groups,
  price,
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
      defaultValue: undefined,
    },
    {
      property: 'feedback-count',
      value: feedbackCount?.toFixed(0),
      icon: 'file-alt',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'votes-count',
      value: votesCount?.toFixed(0),
      icon: 'thumbs-up',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'votes-rating',
      value: votesRating?.toFixed(2),
      icon: 'arrow-trend-up',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'sentiment',
      value: sentiment?.toFixed(2),
      icon: 'hearts-suit',
      iconColor: 'red',
      defaultValue: undefined,
    },
    {
      property: 'nps',
      value: nps?.toFixed(2),
      icon: 'nps',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'groups',
      value: groups?.toFixed(0),
      icon: 'grid',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'price',
      value: price ? `€${price?.toFixed(2)}` : undefined,
      icon: 'tags',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'users',
      value: users?.toFixed(0),
      icon: 'users',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'skus',
      value: skus?.toFixed(0),
      icon: 'rectangle-barcode',
      iconColor: undefined,
      defaultValue: undefined,
    },
  ]), [feedbackCount, groups, nps, price, rating, sentiment, skus, users, votesCount, votesRating]);

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

            {config.map(el => ((el.value || el.defaultValue)
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            && <Text variant="body-2" key={el.property} decoratorStart={<Symbol source={el.icon} color={el.iconColor} weight="solid" />} decoratorSize="small"><b>{el.value || el.defaultValue}</b></Text>
            ))}

          </Stack>
        )}
    </div>
  );
}) as PolymorphicProductCardKpis;

ProductCardKpis.displayName = 'ProductCard.Kpis';

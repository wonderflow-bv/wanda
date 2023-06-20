import clsx from 'clsx';
import { SymbolNames } from 'packages/symbols/dist';
import { forwardRef, ReactElement, useMemo } from 'react';

import {
  Polymorphic, Skeleton, Stack, Symbol, Text,
} from '@/components';

import * as styles from './product-card-kpi.module.css';

export type ProductCardKpisProps = {
  /**
   * Set the stars rating value
   */
  rating?: string;
  /**
   * Set the feedback count value
   */
  feedbackCount?: string;
  /**
   * Set the votes count value
   */
  votesCount?: string;
  /**
   * Set the votes rating value
   */
  votesRating?: string;
  /**
   * Set the sentiment index value
   */
  sentiment?: string;
  /**
   * Set the NPS value
   */
  nps?: string;
  /**
   * Set the groups value
   */
  groups?: string;
  /**
   * Set the price value
   */
  price?: string;
  /**
   * Set the users value
  */
  users?: string;
  /**
  * Set the SKUs value
  */
  skus?: string;
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
  isLoading = false,
  className,
}, forwardedRef) => {
  const config: KpiItemType[] = useMemo(() => ([
    {
      property: 'rating',
      value: rating,
      icon: 'star',
      iconColor: 'orange',
      defaultValue: undefined,
    },
    {
      property: 'feedback-count',
      value: feedbackCount,
      icon: 'file-alt',
      iconColor: undefined,
      defaultValue: '0',
    },
    {
      property: 'votes-count',
      value: votesCount,
      icon: 'thumbs-up',
      iconColor: undefined,
      defaultValue: '0',
    },
    {
      property: 'votes-rating',
      value: votesRating,
      icon: 'arrow-trend-up',
      iconColor: undefined,
      defaultValue: '0',
    },
    {
      property: 'sentiment',
      value: sentiment,
      icon: 'hearts-suit',
      iconColor: 'red',
      defaultValue: '0',
    },
    {
      property: 'nps',
      value: nps,
      icon: 'nps',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'groups',
      value: groups,
      icon: 'grid',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'price',
      value: price,
      icon: 'tags',
      iconColor: undefined,
      defaultValue: undefined,
    },
    {
      property: 'users',
      value: users,
      icon: 'users',
      iconColor: undefined,
      defaultValue: '0',
    },
    {
      property: 'skus',
      value: skus,
      icon: 'rectangle-barcode',
      iconColor: undefined,
      defaultValue: undefined,
    },
  ]), [feedbackCount, groups, nps, price, rating, sentiment, skus, users, votesCount, votesRating]);

  return (
    <div className={clsx(styles.Kpis, className)} ref={forwardedRef}>
      {isLoading
        ? (
          <Stack hPadding={24}>
            <Skeleton height="20px" width="50%" count={3} />
          </Stack>
        )
        : (
          <Stack rowGap={8} hPadding={24}>

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

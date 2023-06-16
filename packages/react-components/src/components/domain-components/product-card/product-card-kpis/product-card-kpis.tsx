import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  Polymorphic, Stack, Symbol, Text,
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
   * Set the votes value
   */
  votes?: string;
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
}

export type PolymorphicProductCardKpis = Polymorphic.ForwardRefComponent<'div', ProductCardKpisProps>;

export const ProductCardKpis = forwardRef(({
  rating,
  feedbackCount,
  votes,
  sentiment,
  nps,
  groups,
  price,
  users,
  skus,
  className,
}, forwardedRef) => (
  <div className={clsx(styles.Kpis, className)}>
    <Stack rowGap={8} hPadding={24} ref={forwardedRef}>

      <Text variant="body-2" decoratorStart={<Symbol source="star" color="orange" weight="solid" />} decoratorSize="small"><b>{rating || '0'}</b></Text>

      {feedbackCount && <Text variant="body-2" decoratorStart={<Symbol source="file-alt" weight="solid" />} decoratorSize="small"><b>{feedbackCount}</b></Text>}

      {votes && <Text variant="body-2" decoratorStart={<Symbol source="thumbs-up" weight="solid" />} decoratorSize="small"><b>{votes}</b></Text>}

      {sentiment && <Text variant="body-2" decoratorStart={<Symbol source="hearts-suit" color="red" weight="solid" />} decoratorSize="small"><b>{sentiment}</b></Text>}

      {nps && <Text variant="body-2" decoratorStart={<Symbol source="nps" weight="solid" />} decoratorSize="small"><b>{nps}</b></Text>}

      {groups && <Text variant="body-2" decoratorStart={<Symbol source="grid" weight="solid" />} decoratorSize="small"><b>{groups}</b></Text>}

      {price && <Text variant="body-2" decoratorStart={<Symbol source="tags" weight="solid" />} decoratorSize="small"><b>{price}</b></Text>}

      {users && <Text variant="body-2" decoratorStart={<Symbol source="users" weight="solid" />} decoratorSize="small"><b>{users}</b></Text>}

      {skus && <Text variant="body-2" decoratorStart={<Symbol source="rectangle-barcode" weight="solid" />} decoratorSize="small"><b>{skus}</b></Text>}

    </Stack>
  </div>
)) as PolymorphicProductCardKpis;

ProductCardKpis.displayName = 'ProductCard.Kpis';

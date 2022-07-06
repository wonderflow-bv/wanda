import {
  Card, Polymorphic,
  Symbol, SymbolProps,
} from '@wonderflow/react-components';
import { forwardRef } from 'react';

import styles from './banner.module.css';

type BannerProps = {
  icon?: SymbolProps['source'];
}

type PolymorphicBanner = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Card>,
Polymorphic.OwnProps<typeof Card> & BannerProps
>;

export const Banner = forwardRef(({
  children,
  icon,
  ...props
}, forwardedRef) => (
  <Card
    ref={forwardedRef}
    className={styles.Banner}
    bordered
    padding={24}
    highlightOnHover
    columnGap={16}
    left={icon && <Symbol className={styles.Icon} dimension={32} weight="duotone" source={icon} />}
    {...props}
  >
    {children}
  </Card>
)) as PolymorphicBanner;


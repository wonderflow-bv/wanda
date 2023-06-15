import clsx from 'clsx';
import React, { forwardRef } from 'react';

import {
  ClampText,
  Elevator,
  IconButton,
  Polymorphic, Stack,
  Symbol, Text,
} from '@/components';

import * as styles from './product-card.module.css';

export type ProductCardProps = {
  /**
   * Set the direction of the component.
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Add a border to the card to increase its visual weight and contrast.
   */
  bordered?: boolean;
  /**
   * Change the background color of the card when it is hovered.
   */
  highlightOnHover?: boolean;
  /**
   * Add content on the footer.
   */
  footer?: React.ReactNode;
}

type PolymorphicProductCard = Polymorphic.ForwardRefComponent<'div', ProductCardProps>;

export const ProductCard = forwardRef(({
  as: Wrapper = 'div',
  direction = 'vertical',
  footer,
  bordered = false,
  highlightOnHover = false,
  className,
  style,
  children,
  ...otherProps
}, forwardedRef) => (
  <Elevator resting={1} hover={highlightOnHover ? 2 : undefined}>
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Card, className)}
      style={{ ...style }}
      data-card-bordered={bordered}
      data-card-highlight-hover={highlightOnHover}
      {...otherProps}
    >
      <Stack
        data-inner-element="ProductCard-Container"
        direction="row"
        className={styles.Row}
        fill={false}
      >
        <Stack
          direction={direction === 'vertical' ? 'column' : 'row'}
          className={styles.Direction}
          data-inner-element="ProductCard-Direction"
        >
          <div data-inner-element="ProductCard-Media">
            <img
              src="https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png"
              alt="caption"
              width="100%"
              height="auto"
            />
          </div>

          <Stack rowGap={16} direction="column" data-inner-element="ProductCard-Main">
            <Stack rowGap={8} vPadding={16} direction="row" hPadding={24} data-inner-element="ProductCard-Header">
              <Stack rowGap={8}>
                <div>
                  <Text variant="subtitle-2">subtitle</Text>

                  <div>
                    <ClampText rows={3} style={{ height: '84px' }}>
                      <Text variant="heading-6">
                        Title
                      </Text>
                    </ClampText>
                  </div>
                </div>

                <div>
                  <ClampText rows={3} style={{ height: '60px' }}>
                    <Text variant="body-2">
                      description
                    </Text>
                  </ClampText>
                </div>
              </Stack>

              <div style={{ maxWidth: '1.5rem' }}>
                <IconButton icon="more-vert" kind="flat" dimension="small" />
              </div>
            </Stack>

            <Stack rowGap={8} hPadding={24} data-inner-element="ProductCard-KPIs">
              <Text variant="body-2" decoratorStart={<Symbol source="star" color="orange" weight="solid" />} decoratorSize="small"><b>4.2</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="file-alt" weight="solid" />} decoratorSize="small"><b>1.2</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="thumbs-up" weight="solid" />} decoratorSize="small"><b>234,212312</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="hearts-suit" color="red" weight="solid" />} decoratorSize="small"><b>1.2</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="grid" weight="solid" />} decoratorSize="small"><b>12</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="tags" weight="solid" />} decoratorSize="small"><b>€12</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="users" weight="solid" />} decoratorSize="small"><b>12</b></Text>
              <Text variant="body-2" decoratorStart={<Symbol source="rectangle-barcode" weight="solid" />} decoratorSize="small"><b>1.2</b></Text>
            </Stack>

            <Stack hPadding={24} data-inner-element="ProductCard-Children">
              {children}
            </Stack>

            <Stack hPadding={24} vPadding={16} data-inner-element="ProductCard-Footer">
              {footer}
            </Stack>
          </Stack>

        </Stack>

      </Stack>
    </Wrapper>
  </Elevator>
)) as PolymorphicProductCard;

ProductCard.displayName = 'ProductCard';

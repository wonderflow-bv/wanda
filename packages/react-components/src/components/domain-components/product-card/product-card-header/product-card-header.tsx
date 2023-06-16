import { forwardRef } from 'react';

import {
  ClampText, Elevator, IconButton,
  Polymorphic, Popover, Stack, Text,
} from '@/components';

import * as styles from './product-card-header.module.css';

export type ProductCardHeaderProps = {
  /**
   *
   */
  subtitle?: string;
  /**
   *
   */
  title?: string;
  /**
   *
   */
  titleRows?: number;
  /**
   *
   */
  description?: string;
  /**
   *
   */
  descriptionRows?: number;
  /**
   *
   */
  menuActions?: React.ReactNode;
}

export type PolymorphicProductCardHeader = Polymorphic.ForwardRefComponent<'div', ProductCardHeaderProps>;

export const ProductCardHeader = forwardRef(({
  subtitle,
  title,
  titleRows = 3,
  description,
  descriptionRows = 3,
  menuActions,
}, forwardedRef) => (
  <Stack columnGap={8} vPadding={16} direction="row" hPadding={24} ref={forwardedRef}>
    <Stack rowGap={8}>
      <div>
        {subtitle && <Text variant="subtitle-2">{subtitle}</Text>}

        {title && (
          <div className={styles.Title}>
            <ClampText rows={titleRows}>
              <Text variant="heading-6">
                {title}
              </Text>
            </ClampText>
          </div>
        )}
      </div>

      {description && (
        <div className={styles.Description}>
          <ClampText rows={descriptionRows}>
            <Text variant="body-2">
              {description}
            </Text>
          </ClampText>
        </div>
      )}
    </Stack>

    {menuActions && (
      <Stack maxWidth="1.5rem" fill={false}>
        <Popover
          trigger={<IconButton icon="more-vert" kind="flat" dimension="small" />}
          placement="bottom-start"
          offset={8}
          closeOnOutsideClick
        >
          <Elevator resting={1}>
            <>
              {menuActions}
            </>
          </Elevator>
        </Popover>

      </Stack>
    )}
  </Stack>

)) as PolymorphicProductCardHeader;

ProductCardHeader.displayName = 'ProductCardHeader';

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

import { forwardRef } from 'react';

import {
  ClampText, Elevator, IconButton,
  Polymorphic, Popover, Skeleton, Stack, Text,
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
  /**
   *
   */
  isLoading?: boolean;
}

export type PolymorphicProductCardHeader = Polymorphic.ForwardRefComponent<'div', ProductCardHeaderProps>;

export const ProductCardHeader = forwardRef(({
  subtitle,
  title,
  titleRows = 3,
  description,
  descriptionRows = 3,
  menuActions,
  isLoading = false,
}, forwardedRef) => (
  <>

    {
    isLoading
      ? (
        <Stack direction="row" vPadding={16} hPadding={24} columnGap={8}>
          <Stack style={{ width: '100%' }} rowGap={8}>
            <div>
              {subtitle && <Skeleton count={1} width="50%" />}
              {title && <div style={{ height: '84px' }}><Skeleton count={1} height="28px" width="60%" /></div>}
            </div>
            {description && <div style={{ height: '60px' }}><Skeleton count={1} width="80%" /></div>}
          </Stack>
          {menuActions && <Skeleton count={1} width="24px" height="24px" />}
        </Stack>
      )
      : (
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
      )
  }
  </>
)) as PolymorphicProductCardHeader;

ProductCardHeader.displayName = 'ProductCardHeader';

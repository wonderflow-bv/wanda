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
  ClampText, Skeleton, Stack, Text,
} from '@/components';

export type ProductCardHeaderProps = {
  /**
   * Set the subtitle or product brand.
   */
  subtitle?: string;
  /**
   * Set the title or product name.
   */
  title?: string;
  /**
   * Define how many lines the title should be clamped to.
   */
  titleRows?: number;
  /**
   * Set a description text.
   */
  description?: string;
  /**
   * Define how many lines the description should be clamped to.
   */
  descriptionRows?: number;
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
}

export type ProductCardHeaderComponent = React.ForwardRefExoticComponent<ProductCardHeaderProps>;

export const ProductCardHeader = forwardRef(({
  subtitle,
  title,
  titleRows = 3,
  description,
  descriptionRows = 3,
  isLoading = false,
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  if (isLoading) {
    return (
      <Stack rowGap={8} style={{ padding: '16px 16px 8px' }}>
        <div>
          {subtitle && <Skeleton count={1} width="50%" />}
          {title && <div><Skeleton count={1} height="28px" width="60%" /></div>}
        </div>
        {description && <div><Skeleton count={1} width="80%" /></div>}
      </Stack>
    );
  }

  return (
    <Stack rowGap={8} ref={forwardedRef} style={{ padding: '16px 16px 8px' }}>
      <div>
        {subtitle && <Text variant="subtitle-2">{subtitle}</Text>}

        {title && (
          <ClampText rows={titleRows}>
            <Text variant="heading-6">
              {title}
            </Text>
          </ClampText>
        )}
      </div>

      {description && (
        <ClampText rows={descriptionRows}>
          <Text variant="body-2">
            {description}
          </Text>
        </ClampText>
      )}
    </Stack>
  );
}) as ProductCardHeaderComponent;

ProductCardHeader.displayName = 'ProductCardHeader';

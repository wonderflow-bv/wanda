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

import { forwardRef, PropsWithChildren } from 'react';

import {
  Skeleton, Stack,
} from '@/components';

export type ProductCardFooterProps = PropsWithChildren<{
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
}>

export type ProductCardFooterComponent = React.ForwardRefExoticComponent<ProductCardFooterProps>;

export const ProductCardFooter = forwardRef(({
  isLoading = false,
  children,
  ...otherProps
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => (
  <Stack
    hPadding={24}
    vPadding={24}
    style={{ padding: children ? undefined : '0 24px 24px' }}
    {...otherProps}
    ref={forwardedRef}
  >
    {isLoading ? <Skeleton height="24px" style={{ lineHeight: '1.5rem' }} /> : children}
  </Stack>
)) as ProductCardFooterComponent;

ProductCardFooter.displayName = 'ProductCardFooter';

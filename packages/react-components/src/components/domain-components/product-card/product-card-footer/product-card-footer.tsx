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
import { forwardRef } from 'react';

import {
  Polymorphic, Skeleton, Stack, StackProps,
} from '@/components';

export type ProductCardFooterProps = {
  /**
   *
   */
  isLoading?: boolean;
}

export type PolymorphicProductCardFooter = Polymorphic.ForwardRefComponent<'div', StackProps & ProductCardFooterProps>;

export const ProductCardFooter = forwardRef(({
  as: Wrapper = 'div',
  isLoading = false,
  children,
  className,
  style,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(className)}
    style={{ ...style }}
    {...otherProps}
  >
    <Stack hPadding={24} vPadding={16} {...otherProps}>
      {isLoading ? <Skeleton height="24px" style={{ lineHeight: '1.5rem' }} /> : children}
    </Stack>
  </Wrapper>
)) as PolymorphicProductCardFooter;

ProductCardFooter.displayName = 'ProductCardFooter';

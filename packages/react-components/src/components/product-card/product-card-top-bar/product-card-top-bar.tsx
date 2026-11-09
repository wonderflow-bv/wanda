/*
 * Copyright 2026 Wonderflow Design Team
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

import { Skeleton, Text } from '@/components';

import * as styles from './product-card-top-bar.module.css';

export type ProductCardTopBarProps = PropsWithClass<{
  /**
   * Set the name of the marketplace the product comes from.
   */
  sourceLabel?: string;
  /**
   * Set the logo of the marketplace, displayed in a 16px slot before the label.
   */
  sourceIcon?: React.ReactNode;
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
}>

export type ProductCardTopBarComponent = React.ForwardRefExoticComponent<ProductCardTopBarProps>;

export const ProductCardTopBar = forwardRef(({
  sourceLabel,
  sourceIcon,
  isLoading = false,
  className,
  style,
  ...otherProps
}, forwardedRef: React.ForwardedRef<HTMLDivElement>) => (
  <div
    ref={forwardedRef}
    className={clsx(styles.TopBar, className)}
    style={style}
    {...otherProps}
  >
    <div className={styles.Dots} aria-hidden="true">
      <span className={styles.Dot} />
      <span className={styles.Dot} />
      <span className={styles.Dot} />
    </div>

    {isLoading
      ? <Skeleton width="96px" height="23px" borderRadius={8} />
      : (
        <div className={styles.Pill}>
          {sourceIcon && <span className={styles.Icon}>{sourceIcon}</span>}
          <Text variant="body-3">{sourceLabel}</Text>
        </div>
      )}
  </div>
)) as ProductCardTopBarComponent;

ProductCardTopBar.displayName = 'ProductCardTopBar';

/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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

import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { CSSProperties, Fragment, useCallback } from 'react';
import { useUIDSeed } from 'react-uid';

import * as styles from './skeleton.module.css';

export type SkeletonProps = {
  /**
   * Set the edge radius of each skeleton block.
   * This value must be one of the available `radius` tokens
   */
  borderRadius?: TokensTypes['radius'];
  /**
   * Set the block to be a circle, ignoring the `borderRadius` property.
   */
  circle?: boolean;
  /**
   * Set how many skeleton blocks to display.
   */
  count?: number;
  /**
   * Set the width of each skeleton block.
   */
  width?: string | number;
  /**
   * Set the height of each skeleton block.
   */
  height?: string | number;
  /**
   * Renders every block on their own line or in a single line.
   *
   * Note: By default, if a width is not specified, every items will fill the available space
   */
  inline?: boolean;
  /**
   * Enable the shim animation and the announcement of the loading state.
   */
  enableAnimation?: boolean;
  /**
   * Set the gap between stacked skeleton items.
   */
  gap?: TokensTypes['space'];
}

export const Skeleton: FCChildrenClass<SkeletonProps> = ({
  className,
  borderRadius = 4,
  style,
  width,
  height,
  count = 1,
  gap,
  enableAnimation = true,
  inline,
  circle,
  ...otherProps
}) => {
  const uid = useUIDSeed();
  const computedWidth = typeof width === 'number' ? `${width}px` : width;
  const computedHeight = typeof height === 'number' ? `${height}px` : height;

  const SkeletonItem = useCallback(() => {
    const dynamicStyle: CSSProperties = {
      '--radius': borderRadius && tkns.radius[borderRadius],
      '--width': width && computedWidth,
      '--height': height && computedHeight,
      '--gap': gap ? tkns.space[gap] : undefined,
    };

    return (
      <span
        className={styles.SkeletonItem}
        data-skeleton-circle={circle}
        data-skeleton-animated={enableAnimation}
        style={{ ...dynamicStyle, ...style }}
      >
        &zwnj;
      </span>
    );
  }, [borderRadius, width, computedWidth, height, computedHeight, gap, circle, enableAnimation, style]);

  return (
    <span
      className={className}
      aria-live="polite"
      aria-busy={enableAnimation}
      {...otherProps}
    >
      {
        Array.from({ length: count }).map((_, i) => (inline
          ? <SkeletonItem key={uid(i)} />
          : (
            <Fragment key={uid(i)}>
              <SkeletonItem />
              <br />
            </Fragment>
          )))}
    </span>
  );
};

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
import { forwardRef, useMemo } from 'react';

import {
  AspectRatio,
  Grid,
  Polymorphic, Skeleton,
} from '@/components';

import * as styles from './product-card-media.module.css';

export type ProductCardMediaProps = {
  /**
   * Set an array of paths to the images.
   */
  source?: string[];
  /**
   * Set the ratio following the CSS syntax.
   */
  ratio?: string;
  /**
   * Set the loading state showing a skeleton.
   */
  isLoading?: boolean;
}

export type PolymorphicProductCardMedia = Polymorphic.ForwardRefComponent<'div', ProductCardMediaProps>

type ImageConfig = {
  row: string;
  col: string;
  val: string;
}

export const ProductCardMedia = forwardRef(({
  as: Wrapper = 'div',
  source = [],
  ratio = '1',
  isLoading = false,
  className,
  style,
  ...otherProps
}, forwardedRef) => {
  const s = useMemo(() => {
    const t: ImageConfig[] = source.slice(0, 4).map((el: string, i: number) => ({
      row: i < 2 ? '1' : '2',
      col: i % 2 === 0 ? '1' : '2',
      val: el,
    }));

    if (t.length === 3) t[1].row = '1 / 3';

    return t;
  }, [source]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Media, className)}
      style={{ ...style }}
      {...otherProps}
    >
      <AspectRatio ratio={ratio}>

        {isLoading
          ? (
            <Skeleton
              style={{ borderRadius: '0', lineHeight: '2rem' }}
              width="inherit"
              height="inherit"
            />
          )
          : (
            <Grid
              aria-label=""
              rows={s.length > 2 ? 2 : 1}
              rowMinHeight="1fr"
              columns={s.length > 2 ? 2 : 1}
              colMinWidth="1fr"
            >
              {s.map((el: ImageConfig) => (
                <Grid.Item
                  key={`${el.val}-${el.row}-${el.col}`}
                  className={styles.Image}
                  row={el.row}
                  column={el.col}
                  style={{ backgroundImage: `url("${el.val}")` }}
                />
              ))}
            </Grid>
          )
    }
      </AspectRatio>
    </Wrapper>
  );
}) as PolymorphicProductCardMedia;

ProductCardMedia.displayName = 'ProductCardMedia';

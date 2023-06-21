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
  Masonry, Polymorphic, Skeleton,
} from '@/components';

import * as styles from './product-card-media.module.css';

export type ProductCardMediaProps = {
  source?: string | string[];
  ratio?: string;
  isLoading?: boolean;
}

export type PolymorphicProductCardMedia = Polymorphic.ForwardRefComponent<'div', ProductCardMediaProps>

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
    if (typeof source === 'string') {
      return [source];
    }

    return source.slice(0, 4);
  }, [source]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Media, className)}
      style={{ ...style }}
      {...otherProps}
    >
      <AspectRatio ratio={ratio}>

        {isLoading && (
          <Skeleton
            style={{ borderRadius: '0px', lineHeight: '2rem' }}
            width="inherit"
            height="inherit"
          />
        )}

        {!isLoading
      && (
        <Masonry columns={s.length < 2 ? 1 : 2} gutter={0} className={styles.Item}>
          {s.map((el: string, i: number) => (
            <img
              key={el}
              src={el}
              alt={`product-${i + 1}`}
              width="auto"
              height="auto"
            />
          ))}
        </Masonry>

      )
    }
      </AspectRatio>
    </Wrapper>
  );
}) as PolymorphicProductCardMedia;

ProductCardMedia.displayName = 'ProductCardMedia';

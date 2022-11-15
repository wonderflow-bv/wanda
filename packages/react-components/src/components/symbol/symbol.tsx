/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

import { SymbolNames } from '@wonderflow/symbols';
// eslint-disable-next-line import/extensions
import sprite from '@wonderflow/symbols/sprite.svg';
import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import clsx from 'clsx';
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  SVGAttributes,
  useMemo,
} from 'react';

import * as styles from './symbol.module.css';

export type SymbolProps = SVGAttributes<SVGElement | SVGSVGElement> & {
  /**
   * Set the icon name to display. Icon names are defined in
   * the `SymbolNames` enum and are part of Wanda's symbols system.
   *
   * Available icons: https://design.wonderflow.ai/get-started/symbols
   */
  source: SymbolNames | ReactElement<HTMLOrSVGElement>;
  /**
   * Set the size of the icon. To improve readability at any size, the style of the icon
   * is automatically defined based on the dimension.
   */
  dimension?: TokensTypes['icon']['size'];
  /**
   * Set the weight of the icon.
   * The default weight is `outline` if `dimension` is greather than `12` or `undefined`.
   * If `dimension` is set to `12`, the weight is ignored and the icon forced to use
   * the `solid` style to improve the readability.
  */
  weight?: 'solid' | 'outline' | 'duotone';
}

export const Symbol = forwardRef<SVGSVGElement, SymbolProps>(({
  className,
  source,
  dimension = 16,
  weight = 'outline',
  fill,
  ...otherProps
}: SymbolProps, forwardedRef) => {
  const computedStyle = useMemo(() => (dimension < 18 ? 'solid' : weight), [weight, dimension]);

  return (typeof source === 'string')
    ? (
      <svg
        aria-hidden="true"
        width={dimension}
        height={dimension}
        fill={fill}
        className={clsx(styles.Icon, className)}
        ref={forwardedRef}
        {...otherProps}
      >
        <use href={`${sprite}#${computedStyle}/${source}`} />
      </svg>
    )
    : (
      <>
        {Children.map(source, (child: ReactElement) => cloneElement(
          child,
          {
            className,
            'aria-hidden': 'true',
            width: dimension,
            height: dimension,
          },
        ))}
      </>
    );
});

Symbol.displayName = 'Symbol';

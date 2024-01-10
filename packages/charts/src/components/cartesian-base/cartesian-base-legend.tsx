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

import {
  forwardRef,
} from 'react';

import { useDataContext } from '../../providers/data';
import { Placeholder } from '../placeholder';
import styles from './cartesian-base.module.css';

export type CartesianBaseLegendProps = {
  customLegend?: React.ReactNode;
  isVisible?: boolean;
  onMouseOver: (key: string) => void;
}

export const CartesianBaseLegend: React.ForwardRefExoticComponent<
CartesianBaseLegendProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, CartesianBaseLegendProps>(({
  customLegend,
  isVisible = true,
  onMouseOver,
}: CartesianBaseLegendProps,
forwardedRef) => {
  const { metadata } = useDataContext();

  if (!isVisible) return null;

  if (customLegend) {
    return (
      <div ref={forwardedRef} className={styles.Legend}>
        <div className={styles.LegendContent}>
          {customLegend}
        </div>
      </div>
    );
  }

  if (metadata) {
    const { names, colors, dataKey: sdk } = metadata.series;
    const { name, color, dataKey: odk } = metadata.overlay;

    return (
      <div ref={forwardedRef} className={styles.Legend}>
        <div className={styles.LegendContent}>
          {customLegend
        ?? (
          <ul>
            {sdk.map((s: string, i: number) => (
              <li
                key={s}
                onMouseOver={() => onMouseOver(s)}
                onMouseLeave={() => onMouseOver('')}
                onFocus={() => ({})}
              >
                <div>
                  <Placeholder color={colors[i]} />
                  <span>
                    {names[i]}
                  </span>
                </div>
              </li>
            ))}

            {odk && (
              <li
                onMouseOver={() => onMouseOver(odk)}
                onMouseLeave={() => onMouseOver('')}
                onFocus={() => ({})}
              >
                <div>
                  <Placeholder color={color} />
                  <span>
                    {name}
                  </span>
                </div>
              </li>
            )}
          </ul>
        )}
        </div>
      </div>
    );
  }

  return null;
});

CartesianBaseLegend.displayName = 'CartesianBaseLegend';


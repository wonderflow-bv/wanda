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
import { v4 as uuid } from 'uuid';

import { useDataContext } from '../../providers/data';
import { Placeholder } from '../placeholder';
import styles from './cartesian-base.module.css';

export type CartesianBaseLegendProps = {
  customLegend?: React.ReactNode;
  isVisible?: boolean;
  onMouseOver: (key: string) => void;
}

export const CartesianBaseLegend = forwardRef<HTMLDivElement, CartesianBaseLegendProps>(({
  customLegend,
  isVisible = true,
  onMouseOver,
}: CartesianBaseLegendProps,
forwardedRef) => {
  const { metadata } = useDataContext();

  if (!isVisible) return null;

  if (customLegend) {
    return (
      <div ref={forwardedRef} className={styles.Legend} role="presentation">
        <div className={styles.LegendContent}>
          {customLegend}
        </div>
      </div>
    );
  }

  if (metadata) {
    const { names: sn, colors: sc, dataKey: sdk } = metadata.series;
    const { names: on, colors: oc, dataKey: odk } = metadata.overlay;

    return (
      <div
        aria-hidden={!isVisible}
        data-testid="legend"
        className={styles.Legend}
        ref={forwardedRef}
        role="presentation"
      >
        <div
          className={styles.LegendContent}
          onMouseOut={() => onMouseOver('')}
          onBlur={() => ({})}
        >
          <ul>
            {sdk.map((s: string, i: number) => (
              <li
                key={uuid()}
                aria-label={sn[i]}
                aria-live="polite"
                data-testid="legend-item"
                onMouseOver={() => onMouseOver(s)}
                onMouseLeave={() => onMouseOver('')}
                onMouseOut={() => onMouseOver('')}
                onFocus={() => ({})}
                onBlur={() => ({})}
              >
                <div>
                  <Placeholder color={sc[i]} />
                  <span>
                    {sn[i]}
                  </span>
                </div>
              </li>
            ))}

            {odk?.map((s: string, i: number) => (
              <li
                key={uuid()}
                aria-label={on![i]}
                aria-live="polite"
                data-testid="overlay-legend-item"
                onMouseOver={() => onMouseOver(s)}
                onMouseLeave={() => onMouseOver('')}
                onMouseOut={() => onMouseOver('')}
                onFocus={() => ({})}
                onBlur={() => ({})}
              >
                <div>
                  <Placeholder color={oc![i]} />
                  <span>
                    {on![i]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
});

CartesianBaseLegend.displayName = 'CartesianBaseLegend';


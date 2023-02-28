/*
 * Copyright 2022-2023 Wonderflow Design Team
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
import {
  CSSProperties, forwardRef, useCallback, useMemo,
} from 'react';

import * as styles from './circular-progress.module.css';

export type CircularProgressProps = {
  /**
   * Set the current progress of the progress bar.
   * This value should be between 0 and 'max'. The percentage is
   * automatically computed.
   */
  value: number;
  /**
   * Set the max value of the progress bar. This determines the
   * computed percentage.
   */
  max?: number;
  /**
   * Set the dimension of the progress bar.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Show or hide the progress value.
   */
  showProgress?: boolean;
}

export const CircularProgress = forwardRef<HTMLDivElement, PropsWithClass<CircularProgressProps>>(({
  className,
  value,
  max = 100,
  dimension = 'regular',
  showProgress,
  style,
  ...otherProps
}, forwardedRef) => {
  const getPercentage = useCallback(
    () => (value ? Math.round((100 * value) / max) : 0),
    [max, value],
  );

  const clamp = useMemo(() => (num: number, min: number, max: number) => Math.min(Math.max(num, min), max), []);

  const dynamicStyle: CSSProperties = {
    '--progress': `${getPercentage()}%`,
  };

  return (
    <div
      ref={forwardedRef}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={clsx(styles.CircularProgress, className)}
      data-circular-progress={clamp(getPercentage(), 0, 100)}
      data-circular-progress-dimension={dimension}
      data-circular-progress-show-progress={showProgress}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    />
  );
});

CircularProgress.displayName = 'CircularProgress';

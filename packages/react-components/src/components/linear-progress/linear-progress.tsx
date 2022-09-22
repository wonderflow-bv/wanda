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

import clsx from 'clsx';
import { forwardRef, ProgressHTMLAttributes, useCallback } from 'react';

import { Text } from '@/components';

import * as styles from './linear-progress.module.css';

export type LinearProgressProps = ProgressHTMLAttributes<HTMLProgressElement> & {
  /**
   * Set the current progress of the progress bar.
   * This value should be between 0 and 'max'. The percentage is
   * automatically computed.
   */
  value?: number;
  /**
   * Set the max value of the progress bar. This determines the
   * computed percentage.
   */
  max?: number;
  /**
   * Set the dimension of the progress bar.
   */
  dimension?: 'regular' | 'big';
  /**
   * Show or hide the progress value.
   */
  showProgress?: boolean;
}

export const LinearProgress = forwardRef<HTMLProgressElement, LinearProgressProps>(({
  className,
  value,
  max = 100,
  dimension = 'regular',
  showProgress,
  ...otherProps
}, forwardedRef) => {
  const getPercentage = useCallback(
    () => (value ? Math.round((100 * value) / max) : 0),
    [max, value],
  );

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  return (
    <div
      className={clsx(styles.LinearProgress, className)}
    >
      <progress
        ref={forwardedRef}
        className={styles.Progress}
        data-progress-dimension={dimension}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuemax={max}
        value={value}
        max={max}
        {...otherProps}
      />
      {(showProgress) && (
        <Text
          as="span"
          className={styles.Percentage}
          style={{
            '--offset': `${getPercentage()}%`,
            '--translation': value !== 0 ? '-100%' : '-50%',
          }}
          weight="bold"
          size={dimension === 'regular' ? 16 : 18}
        >
          {value && clamp(getPercentage(), 0, 100)}
        </Text>
      )}
    </div>
  );
});

LinearProgress.displayName = 'LinearProgress';

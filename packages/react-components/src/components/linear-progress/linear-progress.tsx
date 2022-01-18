import { forwardRef, ProgressHTMLAttributes, useCallback } from 'react'
import { Text } from '../..'
import clsx from 'clsx'

import styles from './linear-progress.module.css'

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
    () => value ? Math.round((100 * value) / max) : 0,
    [max, value]
  )

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

  return (
    <div
      className={clsx(styles.LinearProgress, className)}
    >
      <progress
        role="progressbar"
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
            '--translation': value !== 0 ? '-100%' : '-50%'
          }}
          weight="bold"
          size={dimension === 'regular' ? 16 : 18}
        >
          {value && clamp(getPercentage(), 0, 100)}
        </Text>
      )}
    </div>
  )
})

LinearProgress.displayName = 'LinearProgress'

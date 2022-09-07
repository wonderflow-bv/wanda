import clsx from 'clsx';
import {
  CSSProperties, forwardRef, ReactNode, useState,
} from 'react';

import { Polymorphic, ToggleButton, Tooltip } from '@/components';

import * as styles from './clamp-text.module.css';

export type ClampTextProps = {
  /**
   * The text content to be displayed and clamped
   */
  children: ReactNode;
  /**
   * Define how many lines the text should be clamped to.
   */
  rows?: number;
  /**
   * Show the full text when element is hovered with pointer.
   */
  expandable?: boolean;
}

type PolymorphicClampText = Polymorphic.ForwardRefComponent<'div', ClampTextProps>;

export const ClampText = forwardRef(({
  className,
  children,
  rows = 1,
  style,
  expandable,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  const [isExpanded, setIsExpandend] = useState(false);

  const dynamicStyle: CSSProperties = {
    '--r': rows,
    '--padding': expandable && '2rem',
  };

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.ClampText, className)}
      {...otherProps}
    >
      <span
        className={styles.Content}
        data-clamp-text-expanded={isExpanded}
        style={{ ...dynamicStyle, ...style }}
      >
        {children}
      </span>
      {expandable && (
        <Tooltip trigger={(
          <ToggleButton
            className={styles.Trigger}
            pressed={isExpanded}
            onClick={() => setIsExpandend(state => !state)}
            restingIcon="plus"
            pressedIcon="minus"
            dimension="small"
            kind="secondary"
          />
        )}
        >
          {`${isExpanded ? 'Collapse' : 'Expand'} text`}
          {' '}
          text
        </Tooltip>
      )}
    </Wrapper>
  );
}) as PolymorphicClampText;

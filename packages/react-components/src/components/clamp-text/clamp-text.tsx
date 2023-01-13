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
        </Tooltip>
      )}
    </Wrapper>
  );
}) as PolymorphicClampText;

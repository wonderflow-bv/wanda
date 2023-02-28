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
  domMax, LazyMotion, m,
} from 'framer-motion';
import {
  CSSProperties,
  DetailsHTMLAttributes, forwardRef,
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Symbol, SymbolProps, Text, TextProps,
} from '@/components';

import * as styles from './disclosure.module.css';

export type DisclosureProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  /**
   * Set the initial state of the disclosure.
   */
  open?: boolean;
  /**
   * Define the text to be displayed as the summary of the disclosure.
   * This should generally be a short sentenc and related to the content
   */
  summary: ReactNode;
  /**
   * Remove or add a padding to align the content with the icon indicator.
   * This is useful when the content inside starts with text and you want to align it
   * summary to improve readability.
   */
  padding?: boolean;
  /**
   * Set the max height of the content after which the scrollbar will appear.
   */
  contentMaxHeight?: string;
  /**
   * Set the dimension of the summary toggle
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set the position of the icon indicator. The content padding is automatically
   * applied based on the icon position.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Set or disable the interactivity of the summary toggle.
   * Eg. If `open` is set to `true` the content can't be toggled.
   */
  expandable?: boolean;
}

export const Disclosure = forwardRef<HTMLDetailsElement, DisclosureProps>(({
  children,
  open = false,
  padding = true,
  className,
  summary,
  contentMaxHeight,
  dimension = 'regular',
  iconPosition = 'left',
  expandable = true,
  style,
  onToggle,
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const seedID = useUIDSeed();

  useEffect(() => {
    if (ref.current) {
      ref.current.open = open;
    }
  }, [expandable, open]);

  const handleOpen = useCallback(
    () => () => {
      if (ref.current && expandable) setIsOpen(open || ref.current.open);
      if (expandable && open === undefined) onToggle?.(open || ref.current.open);
    },
    [expandable, onToggle, open],
  );

  const dynamicStyle: CSSProperties = {
    '--max-height': contentMaxHeight,
  };

  const sizes = {
    small: {
      summary: 16,
      icon: 12,
    },
    regular: {
      summary: 18,
      icon: 18,
    },
    big: {
      summary: 22,
      icon: 24,
    },
  };

  return (
    <details
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.Disclosure, className)}
      data-testid="Disclosure"
      data-disclosure-icon-position={iconPosition}
      data-disclosure-dimension={dimension}
      data-disclosure-expandable={expandable}
      onToggle={handleOpen()}
      ref={ref}
      open={isOpen}
      {...otherProps}
    >
      <Text
        as="summary"
        responsive={false}
        className={styles.Summary}
        id={seedID('disclosure')}
        size={sizes[dimension].summary as TextProps['size']}
        weight="bold"
      >
        {summary}
        {expandable && (
          <Symbol
            className={styles.ExpandIcon}
            source="chevron-right"
            dimension={sizes[dimension].icon as SymbolProps['dimension']}
          />
        )}
      </Text>
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          data-disclosure-padding={padding}
          data-disclosure-height={Boolean(contentMaxHeight)}
          animate={isOpen ? { y: 5, opacity: 1, height: 'auto' } : {
            y: 0, opacity: 0, height: 0, overflow: 'hidden',
          }}
          transition={{ ease: 'easeOut', duration: 0.2, delay: 0 }}
          initial={false}
          role="region"
          aria-labelledby={seedID('disclosure')}
        >
          {children}
        </m.div>
      </LazyMotion>
    </details>
  );
});

Disclosure.displayName = 'Disclosure';

import clsx from 'clsx';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'framer-motion';
import {
  CSSProperties,
  DetailsHTMLAttributes, forwardRef,
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';
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
  const summaryRef = useRef<any>(null);
  const ref = useRef<any>(forwardedRef);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(summaryRef, false);
  const seedID = useUIDSeed();

  useFocusEffect(focused, summaryRef);

  useEffect(() => {
    if (ref.current) {
      ref.current.open = open;
    }
  }, [expandable, open]);

  const handleOpen = useCallback(
    () => () => {
      if (ref.current && expandable) setIsOpen(ref.current.open);
      if (expandable) onToggle?.(ref.current.open);
    },
    [expandable, onToggle],
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

  // const renderContent = useCallback(
  //   () => (
  //     <m.div
  //       className={styles.Content}
  //       data-disclosure-padding={padding}
  //       data-disclosure-height={Boolean(contentMaxHeight)}
  //       animate={isOpen ? { y: 5, opacity: 1 } : { y: 0, opacity: 0 }}
  //       transition={{ ease: 'easeOut', duration: 0.1, delay: isOpen ? 0.1 : 0 }}
  //       initial={false}
  //       role="region"
  //       aria-labelledby={seedID('disclosure')}
  //     >
  //       {children}
  //     </m.div>
  //   ),
  //   [children, contentMaxHeight, padding, isOpen, seedID],
  // );

  return (
    <details
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.Disclosure, className)}
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
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        tabIndex={!expandable ? -1 : tabIndex}
        ref={summaryRef}
        id={seedID('disclosure')}
        size={dimension ? sizes[dimension].summary as TextProps['size'] : undefined}
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
        <AnimatePresence exitBeforeEnter>
          <m.div
            className={styles.Content}
            data-disclosure-padding={padding}
            data-disclosure-height={Boolean(contentMaxHeight)}
            animate={isOpen ? { y: 5, opacity: 1, height: 'auto' } : { y: 0, opacity: 0, height: 0 }}
            transition={{ ease: 'easeOut', duration: 0.2, delay: 0 }}
            initial={false}
            role="region"
            aria-labelledby={seedID('disclosure')}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </details>
  );
});

Disclosure.displayName = 'Disclosure';

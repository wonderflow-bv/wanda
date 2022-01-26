import {
  CSSProperties,
  DetailsHTMLAttributes, forwardRef,
  ReactNode, useCallback, useState
} from 'react'
import clsx from 'clsx'
import styles from './disclosure.module.css'
import { Text, TextProps, Icon, IconProps } from '../..'
import { motion } from 'framer-motion'

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
  ...otherProps
}, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(open)

  const handleOpen = useCallback(
    () => (event: any) => {
      event.preventDefault()
      expandable && setIsOpen(!isOpen)
    },
    [isOpen, expandable]
  )

  const dynamicStyle: CSSProperties = {
    '--maxHeight': contentMaxHeight
  }

  const sizes = {
    small: {
      summary: 16,
      icon: 12
    },
    regular: {
      summary: 18,
      icon: 16
    },
    big: {
      summary: 22,
      icon: 24
    }
  }

  const renderContent = useCallback(
    () => (
      <motion.div
        className={styles.Content}
        data-disclosure-padding={padding}
        data-disclosure-height={Boolean(contentMaxHeight)}
        animate={isOpen ? { y: 5, opacity: 1 } : { y: 0, opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
        initial={false}
      >
        {children}
      </motion.div>
    ),
    [children, contentMaxHeight, isOpen, padding]
  )

  return (
    <details
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.Disclosure, className)}
      data-disclosure-icon-position={iconPosition}
      data-disclosure-dimension={dimension}
      data-disclosure-expandable={expandable}
      aria-expanded={isOpen ? 'true' : 'false'}
      open={isOpen}
      ref={forwardedRef}
      {...otherProps}
    >
      <Text
        as="summary"
        onClick={handleOpen()}
        responsive={false}
        className={styles.Summary}
        aria-expanded={isOpen}
        tabIndex={!expandable ? -1 : 0}
        size={dimension ? sizes[dimension].summary as TextProps['size'] : undefined}
        weight="bold"
      >
        {summary}
        {expandable && (
          <Icon
            className={styles.ExpandIcon}
            source="chevron-right"
            dimension={sizes[dimension].icon as IconProps['dimension']}
          />
        )}
      </Text>
      {renderContent()}
    </details>
  )
})

Disclosure.displayName = 'Disclosure'

import { CSSProperties, forwardRef, PropsWithChildren, ReactNode } from 'react'
import { domMax, LazyMotion, m } from 'framer-motion'
import clsx from 'clsx'
import { FocusOn, AutoFocusInside } from 'react-focus-on'
import { useKeyPress } from 'ahooks'
import styles from './drawer.module.css'
import { useOverlayContext, Elevator, IconButton, Stack, Title } from '@/components'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'

export type DrawerProps = PropsWithChildren<PropsWithClass> & {
  /**
   * This enable the drawer to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the drawer.
   *
   * @important This property is considered only when `isModal` is `true`.
   */
  closeOnClickOutside?: boolean;
  /**
   * Set the accessible title of the drawer. This is used by screen readers to
   * announce the title of the drawer when opened.
   */
  title?: ReactNode;
  /**
   * Hide or show the drawer header which includes the title and the close button.
   * If you hide the title, make sure to add yuor own title element in order
   * to provide an accessible label to the drawer.
   */
  showHeader?: boolean;
  /**
   * Set the maximum width of the drawer, on mobile the drawer will be
   * automatically collapsed when the width is reached.
   */
  maxWidth?: string;
  /**
   * Set the theme of the content card. To ensure contrast with the default overlay color (dark),
   * this is set to `light` by default.
   */
  theme?: 'dark' | 'light' | 'auto';
  /**
   * Set the side on which the drawer will be positioned.
   */
  side?: 'left' | 'right';
  /**
   * Disable the modal behavior of the drawer.
   * If `false`, disable the prop `closeOnClickOutside` and
   * the page is not blocked when the drawer is open.
   */
  isModal?: boolean;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  children,
  className,
  closeOnClickOutside = true,
  showHeader = true,
  maxWidth = '400px',
  side = 'right',
  theme = 'light',
  isModal = true,
  title,
  ...otherProps
}, forwardedRef) => {
  const { titleId, onClose } = useOverlayContext()
  const cssEasingToArray = (cssEasing: string) => {
    const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i))
    return [x1, y1, x2, y2]
  }

  useKeyPress('esc', () => (!isModal && onClose) && onClose())

  const dynamicStyle: CSSProperties = {
    '--max-w': maxWidth
  }

  const DrawerAnimation = {
    visible: {
      x: 0,
      transition: {
        ease: cssEasingToArray(tkns.easing.entrance),
        duration: parseFloat(tkns.duration[500].replace('s', ''))
      }
    },
    hidden: {
      x: side === 'right' ? '100%' : '-100%',
      transition: {
        ease: cssEasingToArray(tkns.easing.exit),
        duration: parseFloat(tkns.duration[500].replace('s', ''))
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal={isModal}
      data-theme={theme}
      aria-labelledby={titleId}
      className={clsx(styles.Drawer, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <FocusOn
        enabled={isModal}
        onClickOutside={closeOnClickOutside ? onClose : undefined}
        onEscapeKey={onClose}
      >
        <LazyMotion features={domMax}>
          <m.div
            variants={DrawerAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.Container}
            data-drawer-side={side}
          >
            <Elevator resting={4}>
              <div
                className={styles.Content}
                style={dynamicStyle}
                ref={forwardedRef}
                {...otherProps}
              >
                {(showHeader && title) && (
                <Stack
                  vAlign="center"
                  hAlign="space-between"
                  direction="row"
                  className={styles.Header}
                  columnGap={24}
                >
                  <Title responsive={false} level="6" id={titleId}>{title}</Title>
                  {onClose && <IconButton onClick={onClose} className={styles.CloseButton} icon="xmark" kind="flat" />}
                </Stack>
                )}
                <AutoFocusInside>
                  {children}
                </AutoFocusInside>
              </div>
            </Elevator>
          </m.div>
        </LazyMotion>
      </FocusOn>
    </div>
  )
})

Drawer.displayName = 'Drawer'

import { forwardRef, PropsWithChildren, useMemo } from 'react'
import { domMax, LazyMotion, m } from 'framer-motion'
import clsx from 'clsx'
import { FocusOn } from 'react-focus-on'
import { ModalContent, ModalContentProps } from './content/modal-content'
import styles from './modal.module.css'
import { useOverlayContext } from '@/components'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { configResponsive, useResponsive } from 'ahooks'

export type ModalProps = PropsWithChildren<PropsWithClass> & {
  /**
   * This enable the modal to be closed by clicking on the overlay.
   * Even if this can be set to `false` we strongly recommend to leave
   * it to `true` as it ensures the accessibility of the modal.
   */
  closeOnClickOutside?: boolean;
}

type ModalComponent = React.ForwardRefExoticComponent<ModalProps> & {
  Content: React.ForwardRefExoticComponent<ModalContentProps>;
}

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i))
  return [x1, y1, x2, y2]
}

configResponsive({
  wide: 768
})

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  className,
  closeOnClickOutside = true,
  ...otherProps
}, forwardedRef) => {
  const { titleId, onClose } = useOverlayContext()
  const responsive = useResponsive()

  const ModalAnimation = useMemo(() => ({
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        ease: cssEasingToArray(tkns.easing.entrance),
        duration: parseFloat(tkns.duration[300].replace('s', ''))
      }
    },
    hidden: {
      scale: responsive.wide ? 0.98 : 1,
      opacity: responsive.wide ? 0 : 1,
      y: responsive.wide ? 0 : '100%',
      transition: {
        ease: cssEasingToArray(tkns.easing.exit),
        duration: responsive.wide ? parseFloat(tkns.duration[200].replace('s', '')) : parseFloat(tkns.duration[500].replace('s', ''))
      }
    }
  }), [responsive])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(styles.Modal, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <FocusOn
        onClickOutside={closeOnClickOutside ? onClose : undefined}
        onEscapeKey={onClose}
      >
        <LazyMotion features={domMax}>
          <m.div
            variants={ModalAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.Container}
          >
            {children}
          </m.div>
        </LazyMotion>
      </FocusOn>
    </div>
  )
}) as ModalComponent

Modal.displayName = 'Modal'
Modal.Content = ModalContent

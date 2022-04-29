import { forwardRef, PropsWithChildren } from 'react'
import { domMax, LazyMotion, m } from 'framer-motion'
import clsx from 'clsx'
import { FocusOn } from 'react-focus-on'
import { ModalContent, ModalContentProps } from './content/modal-content'
import styles from './modal.module.css'
import { useOverlayContext } from '@/components'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'

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

const ModalAnimation = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: cssEasingToArray(tkns.easing.entrance),
      duration: parseFloat(tkns.duration[500].replace('s', ''))
    }
  },
  hidden: {
    scale: 0.98,
    opacity: 0,
    transition: {
      ease: cssEasingToArray(tkns.easing.exit),
      duration: parseFloat(tkns.duration[200].replace('s', ''))
    }
  }
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  className,
  closeOnClickOutside = true,
  ...otherProps
}, forwardedRef) => {
  const { titleId, onClose } = useOverlayContext()

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

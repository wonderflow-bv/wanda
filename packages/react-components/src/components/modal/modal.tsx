import { forwardRef, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FocusOn } from 'react-focus-on'
import { ModalContent, ModalContentProps } from './content/modal-content'
import styles from './modal.module.css'
import { useOverlayContext } from '../..'

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

const ModalAnimation = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: [0, 0, 0.34, 1],
      duration: 0.35
    }
  },
  hidden: {
    scale: 0.98,
    opacity: 0,
    transition: {
      ease: [0.3, 0.07, 1, 1],
      duration: 0.2
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
        <motion.div
          variants={ModalAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.Container}
        >
          {children}
        </motion.div>
      </FocusOn>
    </div>
  )
}) as ModalComponent

Modal.displayName = 'Modal'
Modal.Content = ModalContent

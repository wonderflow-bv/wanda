import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
  children: ReactNode,
  root?: HTMLElement
}

export const Portal: React.FC<PortalProps> = ({
  children,
  root = document.getElementById('portal') || document.body
}) => {
  const [container] = useState(document.createElement('div'))

  if (!root) {
    root = document.createElement('div')
    root.setAttribute('id', 'portal')
    document.body.appendChild(root)
  }

  useEffect(() => {
    root.appendChild(container)

    return () => {
      root.removeChild(container)
    }
  }, [container, root])

  return createPortal(children, container)
}

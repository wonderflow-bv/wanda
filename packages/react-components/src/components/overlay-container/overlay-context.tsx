import { createContext, useContext, PropsWithChildren } from 'react'
import { useUIDSeed } from 'react-uid'
import { OverlayContainerProps } from './overlay-container'

type OverlayContextProps = Partial<OverlayContainerProps> & {
  titleId?: string
}

export const OverlayContext = createContext<OverlayContextProps>({
  titleId: '',
  onClose: () => {}
})

OverlayContext.displayName = 'OverlayContext'

export const OverlayProvider = (props: PropsWithChildren<OverlayContextProps>) => {
  const seedID = useUIDSeed()
  const {
    children,
    titleId = seedID('overlay-title'), onClose
  } = props

  return (
    <OverlayContext.Provider value={{
      titleId,
      onClose
    }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlayContext = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error(
      'OverlayContainer component must be used inside OverlayContext to access context data.'
    )
  }
  return context
}

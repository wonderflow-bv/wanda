import {
  createContext,
  useState,
  useMemo,
  useContext,
  FC
} from 'react'

import useConstant from './use-constant'

type TabsContext = [number ?, React.Dispatch<React.SetStateAction<number>>?]
const TabsState = createContext<TabsContext>([])

interface ElementsContext {
  tabs: React.ReactNode[]
  panels: React.ReactNode[]
}
const Elements = createContext<ElementsContext>({
  tabs: [],
  panels: []
})
interface TabsProps {
  state: [number, React.Dispatch<React.SetStateAction<number>>]
}

export const Tabs: FC<TabsProps> = ({ state: outerState, children }) => {
  const innerState = useState(0)
  const elements = useConstant(() => ({ tabs: [], panels: [] }))
  const state = outerState || innerState

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Elements.Provider>
  )
}

export const useTabState = (children: React.ReactNode) => {
  const [activeIndex, setActive] = useContext(TabsState)
  const elements = useContext(Elements)

  const tabIndex = useConstant(() => {
    const currentIndex = elements.tabs.length
    const childrenIndex = elements.tabs.indexOf(children)

    const isChildrenUnique = !elements.tabs.includes(children)
    if (isChildrenUnique) {
      elements.tabs.push(children)
    }

    return isChildrenUnique ? currentIndex : childrenIndex
  })

  const onClick = useConstant(() => () => {
    if (setActive) {
      setActive(tabIndex)
    }
  })

  const state = useMemo(
    () => ({
      isActive: activeIndex === tabIndex,
      onClick
    }),
    [activeIndex, onClick, tabIndex]
  )

  return state
}

export const usePanelState = (children: React.ReactNode) => {
  const [activeIndex] = useContext(TabsState)
  const elements = useContext(Elements)

  const panelIndex = useConstant(() => {
    const currentIndex = elements.panels.length
    const childrenIndex = elements.panels.indexOf(children)

    const isChildrenUnique = !elements.panels.includes(children)
    if (isChildrenUnique) {
      elements.panels.push(children)
    }

    return isChildrenUnique ? currentIndex : childrenIndex
  })

  return panelIndex === activeIndex
}

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { domMax, LazyMotion, m } from 'framer-motion'
import {
  Children, isValidElement, PropsWithChildren, useCallback, useState
} from 'react'

import { Button } from '@/components'

import styles from './tab.module.css'
import { TabPanel } from './tabs-panel'
import { useUIDSeed } from 'react-uid'

export type TabProps = PropsWithChildren<PropsWithClass> & {
  /**
   * The value for the selected tab, if controlled
   */
  value?: TabsPrimitive.TabsProps['value'];
  /**
   * The value of the tab to select by default, if uncontrolled
   */
  defaultValue?: TabsPrimitive.TabsProps['defaultValue'];
  /**
   * A function called when a new tab is selected
   */
  onValueChange?: TabsPrimitive.TabsProps['onValueChange'];
  /**
   * The direction of navigation between toolbar items.
   * @defaultValue ltr
   */
  dir?: TabsPrimitive.TabsProps['dir'];
  /**
   * When `automatic`, tabs are activated when receiving focus.
   * When `manual`, tabs are activated when clicked.
   */
  activationMode?: TabsPrimitive.TabsProps['activationMode'];
  /**
   * When true, keyboard navigation will loop from last tab to first, and vice versa.
   * @defaultValue true
   */
  loop?: TabsPrimitive.TabsListProps['loop'];
};

export const Tab = ({
  className,
  children,
  onValueChange,
  defaultValue,
  loop,
  ...otherProps
}: TabProps) => {
  const [activeItem, setActiveItem] = useState<string>(defaultValue ?? '')
  const uid = useUIDSeed()
  const handleOnVlaueChange = useCallback(
    (value: string) => {
      onValueChange?.(value)
      setActiveItem(value)
    },
    [onValueChange]
  )

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={handleOnVlaueChange}
      className={className}
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        <TabsPrimitive.List className={styles.List} loop={loop}>
          {Children.map(children, child => isValidElement(child) && (
            <TabsPrimitive.Trigger
              value={child.props.value}
              disabled={child.props.disabled}
              className={styles.Trigger}
              asChild
            >
              <Button kind="flat" icon={child.props.icon}>
                {child.props.label}
                {(child.props.value === activeItem) && 'active' && (
                  <m.span className={styles.Highlight} layoutId={uid('tab-highlight')} />
                )}
              </Button>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  )
}

Tab.Panel = TabPanel

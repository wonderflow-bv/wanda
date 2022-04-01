import * as TabsPrimitive from '@radix-ui/react-tabs'
import { IconProps } from '@/components'

import styles from './tab.module.css'
import { PropsWithChildren } from 'react'

export type TabPanelProps = PropsWithChildren<PropsWithClass> & {
  label: string;
  icon?: IconProps['source'];
  value: TabsPrimitive.TabsContentProps['value'];
};

export const TabPanel = ({
  children,
  label,
  ...otherProps
}: TabPanelProps) => (
  <TabsPrimitive.Content
    className={styles.Panel}
    data-tabs-label={label}
    {...otherProps}
  >
    {children}
  </TabsPrimitive.Content>
)

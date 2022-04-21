import * as TabsPrimitive from '@radix-ui/react-tabs'
import { IconProps } from '@/components'

import styles from './tab.module.css'
import { PropsWithChildren } from 'react'
import clsx from 'clsx'

export type TabPanelProps = PropsWithChildren<PropsWithClass> & {
  label: string;
  icon?: IconProps['source'];
  value: TabsPrimitive.TabsContentProps['value'];
};

export const TabPanel = ({
  className,
  children,
  label,
  ...otherProps
}: TabPanelProps) => (
  <TabsPrimitive.Content
    className={clsx(styles.Panel, className)}
    data-tabs-label={label}
    {...otherProps}
  >
    {children}
  </TabsPrimitive.Content>
)

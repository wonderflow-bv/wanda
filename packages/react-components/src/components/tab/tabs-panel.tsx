import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';

import { SymbolProps } from '@/components';

import * as styles from './tab.module.css';

export type TabPanelProps = {
  label: string;
  icon?: SymbolProps['source'];
  value: TabsPrimitive.TabsContentProps['value'];
  disabled?: boolean;
};

export const TabPanel: FCChildrenClass<TabPanelProps> = ({
  className,
  children,
  label,
  ...otherProps
}) => (
  <TabsPrimitive.Content
    className={clsx(styles.Panel, className)}
    data-tabs-label={label}
    {...otherProps}
  >
    {children}
  </TabsPrimitive.Content>
);

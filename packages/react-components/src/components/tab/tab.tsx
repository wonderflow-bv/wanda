import * as TabsPrimitive from '@radix-ui/react-tabs';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, isValidElement, PropsWithChildren, useCallback, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Button, Symbol } from '@/components';

import * as styles from './tab.module.css';
import { TabPanel } from './tabs-panel';

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
   * @default ltr
   */
  dir?: TabsPrimitive.TabsProps['dir'];
  /**
   * When `automatic`, tabs are activated when receiving focus.
   * When `manual`, tabs are activated when clicked.
   */
  activationMode?: TabsPrimitive.TabsProps['activationMode'];
  /**
   * When true, keyboard navigation will loop from last tab to first, and vice versa.
   * @default true
   */
  loop?: TabsPrimitive.TabsListProps['loop'];
  /**
   * Set the tabs sizes
   *
   * @default "regular"
   */
  dimension?: 'regular' | 'big';
};

export const Tab = ({
  className,
  children,
  onValueChange,
  defaultValue,
  value,
  loop,
  dimension = 'regular',
  ...otherProps
}: TabProps) => {
  const [activeItem, setActiveItem] = useState<string>(defaultValue ?? value ?? '');
  const uid = useUIDSeed();
  const handleOnVlaueChange = useCallback(
    (value: string) => {
      onValueChange?.(value);
      setActiveItem(value);
    },
    [onValueChange],
  );

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={handleOnVlaueChange}
      className={className}
      value={value}
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        <TabsPrimitive.List className={styles.List} loop={loop}>
          {Children.map(children, child => isValidElement(child) && (
            <TabsPrimitive.Trigger
              value={child.props.value}
              disabled={child.props.disabled}
              className={styles.Trigger}
              data-tab-dimension={dimension}
              asChild
            >
              <Button kind="flat" dimension="big">
                <Symbol source={child.props.icon} dimension={dimension === 'big' ? 24 : 16} weight={dimension === 'big' ? 'duotone' : 'solid'} />
                {child.props.label}
                {(child.props.value === activeItem) && (
                  <m.span className={styles.Highlight} layoutId={uid('tab-highlight')} />
                )}
              </Button>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  );
};

Tab.Panel = TabPanel;

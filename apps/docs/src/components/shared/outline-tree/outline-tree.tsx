import {
  Disclosure, List, Stack, Symbol, Text,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import React, { ReactNode } from 'react';

import styles from './outline-tree.module.css';

type TreeGroupProps = {
  title?: ReactNode;
  icon?: SymbolNames;
}

type MenuProps = {
  expandable?: boolean;
  summary?: ReactNode;
  open?: boolean;
}

export const OutlineTree: {
  Group: React.FC<TreeGroupProps>;
  Menu: React.FC<MenuProps>;
  Li: React.FC;
} = {
  Group: ({
    children, title, icon, ...props
  }) => (
    <Stack rowGap={16} vAlign="start" className={styles.OutlineTree} {...props}>
      {title && (
      <Text
        size={14}
        responsive={false}
        className={styles.Title}
        dimmed={5}
        weight="bold"
      >
        <Stack as="span" vAlign="center" columnGap={8} direction="row" inline>
          {icon && <Symbol source={icon} />}
          {title}
        </Stack>
      </Text>
      )}
      <List>
        {children}
      </List>
    </Stack>
  ),

  Menu: ({
    children, summary, open = false, expandable = false, ...props
  }) => (expandable
    ? (
      <OutlineTree.Li>
        <Disclosure
          padding={false}
          open={open}
          iconPosition="right"
          dimension="small"
          summary={summary}
          {...props}
        >
          <List>
            {children}
          </List>
        </Disclosure>
      </OutlineTree.Li>
    )
    : <>{children}</>),

  Li: ({ children, ...props }) => <List.Li className={styles.Li} {...props}>{children}</List.Li>,
};

OutlineTree.Group.displayName = 'OutlineTree.Group';
OutlineTree.Menu.displayName = 'OutlineTree.Menu';
OutlineTree.Li.displayName = 'OutlineTree.Li';

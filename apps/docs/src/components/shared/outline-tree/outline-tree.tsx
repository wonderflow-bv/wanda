import {
  Disclosure, Stack, Symbol, Text,
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
  // First level group and menu
  Group: ({
    children, title, icon, ...otherProps
  }) => (
    <Stack rowGap={16} vAlign="start" className={styles.OutlineTree} {...otherProps}>
      {title && (
        <Stack
          as={Text}
          vAlign="center"
          hAlign="start"
          columnGap={8}
          direction="row"
          fill={false}
          size={14}
          responsive={false}
          className={styles.Title}
          dimmed={5}
          weight="bold"
        >
          {icon && <Symbol source={icon} />}
          {title}
        </Stack>
      )}
      <Stack as="ul" rowGap={8}>
        {children}
      </Stack>
    </Stack>
  ),

  // Nested Menu
  Menu: ({
    children, summary, open = false, expandable = false, ...otherProps
  }) => (expandable
    ? (
      <OutlineTree.Li>
        <Disclosure
          padding={false}
          open={open}
          iconPosition="right"
          dimension="small"
          summary={summary}
          {...otherProps}
        >
          <Stack as="ul" rowGap={4} className={styles.SubMenu}>
            {children}
          </Stack>
        </Disclosure>
      </OutlineTree.Li>
    )
    : <OutlineTree.Li>{children}</OutlineTree.Li>),

  Li: ({ children, ...otherProps }) => <li className={styles.Li} {...otherProps}>{children}</li>,
};

import {
  Disclosure, Stack, Symbol, Text,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import React, { CSSProperties, ReactNode } from 'react';

import { useDocLayoutContext } from '@/src/hooks/doc-colors';

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
  Group: FCChildrenClass<TreeGroupProps>;
  Menu: React.FC<MenuProps>;
  Li: React.FC;
} = {
  // First level group and menu
  Group: ({
    children, title, icon, style, ...otherProps
  }) => {
    const { layoutColor } = useDocLayoutContext();

    const dynamicStyle: CSSProperties = {
      '--layout-color-fg': `var(--highlight-${layoutColor}-foreground)`,
      '--layout-color-bg': `var(--highlight-${layoutColor}-background)`,
    };

    return (
      <Stack
        rowGap={16}
        vAlign="start"
        className={styles.OutlineTree}
        style={{ ...dynamicStyle, ...style }}
        {...otherProps}
      >
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
        <Stack as="ul">
          {children}
        </Stack>
      </Stack>
    );
  },

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

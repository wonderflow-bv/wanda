import React, { ReactNode, Fragment } from 'react'
import { Stack, Text, Disclosure, Icon } from '@wonderflow/react-components'
import { Tree as TreeClass, Title, Li } from './tree.module.css'
import { IconNames } from '@wonderflow/icons'

type TreeGroupProps = {
  title?: ReactNode;
  color?: string;
  icon?: IconNames;
}

type MenuProps = {
  expandable?: boolean;
  summary?: ReactNode;
  open?: boolean;
}

export const Tree: {
  Group: React.FC<TreeGroupProps>;
  Menu: React.FC<MenuProps>
  Li: React.FC;
} = {
  Group: ({ children, title, icon, color = 'gray', ...props }) => (
    <Stack rowGap={16} verticalAlign="start" className={TreeClass} {...props}>
      {title && (
      <Text
        style={{ color: `var(--highlight-${color}-foreground)` }}
        size={14}
        responsive={false}
        className={Title}
        weight="bold"
      >
        <Stack as="span" verticalAlign="center" columnGap={8} direction="row" inline>
          {icon && <Icon name={icon} />}
          {title}
        </Stack>
      </Text>
      )}
      <Stack as="ul">
        {children}
      </Stack>
    </Stack>
  ),

  Menu: ({ children, summary, open = false, expandable = false, ...props }) => {
    return expandable
      ? (
        <Tree.Li>
          <Disclosure
            padding={false}
            open={open}
            dimension="small"
            iconPosition="right"
            summary={<Text as="span" size={16} responsive={false}>{summary}</Text>}
            {...props}
          >
            <Stack as="ul">
              {children}
            </Stack>
          </Disclosure>
        </Tree.Li>
        )
      : <Fragment>{children}</Fragment>
  },

  Li: ({ children, ...props }) => <li className={Li} {...props}>{children}</li>
}

Tree.Group.displayName = 'Tree.Group'
Tree.Menu.displayName = 'Tree.Menu'
Tree.Li.displayName = 'Tree.Li'

import {
  Chip, Stack, Text,
} from '@wonderflow/react-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  ReactNode, useCallback, useMemo,
} from 'react';
import { NavigationGroup, NavigationItem, NavigationMenu } from 'types/data';

import { OutlineTree } from '@/components/shared/outline-tree';

type NavigationProps = {
  data: NavigationMenu;
};

export const Navigation = ({ data }: NavigationProps) => {
  const router = useRouter();

  const includesPath = useCallback(
    path => router.asPath === path,
    [router.asPath],
  );

  const navigationLink = useCallback(
    (
      children: ReactNode,
      tag?: NavigationItem['tag'],
      wip?: boolean,
      url?: string,
    ) => (
      <Stack
        as={!wip ? 'a' : 'span'}
        direction="row"
        href={url}
        vAlign="end"
        columnGap={8}
        fill={false}
        aria-current={includesPath(url) ? 'page' : undefined}
      >
        {wip && !url
          ? <Text as="span" size={16} dimmed={5} responsive={false}>{children}</Text>
          : <Text as="span" size={16} responsive={false}>{children}</Text>
          }
        {tag && <Chip color={tag.color || 'gray'} dimension="small">{tag.label}</Chip>}
      </Stack>
    ),
    [includesPath],
  );

  const renderSubMenu = useCallback(
    (menu: NavigationItem) => menu.items?.map(subItem => (
      <OutlineTree.Li key={subItem.path}>
        {!subItem.wip && subItem.path
          ? (
            <Link href={subItem.path}>
              {navigationLink(subItem.label, subItem.tag, subItem.wip, subItem.path)}
            </Link>
          )
          : navigationLink(subItem.label, subItem.tag, subItem.wip)}
      </OutlineTree.Li>
    )),
    [navigationLink],
  );

  const renderGroup = useCallback(
    (group: NavigationItem | NavigationGroup) => group.items?.map(link => (
      <OutlineTree.Menu
        key={link.label}
        open={link.items?.some(item => includesPath(item.path))}
        expandable={!!link.items}
        summary={!!link.items && link.label}
      >
        {link.items
          ? renderSubMenu(link)
          : link.path && (
            <>
              <Link href={link.path}>
                {navigationLink(link.label, link.tag, link.wip, link.path)}
              </Link>
            </>
          )
        }
      </OutlineTree.Menu>
    )),
    [navigationLink, includesPath, renderSubMenu],
  );

  const renderNavigation = useMemo(() => data.map(group => (
    <OutlineTree.Group key={group.title} icon={group.icon} title={group.title}>
      {renderGroup(group)}
    </OutlineTree.Group>
  )), [data, renderGroup]);

  return (
    <nav>
      <Stack fill={false} hAlign="stretch" rowGap={40}>
        {renderNavigation}
      </Stack>
    </nav>
  );
};

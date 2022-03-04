import React, { Fragment, ReactNode, useCallback, useMemo } from 'react'
import { Tree } from '@/components/tree'
import { Separator, Stack, Text, Chip } from '@wonderflow/react-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { NavigationLink } from './navigation.module.css'
import { NavigationGroup, NavigationItem, NavigationMenu } from 'types/navigation'

type NavigationProps = {
  data: NavigationMenu
};

export const Navigation = ({ data }: NavigationProps) => {
  const router = useRouter()

  const includesPath = useCallback(
    (path) => {
      return router.asPath === path
    },
    [router.asPath]
  )

  const navigationLink = useCallback(
    (url: string, children: ReactNode, tag?: NavigationItem['tag'], wip?: boolean) => (
      <Stack
        as={!wip ? 'a' : 'div'}
        className={NavigationLink}
        direction="row"
        href={url}
        vAlign="end"
        columnGap={8}
        fill={false}
        aria-current={includesPath(url) ? 'page' : undefined}
      >
        {wip
          ? <Text as="span" size={16} dimmed={5} responsive={false}>{children}</Text>
          : <Text as="span" responsive={false}>{children}</Text>
          }
        {tag && <Chip color={tag.color || 'gray'} dimension="small">{tag.label}</Chip>}
      </Stack>
    ),
    [includesPath]
  )

  const renderSubMenu = useCallback(
    (menu: NavigationItem) => menu.items?.map(subItem => (
      <Tree.Li key={subItem.path}>
        {!subItem.wip
          ? (
            <Link href={subItem.path}>
              {navigationLink(subItem.path, subItem.label, subItem.tag, subItem.wip)}
            </Link>
            )
          : navigationLink(subItem.path, subItem.label, subItem.tag, subItem.wip)}
      </Tree.Li>
    )),
    [navigationLink]
  )

  const renderGroup = useCallback(
    (group: NavigationItem | NavigationGroup) => group.items?.map(link => (
      <Tree.Menu
        key={link.label}
        open={link.items?.some(item => includesPath(item.path))}
        expandable={!!link.items}
        summary={!!link.items && link.label}
      >
        {link.items
          ? renderSubMenu(link)
          : (
            <Tree.Li>
              <Link href={link.path}>
                {navigationLink(link.path, link.label, link.tag, link.wip)}
              </Link>
            </Tree.Li>
            )
        }
      </Tree.Menu>
    )),
    [navigationLink, includesPath, renderSubMenu]
  )

  const renderNavigation = useMemo(() => data.map((group, index) => {
    return (
      <Fragment key={group.title}>

        {index !== 0 && <Separator />}

        <Tree.Group icon={group.icon} color={group.color} title={group.title}>
          {renderGroup(group)}
        </Tree.Group>
      </Fragment>
    )
  }), [data, renderGroup])

  return (
    <nav>
      <Stack fill={false} hAlign="stretch" rowGap={24}>
        {renderNavigation}
      </Stack>
    </nav>
  )
}

import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { Toolbar as ToolbarClass } from './toolbar.module.css'
import { IconButton, SkeletonBlock, Stack } from '@wonderflow/react-components'
import { Search } from '@/components/search'

import dynamic from 'next/dynamic'

const DynThemeSwitcher = dynamic(
  import('@/components/theme-switcher').then(m => m.ThemeSwitcher),
  {
    ssr: false,
    loading: () => <SkeletonBlock height={24} width={75} />
  }
)

type ToolbarProps = {
  showSearch?: boolean;
} & HTMLAttributes<HTMLDivElement>

export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  className,
  showSearch = true,
  ...props
}) => {
  return (
    <Stack
      direction="row"
      fill={false}
      columnGap={8}
      horizontalAlign="end"
      verticalAlign="center"
      className={clsx(ToolbarClass, className)}
      {...props}
    >
      {showSearch && (
        <Search />
      )}
      <IconButton
        as="a"
        href="https://github.com/wonderflow-bv/design"
        icon="github"
        target="_blank"
        rel="noopner noreferrer"
        kind="flat"
        aria-label="Github link to the source code"
      />
      <DynThemeSwitcher />
      {children}
    </Stack>
  )
}

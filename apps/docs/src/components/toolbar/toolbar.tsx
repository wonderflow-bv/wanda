import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { Toolbar as ToolbarClass } from './toolbar.module.css'
import { IconButton, Skeleton, Stack } from '@wonderflow/react-components'
import { Search } from '@/components/search'

import dynamic from 'next/dynamic'

const DynThemeSwitcher = dynamic(
  import('@/components/theme-switcher').then(m => m.ThemeSwitcher),
  {
    ssr: false,
    loading: () => <Skeleton height={24} width={75} />
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
        href="https://github.com/wonderflow-bv/wanda"
        icon="github"
        target="_blank"
        rel="noopner"
        kind="flat"
        aria-label="Github link to the source code"
      />
      <IconButton
        as="a"
        href="https://twitter.com/wandaflow"
        icon="twitter"
        target="_blank"
        rel="noopner"
        kind="flat"
        aria-label="Follow us on Twitter"
      />
      <DynThemeSwitcher />
      {children}
    </Stack>
  )
}

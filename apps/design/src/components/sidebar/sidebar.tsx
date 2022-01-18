import { Stack } from '@wonderflow/react-components'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { Sidebar as SidebarClass, Logo as LogoClass, Header } from './sidebar.module.css'
import { Navigation } from '../navigation'
import navigation from 'src/navigation'
import { NavigationMenu } from 'types/navigation'

export const Sidebar = () => {
  return (
    <Stack fill={false} horizontalAlign="stretch" className={SidebarClass} rowGap={16}>
      <Link href="/">
        <a className={Header}>
          <Logo className={LogoClass} />
        </a>
      </Link>
      <Navigation data={navigation as NavigationMenu} />
    </Stack>
  )
}

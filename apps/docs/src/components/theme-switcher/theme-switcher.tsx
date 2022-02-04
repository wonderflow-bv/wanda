import { useTheme } from 'next-themes'
import { IconNames } from '@wonderflow/icons'
import { Dropdown, IconButton, Menu } from '@wonderflow/react-components'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const currentTheme = theme || 'system'

  const icon = {
    light: 'sun-bright' as IconNames,
    system: 'pc' as IconNames,
    dark: 'moon' as IconNames
  }

  return (
    <Dropdown
      placement="bottom-end"
      offset={4}
      trigger={(
        <IconButton
          aria-label="Change color scheme"
          kind="flat"
          icon={currentTheme === 'system' ? icon.system : icon[currentTheme]}
        />
    )}
    >
      <Menu>
        <Menu.ItemCheckbox onClick={() => setTheme('light')} checked={currentTheme === 'light'} icon="sun-bright">Light</Menu.ItemCheckbox>
        <Menu.ItemCheckbox onClick={() => setTheme('dark')} checked={currentTheme === 'dark'} icon="moon">Dark</Menu.ItemCheckbox>
        <Menu.ItemCheckbox onClick={() => setTheme('system')} checked={currentTheme === 'system'} icon="pc">System</Menu.ItemCheckbox>
      </Menu>
    </Dropdown>
  )
}

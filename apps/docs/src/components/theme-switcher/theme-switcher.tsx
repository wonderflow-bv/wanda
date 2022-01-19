import React from 'react'
import { useTheme } from 'next-themes'
import { IconNames } from '@wonderflow/icons'
import { Select } from '@wonderflow/react-components'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const currentTheme = theme || 'system'

  const icon = {
    light: 'sun-bright' as IconNames,
    system: 'pc' as IconNames,
    dark: 'moon' as IconNames
  }

  return (
    <Select
      dimension="small"
      onChange={({ currentTarget }) => setTheme(currentTarget.value)}
      value={currentTheme}
      icon={currentTheme === 'system' ? icon.system : icon[currentTheme]}
      aria-label="Change color scheme"
      style={{ paddingBottom: 0 }}
    >
      <option value="light">Light</option>
      <option value="system">System</option>
      <option value="dark">Dark</option>
    </Select>
  )
}

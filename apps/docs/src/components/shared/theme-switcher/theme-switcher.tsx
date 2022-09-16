import {
  ButtonProps, IconButton, Menu, Popover,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import { useTheme } from 'next-themes';

export type ThemeSwitcherProps = {
  dimension?: ButtonProps['dimension'];
}

export const ThemeSwitcher: FCClass<ThemeSwitcherProps> = ({
  dimension,
}) => {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? 'system';

  const icon = {
    light: 'sun-bright' as SymbolNames,
    system: 'pc' as SymbolNames,
    dark: 'moon' as SymbolNames,
  };

  return (
    <Popover
      placement="bottom-start"
      offset={4}
      trigger={(
        <IconButton
          aria-label="Change color scheme"
          dimension={dimension}
          kind="flat"
          icon={currentTheme === 'system' ? icon.system : icon[currentTheme]}
        />
      )}
    >
      <Menu>
        <Menu.ItemCheckbox value="light" autoFocus onClick={() => setTheme('light')} checked={currentTheme === 'light'} icon="sun-bright">Light</Menu.ItemCheckbox>
        <Menu.ItemCheckbox value="dark" onClick={() => setTheme('dark')} checked={currentTheme === 'dark'} icon="moon">Dark</Menu.ItemCheckbox>
        <Menu.ItemCheckbox value="system" onClick={() => setTheme('system')} checked={currentTheme === 'system'} icon="pc">System</Menu.ItemCheckbox>
      </Menu>
    </Popover>
  );
};

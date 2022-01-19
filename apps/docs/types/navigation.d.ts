import { ChipProps } from '@wonderflow/react-components'
import { IconNames } from '@wonderflow/icons'

export type NavigationItem = {
  path?: string | Url;
  label: string;
  target?: string;
  expandable?: boolean;
  items?: NavigationItem[];
  wip?: boolean;
  tag?: {
    label: string;
    color?: ChipProps['color'];
  };
}

export type NavigationGroup = {
  title?: string;
  color?: string;
  icon?: IconNames;
  items: NavigationItem[];
}

export type NavigationMenu = NavigationGroup[]

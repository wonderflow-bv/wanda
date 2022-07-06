import { SymbolNames } from '@wonderflow/symbols';

type NavItemType = {
  label: string;
  url: string;
  blank?: boolean;
}

export type NavType = NavItemType[]

type DocNavItemType = {
  label: string;
  url: string;
  icon: SymbolNames;
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
  blank?: boolean;
}

export type DocNavType = DocNavItemType[]

export type NavigationItem = {
  path?: string;
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
  icon?: SymbolNames;
  items: NavigationItem[];
}

export type NavigationMenu = NavigationGroup[]

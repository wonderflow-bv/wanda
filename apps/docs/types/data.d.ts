import type { SymbolNames } from '@wonderflow/symbols';
import type { TokensTypes } from '@wonderflow/tokens/platforms/web';

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
  color?: TokensTypes['colors'];
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

type ReleaseNote = {
  id: string;
  releaseDate: string;
  tag?: string;
  content?: string;
  notes: Array<{
    id: string;
    scope: string;
    breaking?: string;
    fixes?: string;
    new?: string;
  }>;
}

type ReleaseNotes = ReleaseNote[]

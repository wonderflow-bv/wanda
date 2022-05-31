import { IconNames } from '@wonderflow/icons';

type MentionType = {
  image?: string;
  name: string;
  handle?: string;
}

export type MentionsType = MentionType[]

type NavItemType = {
  label: string;
  url: string;
  blank?: boolean;
}

export type NavType = NavItemType[]

type DocNavItemType = {
  label: string;
  url: string;
  icon: IconNames;
  color?: string;
  blank?: boolean;
}

export type DocNavType = DocNavItemType[]

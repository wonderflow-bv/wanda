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

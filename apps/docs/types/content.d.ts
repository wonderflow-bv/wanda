/* eslint-disable no-unused-vars */

type AuthorType = {
  id: string
  fullName: string;
  role: string;
  favouriteColor: {
    rgba: {
      r: number;
      g: number;
      b: number
    }
  };
  avatar: {
    'url': string
  }
}

type TopicsType = string[]

type PostType = {
  id: string;
  updatedAt: string;
  publishedAt: string;
  createdAt: string;
  title: string;
  slug: string;
  externalUrl?: string;
  topics?: TopicsType;
  excerpt: string;
  content: string;
  authors?: AuthorType[];
}

type PostsType = PostType[]

type ReleaseNote = {
  id: string
  releaseDate: string
  content?: string
  new?: string
  breaking?: string
  fixes?: string
  tag?: string
}

type ReleaseNotes = ReleaseNote[]

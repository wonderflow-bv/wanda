import { gql } from 'graphql-request'
import client from '@/services/client'

export const getPublishedPosts = async (
  avatarWidth: number = 300,
  avatarHeight: number = 300
) => {
  const query = gql`
    query ($avatarWidth: Int, $avatarHeight: Int) {
      posts(
        stage: PUBLISHED,
        orderBy: updatedAt_DESC
      ) {
        id
        updatedAt
        publishedAt
        createdAt
        title
        slug
        externalUrl
        topics
        excerpt
        content
        authors {
          id
          fullName
          role
          favouriteColor {
            rgba {
              r
              g
              b
            }
          }
          avatar {
            url(
              transformation: {
                document: {
                  output: {
                    format: webp
                  }
                },
                image: {
                  resize: {
                    height: $avatarHeight,
                    width: $avatarWidth
                  }
                }
              }
            )
          }
        }
      }
    }
  `

  const result = await client.request(query, { avatarWidth, avatarHeight })
  return result.posts
}

export const getPublishedPostsByTopic = async (
  topic: string[],
  avatarWidth: number = 300,
  avatarHeight: number = 300
) => {
  const query = gql`
    query ($topic: [Topics!], $avatarWidth: Int, $avatarHeight: Int) {
      posts(
        stage: PUBLISHED,
        orderBy: publishedAt_DESC
        where: {
          topics_contains_some: $topic
        }
      ) {
        id
        updatedAt
        publishedAt
        createdAt
        title
        slug
        externalUrl
        topics
        excerpt
        content
        authors {
          id
          fullName
          role
          favouriteColor {
            rgba {
              r
              g
              b
            }
          }
          avatar {
            url(
              transformation: {
                document: {
                  output: {
                    format: webp
                  }
                },
                image: {
                  resize: {
                    height: $avatarHeight,
                    width: $avatarWidth
                  }
                }
              }
            )
          }
        }
      }
    }
  `

  const result = await client.request(query, { topic, avatarWidth, avatarHeight })
  return result.posts
}

export const getPostDetailsBySlug = async (
  slug: PostType['slug'],
  stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
  avatarWidth: number = 120,
  avatarHeight: number = 120
) => {
  const query = gql`
    query ($slug: String!, $stage: Stage!, $avatarWidth: Int, $avatarHeight: Int) {
      post(where: { slug: $slug }, stage: $stage) {
        id
        updatedAt
        publishedAt
        createdAt
        title
        slug
        externalUrl
        topics
        excerpt
        content
        authors {
          id
          fullName
          role
          favouriteColor {
            rgba {
              r
              g
              b
            }
          }
          avatar {
            url(
              transformation: {
                document: {
                  output: {
                    format: webp
                  }
                },
                image: {
                  resize: {
                    height: $avatarHeight,
                    width: $avatarWidth
                  }
                }
              }
            )
          }
        }
      }
    }
  `

  const result = await client.request(query, { slug, stage, avatarWidth, avatarHeight })

  return result.post
}

export const getPublishedReleaseNotes = async () => {
  const query = gql`
    query {
      releaseNotes(stage: PUBLISHED, orderBy: releaseDate_DESC, first: 10) {
        content
        new
        breaking
        fixes
        id
        tag
        releaseDate
      }
    }
  `

  const result = await client.request(query)
  return result.releaseNotes
}

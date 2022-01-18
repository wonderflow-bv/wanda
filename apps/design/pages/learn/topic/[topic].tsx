import { getPublishedPosts, getPublishedPostsByTopic } from '@/services/queries'
import { ShellLayout } from '@/components/layouts/shell'
import { Meta } from '@/components/meta'
import { PostCard } from '@/components/post-card'
import { Toolbar } from '@/components/toolbar'
import { Stack, Text, Title } from '@wonderflow/react-components'
import { Params } from 'next/dist/server/router'

type TopicPageProps = {
  tagName: string
  posts: PostsType
}

const TopicPage = ({ tagName, posts }: TopicPageProps) => (
  <ShellLayout
    stickyHeader
    contentMaxWidth="90ch"
    header={(
      <Toolbar />
    )}
  >
    <Meta title="Learn - Wanda Design System" description="Learn how to design and develop better user experiences." />
    <Stack verticalPadding={80} horizontalAlign="center">
      <Text size={22}>You are seeing content under the category:</Text>
      <Title as="h1" level="display">
        #
        {tagName}
      </Title>
    </Stack>
    <ol style={{ counterReset: 'post-counter', padding: 0 }}>
      {posts?.map((post) => (
        <Stack as="li" verticalPadding={80} key={post.id}>
          <PostCard
            slug={post.slug}
            title={post.title}
            updatedAt={post.updatedAt}
            createdAt={post.createdAt}
            authors={post.authors}
            externalUrl={post.externalUrl}
            excerpt={post.excerpt}
          />
        </Stack>
      ))}
    </ol>
  </ShellLayout>
)

export const getStaticPaths = async () => {
  const posts = await getPublishedPosts()

  // extracts all topics from posts and returns an array of unique values
  const topics = posts.reduce((acc: TopicsType, post: PostType) => {
    if (post.topics) {
      post.topics.forEach((topic: string) => {
        if (!acc.includes(topic)) {
          acc.push(topic)
        }
      })
    }
    return [...new Set(acc)]
  }, [])

  return {
    paths: topics.map((topic: string) => ({
      params: {
        topic: topic
      }
    })),
    fallback: true
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const posts: PostsType = await getPublishedPostsByTopic([params.topic])

  return {
    props: {
      posts,
      tagName: params.topic
    },
    revalidate: 120
  }
}

export default TopicPage

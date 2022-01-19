import { getPublishedPosts } from '@/services/queries'
import { FadeIn } from '@/components/fade-in'
import { ShellLayout } from '@/components/layouts/shell'
import { Meta } from '@/components/meta'
import { PostCard } from '@/components/post-card'
import { Toolbar } from '@/components/toolbar'
import { Stack } from '@wonderflow/react-components'

type PostsPageProps = {
  posts: PostsType
}

const Learn = ({ posts }: PostsPageProps) => {
  return (
    <ShellLayout
      stickyHeader
      contentMaxWidth="90ch"
      header={(
        <Toolbar />
      )}
    >
      <Meta title="Learn - Wanda Design System" description="Learn how to design and develop better user experiences." />
      <ol style={{ counterReset: 'post-counter', padding: 0 }}>
        {posts.map((post, i) => (
          <Stack as="li" verticalPadding={80} key={post.id}>
            <FadeIn delay={`${i < 3 ? i * 0.1 : 0}s`}>
              <PostCard
                externalUrl={post.externalUrl}
                slug={post.slug}
                title={post.title}
                updatedAt={post.updatedAt}
                createdAt={post.createdAt}
                authors={post.authors}
                excerpt={post.excerpt}
              />
            </FadeIn>
          </Stack>
        ))}
      </ol>
    </ShellLayout>
  )
}

export const getStaticProps = async () => {
  const posts: PostsType = await getPublishedPosts()
  return {
    props: {
      posts
    },
    revalidate: 120
  }
}

export default Learn

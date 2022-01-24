import { Bleed } from '@/components/bleed'
import { Meta } from '@/components/meta'
import { Toolbar } from '@/components/toolbar'
import { Chip, ChipProps, Container, Elevator, SkeletonBlock, Stack, Title } from '@wonderflow/react-components'
import { ShellLayout } from '@/components/layouts/shell'
import Link from 'next/link'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'

import { PostHead, TopicsContainer } from './post.module.css'
import { AuthorCard } from '@/components/author-card'
import { useEffect, useState } from 'react'

export type PostLayoutProps = Partial<PostType>

export const PostLayout: React.FC<PostLayoutProps> = ({
  title,
  excerpt,
  authors,
  topics,
  children
}) => {
  const [wideTitle, setWideTitle] = useState<boolean>(false)
  const colors = [
    'cyan',
    'purple',
    'yellow',
    'green',
    'blue',
    'gray',
    'red'
  ]

  useEffect(() => {
    window.matchMedia(`(min-width: ${tkns.breakpoint['extra-large']})`).addEventListener('change', ({ matches }) => {
      setWideTitle(matches)
    })
  }, [])

  return (
    <ShellLayout
      stickyHeader
      header={(
        <Toolbar />
      )}
    >
      <Meta title={`${title} - Wanda Design System`} description={excerpt} />

      <Stack rowGap={88}>
        <Bleed maxWidth="100vw" offset="var(--sidebar-width)" className={PostHead}>
          <Stack horizontalAlign="center">
            {title
              ? <Title maxWidth="15ch" as="h1" level={wideTitle ? 'display' : '1'}>{title}</Title>
              : <SkeletonBlock width="40vw" height={90} />
          }
          </Stack>
        </Bleed>

        {topics && topics.length > 0 && (
        <Container dimension="large" className={TopicsContainer}>
          <Stack direction="row" horizontalAlign="end" columnGap={8}>
            {topics.map((topic, i) => (
              <Link href={`/learn/topic/${topic}`} key={topic}>
                <a style={{ background: 'none' }}>
                  <Elevator resting={1}>
                    <Chip dimension="big" color={colors[i] as ChipProps['color']}>{topic}</Chip>
                  </Elevator>
                </a>
              </Link>
            ))}
          </Stack>
        </Container>
        )}

        {authors && authors.length > 0 && (
          <Stack
            rowGap={16}
            horizontalAlign="start"
          >
            <Stack
              direction="row"
              wrap
              fill={false}
              columnGap={40}
            >
              {authors.map(author => (
                <AuthorCard
                  key={author.id}
                  name={author.fullName}
                  role={author.role}
                  avatar={author.avatar.url}
                />
              ))}
            </Stack>
          </Stack>
        )}

        <Stack verticalPadding={56}>
          {children}
        </Stack>
      </Stack>
    </ShellLayout>
  )
}

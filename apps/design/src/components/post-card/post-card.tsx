import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { PostCard as PostCardClass, Authors } from './post-card.module.css'
import { ClampText, Elevator, Stack, Text, Title, Datetime } from '@wonderflow/react-components'
import { AuthorCard } from '@/components/author-card'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { useInViewport } from 'ahooks'
import { TextReveal } from '@/components/text-reveal'

type PostCardProps = PropsWithClass & Pick<
  PostType,
  'slug' | 'title' | 'updatedAt' | 'createdAt' | 'externalUrl' | 'excerpt' | 'authors'
>

export const PostCard = ({
  className,
  updatedAt,
  createdAt,
  title,
  slug,
  externalUrl,
  excerpt,
  authors,
  ...props
}: PostCardProps) => {
  const [color, setColor] = useState<string>('var(--highlight-gray-foreground)')
  const [isMedium, setIsMedium] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)
  const [inViewport] = useInViewport(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  })

  useEffect(() => {
    window.matchMedia(`(min-width: ${tkns.breakpoint.medium})`).addEventListener('change', ({ matches }) => {
      setIsMedium(matches)
    })
    inViewport && setVisible(true)
  }, [inViewport])

  useEffect(() => {
    const colors = [
      'var(--highlight-cyan-foreground)',
      'var(--highlight-purple-foreground)',
      'var(--highlight-yellow-foreground)',
      'var(--highlight-green-foreground)',
      'var(--highlight-blue-foreground)',
      'var(--highlight-gray-foreground)',
      'var(--highlight-red-foreground)'
    ]

    setColor(colors[colors.length * Math.random() | 0])
  }, [])

  return (
    <article ref={ref} style={{ '--c': color }} className={clsx(PostCardClass, className)} {...props}>
      <Link href={externalUrl || `/learn/${encodeURIComponent(slug)}`} passHref>
        <Stack
          as="a"
          target={externalUrl && '_blank'}
          rel={externalUrl && 'noopener noreferrer'}
          rowGap={32}
          verticalAlign="start"
          horizontalAlign="start"
          horizontalPadding={isMedium ? 56 : 16}
          verticalPadding={40}
        >
          <Stack rowGap={8}>
            <Stack direction="row" verticalAlign="center" columnGap={8} wrap fill={false}>
              <Text as="span" dimmed={5} size={16}>
                <Datetime date={updatedAt} />
              </Text>
            </Stack>
            <Title as="h2" level={isMedium ? '2' : '3'}>
              <TextReveal play={visible}>
                <ClampText rows={3}>{ title }</ClampText>
              </TextReveal>
            </Title>
          </Stack>
          <Text maxWidth="50ch" dimmed={6}>
            <ClampText rows={3}>{excerpt}</ClampText>
          </Text>
          <Stack direction="row">
            {authors && authors?.length > 0 && (
              <Elevator resting={1}>
                <Stack
                  as="ul"
                  fill={false}
                  direction="row"
                  verticalAlign="center"
                  horizontalAlign="start"
                  verticalPadding={8}
                  horizontalPadding={8}
                  columnGap={8}
                  className={Authors}
                >
                  {authors.map(person => (
                    <AuthorCard
                      key={person.id}
                      avatar={person.avatar.url}
                      name={person.fullName}
                      role={person.role}
                      collapsed={authors?.length > 1}
                    />
                  ))}
                </Stack>
              </Elevator>
            )}
          </Stack>
        </Stack>
      </Link>
    </article>
  )
}

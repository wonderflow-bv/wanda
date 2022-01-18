import { getPublishedReleaseNotes } from '@/services/queries'
import { ShellLayout } from '@/components/layouts/shell'
import { Meta } from '@/components/meta'
import { Toolbar } from '@/components/toolbar'
import { Markdown } from '@/components/markdown'
import { Card, Stack, Title, Text, Datetime } from '@wonderflow/react-components'
import { Notes, Changes, Tag } from './release-notes.module.css'

type ReleaseNotesPageProps = {
  notes: ReleaseNotes
}

const Learn = ({ notes }: ReleaseNotesPageProps) => {
  return (
    <ShellLayout
      stickyHeader
      contentMaxWidth="90ch"
      header={(
        <Toolbar />
      )}
    >
      <Meta title="Release notes - Wanda Design System" description="List of improvements, fixes and new features" />
      {notes.map((note) => (
        <Stack
          as="section"
          verticalPadding={80}
          rowGap={32}
          horizontalAlign="start"
          className={Notes}
          key={note.id}
        >
          <Stack
            direction="row"
            verticalAlign="start"
            columnGap={24}
          >
            <Card vibrant padding={8} className={Tag}>
              <Text weight="bold" size={14} textAlign="center">{note.tag || '📣'}</Text>
            </Card>

            <Stack rowGap={32}>
              <Stack rowGap={4}>
                <Title as="h2" level="3"><Datetime date={note.releaseDate} /></Title>
              </Stack>

              {note.content && <Markdown>{note.content}</Markdown>}

              <Stack horizontalAlign="start" className={Changes}>
                {note.breaking && (
                  <div data-note-type="breaking">
                    <Markdown hideMarkers>{note.breaking}</Markdown>
                  </div>
                )}
                {note.new && (
                  <div data-note-type="new">
                    <Markdown hideMarkers>{note.new}</Markdown>
                  </div>
                )}
                {note.fixes && (
                  <div data-note-type="fixes">
                    <Markdown hideMarkers>{note.fixes}</Markdown>
                  </div>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </ShellLayout>
  )
}

export const getStaticProps = async () => {
  const notes: ReleaseNotes = await getPublishedReleaseNotes()
  return {
    props: {
      notes
    },
    revalidate: 60
  }
}

export default Learn

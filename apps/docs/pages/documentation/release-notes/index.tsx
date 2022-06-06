import {
  Datetime, Stack, Text, Title,
} from '@wonderflow/react-components';
import { NextPage } from 'next';
import { useReleaseNotesQuery } from 'src/generated/graphql';

import { Markdown } from '@/components/shared/markdown';
import { Meta } from '@/components/shared/meta';
import { getLayoutProps } from '@/utils/get-layout-props';

import styles from './release-notes.module.css';

const ReleaseNotesPage: NextPage = () => {
  const { data } = useReleaseNotesQuery();

  return (
    <>
      <Meta title="Release notes - Wanda Design System" description="List of improvements, fixes and new features" />
      {data?.releaseNotes.map(note => (
        <Stack
          as="section"
          vPadding={40}
          rowGap={32}
          hAlign="start"
          key={note.id}
          className={styles.Notes}
        >
          <Stack
            direction="row"
            vAlign="start"
            columnGap={24}
          >
            <Stack vAlign="center" hAlign="center" fill={false} className={styles.Tag}>
              <Text as="span" weight="bold" size={14} textAlign="center">{note.tag ?? '📣'}</Text>
            </Stack>

            <Stack>
              <Stack rowGap={4} vPadding={24}>
                <Title as="h2" level="5"><Datetime date={note.releaseDate as string} /></Title>
              </Stack>

              {note.content && (
              <Markdown options={{
                overrides: {
                  p: { component: Text, props: { size: 18 } },
                },
              }}
              >
                {note.content}
              </Markdown>
              )}

              <Stack hAlign="start" vPadding={24} className={styles.Changes}>
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
    </>
  );
};

export default ReleaseNotesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Release notes',
    color: 'blue',
  },
});

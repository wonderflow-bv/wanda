import {
  Card, Datetime, Elevator, Stack, Text,
} from '@wonderflow/react-components';
import { m } from 'framer-motion';
import { CSSProperties } from 'react';
import { ReleaseNoteFragment } from 'src/generated/graphql';

import { GradientText } from '@/components/shared/gradient-text';
import { Markdown } from '@/components/shared/markdown';
import { useDocLayoutContext } from '@/src/hooks/doc-colors';

import styles from './notes-card.module.css';

type NotesCardProps = {
  release: ReleaseNoteFragment;
  index: number;
}

export const NotesCard: FCClass<NotesCardProps> = ({
  release,
  style,
  index,
}) => {
  const { layoutColor } = useDocLayoutContext();

  const dynamicStyle: CSSProperties = {
    '--layout-color-fg': `var(--highlight-${layoutColor}-foreground)`,
    '--layout-color-bg': `var(--highlight-${layoutColor}-background)`,
  };

  return (
    <Stack
      as="section"
      vPadding={40}
      rowGap={32}
      hAlign="stretch"
      style={{ ...dynamicStyle, ...style }}
      className={styles.Note}
    >
      <Stack
        direction="row"
        vAlign="start"
        columnGap={24}
      >
        <Stack vAlign="center" hAlign="center" fill={false} className={styles.Tag}>
          <Text as="span" variant="body-2" textAlign="center">
            <b>
              {release.tag ?? '📣'}
            </b>
          </Text>
          {index === 0 && (
            <m.span
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              className={styles.Pulse}
            />
          )}
        </Stack>

        <Stack>
          <Stack rowGap={4} vPadding={24}>
            <Text as="h2" variant="heading-4"><Datetime date={release.releaseDate as string} /></Text>
          </Stack>

          {release.content && (
            <Markdown options={{
              overrides: {
                p: { component: Text, props: { size: 18 } },
              },
            }}
            >
              {release.content}
            </Markdown>
          )}

          {release.notes.length > 0 && (
            <Stack rowGap={48} vPadding={32}>
              {release.notes.map(note => (
                <Stack key={note.id}>
                  <Text as="h3" variant="heading-5" className={styles.ScopeTitle}>
                    <GradientText color="rainbow">{`${note.scope[0].toUpperCase()}${note.scope.slice(1)}`}</GradientText>
                  </Text>
                  <Elevator resting={2}>
                    <Card hAlign="start" padding={24} radius={16} className={styles.Card}>
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
                    </Card>
                  </Elevator>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

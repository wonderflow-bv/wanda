import {
  List, Stack, Text,
} from '@wonderflow/react-components';

import { HeadingType } from '@/hooks/table-of-content';

import styles from './toc.module.css';

type TocProps = {
  headings: HeadingType[];
}

export const Toc = ({
  headings,
}: TocProps) => (
  <Stack as="nav" rowGap={16}>
    {headings.length > 0 && (
      <>
        <Text variant="heading-6">On this page</Text>
        <List dimension="small" hideMarker>
          {headings.map(heading => (
            <Stack as={List.Li} key={heading.id} vPadding={4}>
              <Text as="a" className={styles.Link} href={`#${heading.id}`}><b>{heading.title}</b></Text>
              {(heading.items && heading.items.length > 0) && (
                <List dimension="small">
                  {heading.items?.map(child => (
                    <List.Li key={child.id} marker="chevron-right" markerColor="var(--dimmed-5)">
                      <Text as="a" className={styles.Link} href={`#${child.id}`}>{child.title}</Text>
                    </List.Li>
                  ))}
                </List>
              )}
            </Stack>
          ))}
        </List>
      </>
    )}
  </Stack>
);

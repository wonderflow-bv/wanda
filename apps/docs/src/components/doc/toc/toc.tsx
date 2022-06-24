import {
  List, Stack, Text, Title,
} from '@wonderflow/react-components';

import { HeadingType } from '@/hooks/table-of-content';

type TocProps = {
  headings: HeadingType[];
}

export const Toc = ({
  headings,
}: TocProps) => (
  <Stack as="nav" rowGap={16}>
    <Title level="6">On this page</Title>
    <List dimension="small" hideMarker>
      {headings.map(heading => (
        <Stack as={List.Li} key={heading.id} vPadding={4}>
          <Text as="a" href={`#${heading.id}`} dimmed={6} weight="bold">{heading.title}</Text>
          {(heading.items && heading.items.length > 0) && (
            <List dimension="small">
              {heading.items?.map(child => (
                <List.Li key={child.id} marker="chevron-right" markerColor="var(--dimmed-5)">
                  <Text as="a" href={`#${child.id}`} dimmed={6}>{child.title}</Text>
                </List.Li>
              ))}
            </List>
          )}
        </Stack>
      ))}
    </List>
  </Stack>
);

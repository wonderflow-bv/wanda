import { List, Stack, Title } from '@wonderflow/react-components';

import { HeadingType } from '@/hooks/headings-data';

type TocProps = {
  headings: HeadingType[];
}

export const Toc = ({
  headings,
}: TocProps) => (
  <Stack as="nav" rowGap={16}>
    <Title level="6">On this page</Title>
    <List dimension="small">
      {headings.map(heading => (
        <List.Li key={heading.id} marker="turn-down-right" markerColor="var(--dimmed-5)">
          <a href={`#${heading.id}`}>{heading.title}</a>
          {(heading.items && heading.items.length > 0) && (
            <ul>
              {heading.items?.map(child => (
                <li key={child.id}>
                  <a href={`#${child.id}`}>{child.title}</a>
                </li>
              ))}
            </ul>
          )}
        </List.Li>
      ))}
    </List>
  </Stack>
);

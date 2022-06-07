import { Stack, Title } from '@wonderflow/react-components';

import { HeadingType } from '@/hooks/headings-data';

type TocProps = {
  headings: HeadingType[];
}

export const Toc = ({
  headings,
}: TocProps) => (
  <Stack as="nav" rowGap={16}>
    <Title level="6">On this page</Title>
    <ul>
      {headings.map(heading => (
        <li key={heading.id}>
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
        </li>
      ))}
    </ul>
  </Stack>
);

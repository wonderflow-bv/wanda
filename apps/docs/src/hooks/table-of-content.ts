import constate from 'constate';
import { useCallback, useState } from 'react';

export type Headings = HTMLHeadingElement[]

export type HeadingType = {
  id: string;
  title: string;
  items?: HeadingType[];
}

type UseTableOfContentFc = (initialHeadings: {
  initialHeadings?: HeadingType[];
}) => {
  headings: HeadingType[];
  updateHeadings: (titles: HeadingType[]) => void;
  getNestedHeadings: (headingElements: Headings) => HeadingType[];
}

const useTableOfContent: UseTableOfContentFc = ({
  initialHeadings = [],
}) => {
  const [headings, setHeadings] = useState<HeadingType[]>(initialHeadings);

  const updateHeadings = useCallback(titles => setHeadings(titles), []);

  const getNestedHeadings = (headingElements: Headings) => {
    const nestedHeadings: HeadingType[] = [];

    headingElements.forEach((heading) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === 'H2') {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items?.push({
          id,
          title,
        });
      }
    });

    return nestedHeadings;
  };

  return { headings, updateHeadings, getNestedHeadings };
};

export const [TocProvider, useToc] = constate(
  useTableOfContent,
  value => ({
    headings: value.headings,
    updateHeadings: value.updateHeadings,
    getNestedHeadings: value.getNestedHeadings,
  }),
);

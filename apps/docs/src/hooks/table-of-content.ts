import constate from 'constate';
import { useCallback, useState } from 'react';

export type HeadingType = {
  id: string;
  title: string;
  items?: HeadingType[];
}

type useTableOfContentFc = (initialHeadings: {
  initialHeadings?: HeadingType[];
}) => {
  headings: HeadingType[];
  updateHeadings: (titles: HeadingType[]) => void;
}

const useTableOfContent: useTableOfContentFc = ({
  initialHeadings = [],
}) => {
  const [headings, setHeadings] = useState<HeadingType[]>(initialHeadings);
  const updateHeadings = useCallback(titles => setHeadings(titles), []);

  return { headings, updateHeadings };
};

export const [TocProvider, useToc, useHeadings] = constate(
  useTableOfContent,
  value => value.headings,
  value => value.updateHeadings,
);

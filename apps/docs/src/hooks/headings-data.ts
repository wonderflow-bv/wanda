import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Headings = HTMLHeadingElement[]

export type HeadingType = {
  id: string;
  title: string;
  items?: HeadingType[];
}

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

export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<HeadingType[]>([]);
  const { asPath } = useRouter();

  useEffect(() => {
    const headingElements: Headings = Array.from(
      document.querySelectorAll('h2, h3'),
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);

    return () => {
      setNestedHeadings([]);
    };
  }, [asPath]);

  return { nestedHeadings };
};

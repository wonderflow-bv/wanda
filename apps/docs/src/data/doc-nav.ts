import type { DocNavType } from 'types/data';

const DocNav: DocNavType = [
  {
    label: 'Usage',
    icon: 'book-bookmark',
    color: 'mint',
    url: '/documentation/get-started/introduction',
  },
  {
    label: 'Components',
    icon: 'grid',
    color: 'indigo',
    url: '/documentation/components/actions/button',
  },
  {
    label: 'Playground',
    icon: 'code',
    url: '/documentation/playground',
  },
  {
    label: 'Resources',
    icon: 'arrow-down-to-bracket',
    color: 'salmon',
    url: '/documentation/resources',
  },
  {
    label: 'What’s new',
    icon: 'compass',
    color: 'blue',
    url: '/documentation/release-notes',
  },
];

export default DocNav;

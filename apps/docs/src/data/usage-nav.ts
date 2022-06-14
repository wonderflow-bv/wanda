import { NavigationMenu } from 'types/data';

const UsageNav: NavigationMenu = [
  {
    title: 'Get started',
    items: [
      {
        path: '/documentation/usage/get-started/introduction',
        label: 'Introduction',
        target: '',
      },
      {
        path: '/documentation/usage/get-started/accessibility',
        label: 'Accessibility',
        target: '',
      },
      {
        path: '/documentation/usage/learn',
        label: 'Learn',
        target: '',
      },
      {
        path: '/documentation/usage/release-notes',
        label: 'Release notes',
        target: '',
      },
      {
        path: '/documentation/usage/resources',
        label: 'Resources',
        target: '',
      },
    ],
  },
  {
    title: 'Design',
    items: [
      {
        path: '/documentation/usage/design/brand',
        label: 'Brand',
        target: '',
      },
      {
        label: 'Foundations',
        expandable: true,
        items: [
          {
            path: '/documentation/usage/design/foundations/colors',
            label: 'Colors',
            target: '',
          },
          {
            path: '/documentation/usage/design/foundations/typography',
            label: 'Typography',
            target: '',
          },
          {
            path: '/documentation/usage/design/foundations/elevations',
            label: 'Elevations',
            target: '',
          },
        ],
      },
      {
        path: '/documentation/usage/design/iconography',
        label: 'Iconography',
        target: '',
      },
      {
        label: 'Motion',
        expandable: true,
        tag: {
          label: 'new',
          color: 'green',
        },
        items: [
          {
            path: '/documentation/usage/design/motion/principles',
            label: 'Principles',
            target: '',
          },
          {
            path: '/documentation/usage/design/motion/animations',
            label: 'Animations',
          },
          {
            path: '/documentation/usage/design/motion/speed',
            label: 'Speed',
            target: '',
          },
          {
            path: '/documentation/usage/design/motion/timing',
            label: 'Timing',
            target: '',
          },
        ],
      },
      {
        path: '/documentation/usage/design/themes',
        label: 'Themes',
        target: '',
      },
      {
        label: 'Recipes',
        expandable: true,
        items: [
          {
            path: '/documentation/usage/design/recipes/buttons',
            label: 'Buttons',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/popover',
            label: 'Popover',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/forms',
            label: 'Forms',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/info-states',
            label: 'Info states',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/loading',
            label: 'Loading',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/modals',
            label: 'Modals',
            target: '',
          },
          {
            path: '/documentation/usage/design/recipes/notifications',
            label: 'Notifications',
            target: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Develop',
    items: [
      {
        path: '/documentation/usage/develop/installation',
        label: 'Installation',
        target: '',
      },
      {
        path: '/documentation/usage/develop/design-tokens',
        label: 'Design tokens',
        target: '',
      },
      {
        path: '/documentation/usage/develop/global-styles',
        label: 'Global styles',
        target: '',
      },
      {
        path: '/documentation/usage/develop/ssr',
        label: 'Server side rendering',
        target: '',
      },
      {
        path: '/documentation/usage/develop/using-themes',
        label: 'Using themes',
        target: '',
      },
      {
        label: 'Utilities',
        expandable: true,
        items: [
          {
            path: '/documentation/usage/develop/utilities/id-provider',
            label: 'Id Provider',
            target: '',
          },
          {
            path: '/documentation/usage/develop/utilities/polymorphic',
            label: 'Polymorphic',
            target: '',
          },
        ],
      },
    ],
  },
];

export default UsageNav;

import { NavigationMenu } from 'types/data';

const UsageNav: NavigationMenu = [
  {
    title: 'Get started',
    icon: 'compass',
    items: [
      {
        path: '/get-started/introduction',
        label: 'Introduction',
        target: '',
      },
      {
        path: '/get-started/accessibility',
        label: 'Accessibility',
        target: '',
      },
      {
        path: '/learn',
        label: 'Learn',
        target: '',
      },
      {
        path: '/release-notes',
        label: 'Release notes',
        target: '',
      },
      {
        path: '/resources',
        label: 'Resources',
        target: '',
      },
    ],
  },
  {
    title: 'Design',
    icon: 'pc',
    items: [
      {
        path: '/design/brand',
        label: 'Brand',
        target: '',
      },
      {
        label: 'Foundations',
        expandable: true,
        items: [
          {
            path: '/design/foundations/colors',
            label: 'Colors',
            target: '',
          },
          {
            path: '/design/foundations/typography',
            label: 'Typography',
            target: '',
          },
          {
            path: '/design/foundations/elevations',
            label: 'Elevations',
            target: '',
          },
        ],
      },
      {
        path: '/design/iconography',
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
            path: '/design/motion/principles',
            label: 'Principles',
            target: '',
          },
          {
            path: '/design/motion/animations',
            label: 'Animations',
          },
          {
            path: '/design/motion/speed',
            label: 'Speed',
            target: '',
          },
          {
            path: '/design/motion/timing',
            label: 'Timing',
            target: '',
          },
        ],
      },
      {
        path: '/design/themes',
        label: 'Themes',
        target: '',
      },
      {
        label: 'Recipes',
        expandable: true,
        items: [
          {
            path: '/design/recipes/buttons',
            label: 'Buttons',
            target: '',
          },
          {
            path: '/design/recipes/popover',
            label: 'Popover',
            target: '',
          },
          {
            path: '/design/recipes/forms',
            label: 'Forms',
            target: '',
          },
          {
            path: '/design/recipes/info-states',
            label: 'Info states',
            target: '',
          },
          {
            path: '/design/recipes/loading',
            label: 'Loading',
            target: '',
          },
          {
            path: '/design/recipes/modals',
            label: 'Modals',
            target: '',
          },
          {
            path: '/design/recipes/notifications',
            label: 'Notifications',
            target: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Develop',
    icon: 'code',
    items: [
      {
        path: '/develop/installation',
        label: 'Installation',
        target: '',
      },
      {
        path: '/develop/design-tokens',
        label: 'Design tokens',
        target: '',
      },
      {
        path: '/develop/global-styles',
        label: 'Global styles',
        target: '',
      },
      {
        path: '/develop/ssr',
        label: 'Server side rendering',
        target: '',
      },
      {
        path: '/develop/using-themes',
        label: 'Using themes',
        target: '',
      },
      {
        label: 'Utilities',
        expandable: true,
        items: [
          {
            path: '/develop/utilities/id-provider',
            label: 'Id Provider',
            target: '',
          },
          {
            path: '/develop/utilities/polymorphic',
            label: 'Polymorphic',
            target: '',
          },
        ],
      },
    ],
  },
];

export default UsageNav;

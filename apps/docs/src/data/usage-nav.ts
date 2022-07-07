import { NavigationMenu } from 'types/data';

const UsageNav: NavigationMenu = [
  {
    title: 'Get started',
    items: [
      {
        path: '/get-started/documentation/get-started/introduction',
        label: 'Introduction',
        target: '',
      },
      {
        path: '/get-started/documentation/get-started/accessibility',
        label: 'Accessibility',
        target: '',
      },
      // {
      //   path: '/get-started/documentation/learn',
      //   label: 'Learn',
      //   target: '',
      // }
    ],
  },
  {
    title: 'Design',
    items: [
      {
        path: '/get-started/documentation/design/brand',
        label: 'Brand',
        target: '',
      },
      {
        label: 'Foundations',
        expandable: true,
        items: [
          {
            path: '/get-started/documentation/design/foundation/colors',
            label: 'Colors',
            target: '',
          },
          {
            path: '/get-started/documentation/design/foundation/typography',
            label: 'Typography',
            target: '',
          },
          {
            path: '/get-started/documentation/design/foundation/elevations',
            label: 'Elevations',
            target: '',
          },
        ],
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
            path: '/get-started/documentation/design/motion/principles',
            label: 'Principles',
            target: '',
          },
          {
            path: '/get-started/documentation/design/motion/animations',
            label: 'Animations',
          },
          {
            path: '/get-started/documentation/design/motion/speed',
            label: 'Speed',
            target: '',
          },
          {
            path: '/get-started/documentation/design/motion/timing',
            label: 'Timing',
            target: '',
          },
        ],
      },
      {
        path: '/get-started/documentation/design/themes',
        label: 'Themes',
        target: '',
      },
      {
        label: 'Recipes',
        expandable: true,
        items: [
          {
            path: '/get-started/documentation/design/recipes/buttons',
            label: 'Buttons',
            target: '',
          },
          {
            path: '/get-started/documentation/design/recipes/popover',
            label: 'Popover',
            target: '',
          },
          // {
          //   path: '/get-started/documentation/design/recipes/forms',
          //   label: 'Forms',
          //   target: '',
          // },
          // {
          //   path: '/get-started/documentation/design/recipes/info-states',
          //   label: 'Info states',
          //   target: '',
          // },
          // {
          //   path: '/get-started/documentation/design/recipes/loading',
          //   label: 'Loading',
          //   target: '',
          // },
          // {
          //   path: '/get-started/documentation/design/recipes/modals',
          //   label: 'Modals',
          //   target: '',
          // },
          // {
          //   path: '/get-started/documentation/design/recipes/notifications',
          //   label: 'Notifications',
          //   target: '',
          // },
        ],
      },
    ],
  },
  {
    title: 'Develop',
    items: [
      {
        path: '/get-started/documentation/develop/installation',
        label: 'Installation',
        target: '',
      },
      {
        path: '/get-started/documentation/develop/design-tokens',
        label: 'Design tokens',
        target: '',
      },
      {
        path: '/get-started/documentation/develop/global-styles',
        label: 'Global styles',
        target: '',
      },
      {
        path: '/get-started/documentation/develop/ssr',
        label: 'Server side rendering',
        target: '',
      },
      {
        path: '/get-started/documentation/develop/using-themes',
        label: 'Using themes',
        target: '',
      },
      {
        label: 'Utilities',
        expandable: true,
        items: [
          {
            path: '/get-started/documentation/develop/utilities/responsive-provider',
            label: 'Responsive provider',
            target: '',
          },
          {
            path: '/get-started/documentation/develop/utilities/id-provider',
            label: 'Id Provider',
            target: '',
          },
          {
            path: '/get-started/documentation/develop/utilities/polymorphic',
            label: 'Polymorphic',
            target: '',
          },
        ],
      },
    ],
  },
];

export default UsageNav;

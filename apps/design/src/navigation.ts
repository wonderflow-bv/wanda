import { NavigationMenu } from 'types/navigation'

const routes: NavigationMenu = [
  {
    title: 'Get started',
    color: 'cyan',
    icon: 'compass',
    items: [
      {
        path: '/get-started/introduction',
        label: 'Introduction',
        target: ''
      },
      {
        path: '/get-started/accessibility',
        label: 'Accessibility',
        target: ''
      },
      {
        path: '/learn',
        label: 'Learn',
        target: ''
      },
      {
        path: '/release-notes',
        label: 'Release notes',
        target: ''
      }
    ]
  },
  {
    title: 'Design',
    icon: 'pc',
    color: 'green',
    items: [
      {
        path: '/design/brand',
        label: 'Brand',
        target: ''
      },
      {
        label: 'Foundations',
        expandable: true,
        items: [
          {
            path: '/design/foundations/colors',
            label: 'Colors',
            target: ''
          },
          {
            path: '/design/foundations/typography',
            label: 'Typography',
            target: ''
          },
          {
            path: '/design/foundations/elevations',
            label: 'Elevations',
            target: ''
          },
          {
            path: '/design/foundations/motion',
            label: 'Motion',
            target: '',
            wip: true
          }
        ]
      },
      {
        path: '/design/iconography',
        label: 'Iconography',
        target: ''
      },
      {
        path: '/design/themes',
        label: 'Themes',
        target: ''
      },
      {
        label: 'Recipes',
        expandable: true,
        items: [
          {
            path: '/design/recipes/buttons',
            label: 'Buttons',
            target: ''
          },
          {
            path: '/design/recipes/dropdown',
            label: 'Dropdown',
            target: ''
          },
          {
            path: '/design/recipes/forms',
            label: 'Forms',
            target: ''
          },
          {
            path: '/design/recipes/info-states',
            label: 'Info states',
            target: ''
          },
          {
            path: '/design/recipes/loading',
            label: 'Loading',
            target: ''
          },
          {
            path: '/design/recipes/modals',
            label: 'Modals',
            target: ''
          },
          {
            path: '/design/recipes/notifications',
            label: 'Notifications',
            target: ''
          }
        ]
      }
    ]
  },
  {
    title: 'Develop',
    icon: 'code',
    color: 'yellow',
    items: [
      {
        path: '/develop/installation',
        label: 'Installation',
        target: ''
      },
      {
        path: '/develop/design-tokens',
        label: 'Design tokens',
        target: ''
      },
      {
        path: '/develop/global-styles',
        label: 'Global styles',
        target: ''
      },
      {
        path: '/develop/ssr',
        label: 'Server side rendering',
        target: ''
      },
      {
        path: '/develop/using-themes',
        label: 'Using themes',
        target: ''
      },
      {
        label: 'Utilities',
        expandable: true,
        items: [
          {
            path: '/develop/utilities/id-provider',
            label: 'Id Provider',
            target: ''
          },
          {
            path: '/develop/utilities/polymorphic',
            label: 'Polymorphic',
            target: ''
          }
        ]
      }
    ]
  },
  {
    title: 'Components',
    icon: 'grid',
    color: 'purple',
    items: [
      {
        path: '/components/overview',
        label: 'Overview',
        target: ''
      },
      {
        label: 'Actions',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/actions/button',
            label: 'Button',
            target: ''
          },
          {
            path: '/components/actions/disclosure',
            label: 'Disclosure',
            target: ''
          },
          {
            path: '/components/actions/icon-button',
            label: 'Icon button',
            target: ''
          },
          {
            path: '/components/actions/split-button',
            label: 'Split button',
            target: ''
          },
          {
            path: '/components/actions/toggle-button',
            label: 'Toggle button',
            target: ''
          }
        ]
      },
      {
        label: 'Dialogs',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/dialogs/drawer',
            label: 'Drawer',
            target: ''
          },
          {
            path: '/components/dialogs/dropdown',
            label: 'Dropdown',
            target: ''
          },
          {
            path: '/components/dialogs/info-state',
            label: 'Info state',
            target: ''
          },
          {
            path: '/components/dialogs/modal',
            label: 'Modal',
            target: ''
          },
          {
            path: '/components/dialogs/snackbar',
            label: 'Snackbar',
            target: ''
          },
          {
            path: '/components/dialogs/tooltip',
            label: 'Tooltip',
            target: ''
          }
        ]
      },
      {
        label: 'Inputs',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/inputs/autocomplete',
            label: 'Autocomplete',
            target: '',
            tag: {
              label: 'beta',
              color: 'blue'
            }
          },
          {
            path: '/components/inputs/select',
            label: 'Select',
            target: ''
          },
          {
            path: '/components/inputs/selection-controls',
            label: 'Selection controls',
            target: ''
          },
          {
            path: '/components/inputs/slider',
            label: 'Slider',
            target: ''
          },
          {
            path: '/components/inputs/textfield',
            label: 'Textfield',
            target: ''
          },
          {
            path: '/components/inputs/input-group',
            label: 'Input group',
            target: ''
          }
        ]
      },
      {
        label: 'Layouts',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/layouts/card',
            label: 'Card',
            target: ''
          },
          {
            path: '/components/layouts/container',
            label: 'Container',
            target: ''
          },
          {
            path: '/components/layouts/grid',
            label: 'Grid',
            target: ''
          },
          {
            path: '/components/layouts/masonry',
            label: 'Masonry',
            target: ''
          },
          {
            path: '/components/layouts/overlay-container',
            label: 'Overlay container',
            target: ''
          },
          {
            path: '/components/layouts/separator',
            label: 'Separator',
            target: ''
          },
          {
            path: '/components/layouts/stack',
            label: 'Stack',
            target: ''
          },
          {
            path: '/components/layouts/table',
            label: 'Table',
            target: ''
          }
        ]
      },
      {
        label: 'Loading',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/loading/circular-progress',
            label: 'Circular progress',
            target: ''
          },
          {
            path: '/components/loading/linear-progress',
            label: 'Linear progress',
            target: ''
          },
          {
            path: '/components/loading/skeleton-block',
            label: 'Skeleton block',
            target: ''
          },
          {
            path: '/components/loading/spinner',
            label: 'Spinner',
            target: ''
          }
        ]
      },
      {
        label: 'Navigation',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/navigation/menu',
            label: 'Menu',
            target: ''
          },
          {
            path: '/components/navigation/tab',
            label: 'Tab',
            target: ''
          },
          {
            path: '/components/navigation/pagination',
            label: 'Pagination',
            target: ''
          }
        ]
      },
      {
        label: 'Typography',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/typography/clamp-text',
            label: 'Clamp text',
            target: ''
          },
          {
            path: '/components/typography/list',
            label: 'List',
            target: ''
          },
          {
            path: '/components/typography/prose',
            label: 'Prose',
            target: ''
          },
          {
            path: '/components/typography/text',
            label: 'Text',
            target: ''
          },
          {
            path: '/components/typography/title',
            label: 'Title',
            target: ''
          }
        ]
      },
      {
        label: 'Other',
        expandable: true,
        target: '',
        items: [
          {
            path: '/components/other/avatar',
            label: 'Avatar',
            target: ''
          },
          {
            path: '/components/other/chip',
            label: 'Chip',
            target: ''
          },
          {
            path: '/components/other/datetime',
            label: 'Datetime',
            target: ''
          },
          {
            path: '/components/other/elevator',
            label: 'Elevator',
            target: ''
          },
          {
            path: '/components/other/icon',
            label: 'Icon',
            target: ''
          },
          {
            path: '/components/other/star-meter',
            label: 'Star meter',
            target: ''
          }
        ]
      }
    ]
  }
]

export default routes

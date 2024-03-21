import { NavigationMenu } from 'types/data';

const ChartsNav: NavigationMenu = [
  {
    title: 'Cartesian Charts',
    icon: 'bar-chart',
    items: [
      {
        path: '/get-started/charts/cartesians/line-chart',
        label: 'Line Chart',
        target: '',
        tag: {
          label: 'update',
          color: 'red',
        },
      },
      {
        path: '/get-started/charts/cartesians/bar-chart',
        label: 'Bar Chart',
        target: '',
        tag: {
          label: 'update',
          color: 'red',
        },
      },
      {
        path: '/get-started/charts/cartesians/stacked-bar-chart',
        label: 'Stacked Chart',
        target: '',
        tag: {
          label: 'new',
          color: 'green',
        },
      },
    ],
  },
  {
    title: 'Subcomponents',
    icon: 'layer-group',
    items: [
      {
        path: '/get-started/charts/subcomponents/cartesian-base',
        label: 'CartesianBase',
        target: '',
      },
    ],
  },
];

export default ChartsNav;

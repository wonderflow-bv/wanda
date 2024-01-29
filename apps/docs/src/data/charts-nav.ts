import { NavigationMenu } from 'types/data';

const ChartsNav: NavigationMenu = [
  {
    title: 'Cartesians',
    icon: 'bar-chart',
    items: [
      {
        path: '/get-started/charts/cartesians/line-chart',
        label: 'Line Chart',
        target: '',
      },
    ],
  },
  {
    title: 'Backbone',
    icon: 'layer-group',
    items: [
      {
        path: '/get-started/charts/backbone/cartesian-base',
        label: 'CartesianBase',
        target: '',
      },
    ],
  },
];

export default ChartsNav;

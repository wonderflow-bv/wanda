import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CartesianBase } from './cartesian-base';

const story: ComponentMeta<typeof CartesianBase> = {
  title: 'Charts/Cartesian Base',
  component: CartesianBase,
  args: {
    grid: {
      tickColumns: 10,
      tickRows: 10,
    },
    top: {
      domain: ['a', 'b', 'c', 'd', 'e'],
      label: 'Top Label',
      scaleType: 'label',
      paddingOuter: 0,
      paddingInner: 1,
    },
    right: {
      domain: [0, 5.0, 3.0, 4.0, 1.0],
      label: 'Right Label',
      scaleType: 'linear',
    },
    bottom: {
      domain: [new Date('2020-01-01').getTime(), new Date('2020-01-10').getTime()],
      label: 'Bottom Label',
      scaleType: 'time',
    },
    left: {
      domain: [0, 10000],
      label: 'Left Label',
      scaleType: 'linear',
    },
  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBase> = args => <CartesianBase {...args} />;

export const Default = Template.bind({});
Default.args = {
};


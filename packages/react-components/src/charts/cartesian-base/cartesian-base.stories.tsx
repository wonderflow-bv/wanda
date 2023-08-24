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
      domain: ['A', 'B', 'C', 'D', 'E'],
      label: 'Top Label',
      scaleType: 'label',
      paddingOuter: 0,
      paddingInner: 1,
    },
    right: {
      domain: [0, 0.01],
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
    styleConfig: {
      // grid: { rows: { stroke: 'blue' } },
    },
  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBase> = args => <CartesianBase {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const TwoAxis = Template.bind({});
TwoAxis.args = {
  grid: {
    hideColumns: true,
    tickColumns: 10,
    tickRows: 10,
  },
  top: undefined,
  right: undefined,
  bottom: {
    domain: [new Date('2020-01-01').getTime(), new Date('2020-01-10').getTime()],
    label: 'Bottom Label',
    scaleType: 'time',
  },
  left: {
    domain: [0, 1000000],
    label: 'Left Label',
    scaleType: 'linear',
    hideAxisLine: true,
  },
};


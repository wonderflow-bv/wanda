import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CartesianBase } from './cartesian-base';

const story: ComponentMeta<typeof CartesianBase> = {
  title: 'Charts/Cartesian Base',
  component: CartesianBase,
  args: {
    top: {
      domain: ['a', 'b', 'c', 'd', 'e'],
      label: 'Top Label',
      orientation: 'top',
      scaleType: 'label',
    },
    right: {
      domain: [0, 1],
      label: 'Right Label',
      orientation: 'top',
      scaleType: 'linear',

    },
    bottom: {
      domain: ['a', 'b', 'c', 'd', 'e'],
      label: 'Bottom Label',
      orientation: 'top',
      scaleType: 'label',
    },
    left: {
      domain: [0, 10000],
      label: 'Left Label',
      orientation: 'top',
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

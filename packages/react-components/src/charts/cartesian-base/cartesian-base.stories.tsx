import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CartesianBase } from './cartesian-base';

const story: ComponentMeta<typeof CartesianBase> = {
  title: 'Charts/Cartesian Base',
  component: CartesianBase,
  args: {

  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBase> = args => <CartesianBase {...args} />;

export const Default = Template.bind({});
Default.args = {

};

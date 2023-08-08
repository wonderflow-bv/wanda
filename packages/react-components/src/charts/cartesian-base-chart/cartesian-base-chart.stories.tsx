import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CartesianBaseChart } from './cartesian-base-chart';

const story: ComponentMeta<typeof CartesianBaseChart> = {
  title: 'Charts/CartesianBase',
  component: CartesianBaseChart,
  args: {

  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBaseChart> = args => <CartesianBaseChart {...args} />;

export const Default = Template.bind({});
Default.args = {

};

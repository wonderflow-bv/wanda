import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Elevator } from './elevator';

const story: ComponentMeta<typeof Elevator> = {
  title: 'Components/Widgets/Elevator',
  component: Elevator,
};

export default story;

const Template: ComponentStory<typeof Elevator> = args => (
  <Elevator {...args}>
    <div style={{ padding: 32, background: 'var(--dimmed-0)' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.</div>
  </Elevator>
);

export const Default = Template.bind({});
Default.args = {
  resting: 1,
};
export const WithHover = Template.bind({});
WithHover.args = {
  resting: 1,
  hover: 3,
};

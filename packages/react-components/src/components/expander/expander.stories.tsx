import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Expander } from './expander';

const story: ComponentMeta<typeof Expander> = {
  title: 'Actions/Expander',
  component: Expander,
  args: {
    height: '100px',
  },

};

export default story;

const Template: ComponentStory<typeof Expander> = args => (
  <Expander {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    <img
      alt=""
      src="https://images.unsplash.com/photo-1527831200629-a0438d65142b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    />
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Expander>
);

export const Default = Template.bind({});

export const Open = Template.bind({});

Open.args = {
  defaultOpen: true,
};

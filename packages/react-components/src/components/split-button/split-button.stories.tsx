import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Menu } from '../..';
import { SplitButton } from './split-button';

const story: ComponentMeta<typeof SplitButton> = {
  title: 'Actions/Split button',
  component: SplitButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    label: 'Click me',
    fullWidth: false,
    disabled: true,
    busy: false,
    placement: 'auto-start',
    offset: 8,
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof SplitButton> = args => (
  <SplitButton {...args}>
    <Menu>
      <Menu.Item value="1" padding={false}>Option 1</Menu.Item>
      <Menu.Item value="2" padding={false}>Option 2</Menu.Item>
    </Menu>
  </SplitButton>
);

export const Default = Template.bind({});

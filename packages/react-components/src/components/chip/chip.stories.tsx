import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Chip } from './chip';

const story: ComponentMeta<typeof Chip> = {
  title: 'Widgets/Chip',
  component: Chip,
  argTypes: {
    onDismissClick: {
      action: 'dismissed',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    color: {
      options: ['blue', 'cyan', 'dipsy', 'gray', 'green', 'indigo', 'magenta', 'purple', 'red', 'salmon', 'violet', 'yellow'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'regular',
    interactive: false,
    color: 'gray',
  },
};

export default story;

const Template: ComponentStory<typeof Chip> = args => <Chip {...args}>Chip text</Chip>;

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'bell',
};

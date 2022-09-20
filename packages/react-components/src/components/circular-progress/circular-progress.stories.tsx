import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CircularProgress } from './circular-progress';

const story: ComponentMeta<typeof CircularProgress> = {
  title: 'Loading/Circular progress',
  component: CircularProgress,
  args: {
    max: 100,
    dimension: 'regular',
    showProgress: true,
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof CircularProgress> = args => <CircularProgress {...args} />;

export const Determinate = Template.bind({});
Determinate.args = {
  value: 2000,
};

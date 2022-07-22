import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Stack } from '../..';
import { StarMeter } from './star-meter';

const story: ComponentMeta<typeof StarMeter> = {
  title: 'Components/Widgets/Star meter',
  component: StarMeter,
  args: {
    dimension: 'regular',
    value: 3.76,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof StarMeter> = args => <Stack><StarMeter {...args} /></Stack>;

export const Default = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Hello there 👋',
};

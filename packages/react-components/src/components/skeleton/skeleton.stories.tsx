import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Skeleton } from './skeleton';

const story: ComponentMeta<typeof Skeleton> = {
  title: 'Loading/Skeleton',
  component: Skeleton,
  args: {
    borderRadius: 8,
    gap: 8,
    enableAnimation: true,
    inline: false,
  },
};

export default story;

const Template: ComponentStory<typeof Skeleton> = args => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  count: 4,
  height: '48px',
};

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  width: '80px',
  height: '80px',
};

export const Rounded = Template.bind({});
Rounded.args = {
  width: '400px',
  height: '48px',
  borderRadius: 16,
};

export const WithGap = Template.bind({});
WithGap.args = {
  gap: 32,
  count: 4,
  height: '48px',
};

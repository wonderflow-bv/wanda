import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Avatar } from './avatar';

const story: ComponentMeta<typeof Avatar> = {
  title: 'Components/Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});

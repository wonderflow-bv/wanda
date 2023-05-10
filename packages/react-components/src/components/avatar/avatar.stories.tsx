import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Avatar } from './avatar';

const story: ComponentMeta<typeof Avatar> = {
  title: 'Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'regular',
    src: 'https://xsgames.co/randomusers/avatar.php?g=male',
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

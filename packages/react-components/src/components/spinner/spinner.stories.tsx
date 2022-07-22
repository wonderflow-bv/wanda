import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Spinner } from './spinner';

const story: ComponentMeta<typeof Spinner> = {
  title: 'Components/Loading/Spinner',
  component: Spinner,
  args: {
    dimension: 'big',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Spinner> = args => <Spinner {...args} />;

export const Default = Template.bind({});

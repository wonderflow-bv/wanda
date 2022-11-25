import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Toggle } from './toggle';

const story: ComponentMeta<typeof Toggle> = {
  title: 'Inputs/Toggle',
  component: Toggle,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

export const Default: ComponentStory<typeof Toggle> = args => <Toggle {...args} />;
export const Checked: ComponentStory<typeof Toggle> = args => <Toggle defaultChecked {...args} />;
export const DisabledChecked: ComponentStory<typeof Toggle> = args => <Toggle defaultChecked disabled {...args} />;
export const withLabel: ComponentStory<typeof Toggle> = args => <Toggle defaultChecked label="Label" {...args} />;

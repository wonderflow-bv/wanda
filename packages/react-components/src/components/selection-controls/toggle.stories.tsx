import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Card } from '@/components';

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

const ConstraintTemplate: ComponentStory<typeof Toggle> = args => (
  <Card dimmed={0} bordered style={{ width: '300px' }}>
    <Toggle {...args} />
  </Card>
);

export const withConstraint = ConstraintTemplate.bind({});
withConstraint.args = {
  defaultChecked: true,
  disabled: false,
  label: 'MyVeryLongUsernameUnspacedString@wonderflow.ai',
};

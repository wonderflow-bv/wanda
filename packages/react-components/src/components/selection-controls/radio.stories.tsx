import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Card } from '@/components';

import { Radio } from './radio';

const story: ComponentMeta<typeof Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
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

const Template: ComponentStory<typeof Radio> = args => (
  <Radio {...args} />
);

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
  defaultChecked: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true,
};

export const withLabel = Template.bind({});
withLabel.args = {
  defaultChecked: true,
  disabled: false,
  label: 'Label',
};

const ConstraintTemplate: ComponentStory<typeof Radio> = args => (
  <Card dimmed={0} bordered style={{ width: '300px' }}>
    <Radio {...args} />
  </Card>
);

export const withConstraint = ConstraintTemplate.bind({});
withConstraint.args = {
  defaultChecked: true,
  disabled: false,
  label: 'myVeryLongUsernameUnspacedLabel@wonderflow.ai',
};

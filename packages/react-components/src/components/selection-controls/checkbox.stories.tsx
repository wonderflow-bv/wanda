import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Card } from '@/components';

import { Checkbox } from './checkbox';

const story: ComponentMeta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
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

const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
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

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  indeterminate: true,
};

export const withLabel = Template.bind({});
withLabel.args = {
  defaultChecked: true,
  disabled: false,
  label: 'Label',
};

const ConstraintTemplate: ComponentStory<typeof Checkbox> = args => (
  <Card dimmed={0} bordered style={{ width: '300px' }}>
    <Checkbox {...args} />
  </Card>
);

export const withConstraint = ConstraintTemplate.bind({});
withConstraint.args = {
  defaultChecked: true,
  disabled: false,
  label: 'myVeryLongUsernameUnspacedLabel@wonderflow.ai',
};

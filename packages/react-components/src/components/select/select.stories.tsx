import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Select } from './select';

const story: ComponentMeta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    kind: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    dimension: 'regular',
  },
};

export default story;

const SingleTemplate: ComponentStory<typeof Select> = args => (
  <Select defaultValue="placeholder" {...args}>
    <option value="placeholder" hidden disabled>Pick an option</option>
    <optgroup label="Option Group One">
      <option value="1">This is a very long option selected</option>
      <option value="2">Option 2</option>
    </optgroup>
    <optgroup label="Option Group Two">
      <option value="3">Option 1</option>
      <option value="4">Option 2</option>
      <option value="5">Option 3</option>
    </optgroup>
  </Select>
);

const MultipleTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args} kind="multiple">
    <optgroup label="Option Group">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </optgroup>
    <optgroup label="Option Group 2">
      <option>Option 4</option>
      <option>Option 5</option>
      <option>Option 6</option>
    </optgroup>
  </Select>
);

export const Single = SingleTemplate.bind({});
Single.args = {
  disabled: false,
  kind: 'single',
};

export const WithLabel = SingleTemplate.bind({});
WithLabel.args = {
  disabled: false,
  kind: 'single',
  label: 'Label',
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  kind: 'multiple',
};

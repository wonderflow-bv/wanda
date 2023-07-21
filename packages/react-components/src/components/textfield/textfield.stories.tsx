import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Stack } from '../..';
import { Textfield } from './textfield';

const story: ComponentMeta<typeof Textfield> = {
  title: 'Inputs/Textfield',
  component: Textfield,
  args: {
    dimension: 'regular',
    readOnly: false,
    defaultValue: 'Sample value',
  },
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
    readOnly: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    invalid: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    iconPosition: {
      options: ['left', 'right', undefined],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const SingleTemplate: ComponentStory<typeof Textfield> = args => (
  <Stack rowGap={24}>
    <Textfield {...args} size={4} placeholder="Placeholder" message="" />
    <Textfield {...args} size={4} placeholder="Placeholder" />
    <Textfield {...args} type="password" label="Password" defaultValue="123123klòasj" placeholder="Placeholder" />
  </Stack>
);

const MultipleTemplate: ComponentStory<typeof Textfield> = args => (
  <Stack rowGap={24}>
    <Textfield {...args} label="Filled" defaultValue="Sample value" />
    <Textfield {...args} label="Filled read only" defaultValue="Sample value" readOnly />
    <Textfield {...args} label="With optional placeholder" defaultValue="" placeholder="Placeholder" />
    <Textfield {...args} label="Empty disbled" placeholder="Placeholder" disabled />
    <Textfield {...args} label="Filled disabled" defaultValue="Sample value" disabled />
    <Textfield {...args} type="password" label="Type password" defaultValue="912435jh345" />
    <Textfield {...args} type="number" label="Type number" defaultValue={100} />
    <Textfield {...args} type="search" label="Type search" />
    <Textfield {...args} type="date" label="Type date" />
    <Textfield {...args} type="time" label="Type time" />
    <Textfield {...args} type="month" label="Type month" />
    <Textfield {...args} type="week" label="Type week" />
    <Textfield {...args} type="datetime-local" label="Type datetime-local" />
  </Stack>
);

export const Single = SingleTemplate.bind({});
Single.args = {
  disabled: false,
  label: 'Label',
  message: 'Sample hint text',
};
Single.argTypes = {
  textarea: {
    table: {
      disable: true,
    },
  },
};

export const Types = MultipleTemplate.bind({});
Types.args = {
  disabled: false,
};
Types.argTypes = {
  textarea: {
    table: {
      disable: true,
    },
  },
};

const TextareaTemplate: ComponentStory<typeof Textfield> = args => (
  <Textfield
    {...args}
    defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aut, enim tempore necessitatibus maiores temporibus? Cumque nulla harum pariatur nesciunt repellat similique. Velit, totam qui."
    placeholder="Placeholder"
    label="Label"
    message="Sample hint text"
  />
);

export const Textarea = TextareaTemplate.bind({});
Textarea.args = {
  disabled: false,
  textarea: true,
};
Textarea.argTypes = {
  textarea: {
    table: {
      disable: true,
    },
  },
};

export const WithIcon = SingleTemplate.bind({});
WithIcon.args = {
  icon: 'calendar',
  type: 'date',
};

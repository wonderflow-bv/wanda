import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Disclosure } from './disclosure';

const story: ComponentMeta<typeof Disclosure> = {
  title: 'Actions/Disclosure',
  component: Disclosure,
  args: {
    padding: true,
    expandable: true,
    dimension: 'regular',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    open: false,
  },
  argTypes: {
    expandable: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
  </Disclosure>
);

export const Default = Template.bind({});

const NestedTemplate: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!

    <Disclosure summary="Nested">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
      sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
    </Disclosure>
  </Disclosure>
);

export const Nested = NestedTemplate.bind({});

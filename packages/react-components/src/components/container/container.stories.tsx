import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Container } from './container';

const story: ComponentMeta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  argTypes: {
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    className: {
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['full', 'medium', 'large', 'auto'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'full',
    padding: true,
  },
};

export default story;

const Template: ComponentStory<typeof Container> = args => <Container {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  dimension: 'medium',
  className: 'ContainerEx',
};

export const Large = Template.bind({});
Large.args = {
  dimension: 'large',
  className: 'ContainerEx',
};

export const Auto = Template.bind({});
Auto.args = {
  dimension: 'auto',
  className: 'ContainerEx',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  className: 'ContainerEx',
};

export const NoPadding = Template.bind({});
NoPadding.args = {
  padding: false,
  className: 'ContainerEx',
};

export const AsSection = Template.bind({});
AsSection.args = {
  className: 'ContainerEx',
};

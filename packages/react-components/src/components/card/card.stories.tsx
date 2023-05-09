import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Stack, Symbol, Text,
} from '../..';
import { Card } from './card';

const story: ComponentMeta<typeof Card> = {
  title: 'Layouts/Card',
  component: Card,
  args: {
    bordered: false,
    vibrant: false,
    highlightOnHover: true,
    dimmed: 1,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Text variant="heading-2">Card title</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </>
  ),
};
export const Vibrant = Template.bind({});
Vibrant.args = {
  vibrant: true,
  children: (
    <>
      <Text variant="heading-2">Card title</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </>
  ),
};

export const WithLeft = Template.bind({});
WithLeft.args = {
  left: <Symbol source="bell" dimension={32} />,
  children: (
    <Stack>
      <Text variant="heading-2">Card title</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  ),
};

export const WithRight = Template.bind({});
WithRight.args = {
  right: <Symbol source="bell" dimension={32} />,
  children: (
    <Stack>
      <Text variant="heading-2">Card title</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  ),
};

export const WithLeftAndRight = Template.bind({});
WithLeftAndRight.args = {
  left: <Symbol source="bell" dimension={32} />,
  children: (
    <Stack>
      <Text variant="heading-2">Card title</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  ),
  right: <Symbol source="calendar" dimension={32} />,
};

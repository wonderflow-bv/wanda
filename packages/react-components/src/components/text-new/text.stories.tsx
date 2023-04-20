/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Container } from '../..';
import { Text, TextVariants } from './text';

const story: ComponentMeta<typeof Text> = {
  title: 'Typography/Text-New',
  component: Text,
  args: {
    variant: 'body-1',
    color: undefined,
    children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores, tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!',
    textAlign: 'start',
    preventResponsive: true,
    truncate: false,
  },
  argTypes: {
    variant: {
      options: [
        'display-1',
        'display-2',
        'display-3',
        'display-4',
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'subtitle-1',
        'subtitle-2',
        'body-1',
        'body-2',
        'body-3'],
      control: { type: 'select' },
    },
    color: {
      options: ['positive', 'informative', 'danger', 'warning'],
      control: { type: 'select' },
    },
    textAlign: {
      options: ['start', 'center', 'end', 'justify'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Text> = args => <Container dimension="fixed"><Text {...args} /></Container>;

export const Default = Template.bind({});

const TemplateVariants: ComponentStory<typeof Text> = () => {
  const variants = ['display-1', 'display-2', 'display-3', 'display-4', 'heading-1', 'heading-2', 'heading-3',
    'heading-4', 'heading-5', 'heading-6', 'subtitle-1', 'subtitle-2', 'body-1', 'body-2', 'body-3'] as TextVariants[];

  return (
    <Container dimension="fixed">
      {variants.map(e => <Text key={e} variant={e}>{e}</Text>)}
    </Container>
  );
};

export const Variants = TemplateVariants.bind({});

const TemplateColors: ComponentStory<typeof Text> = () => {
  type TextColors = 'positive' | 'informative' | 'danger' | 'warning';
  const colors = ['positive', 'informative', 'danger', 'warning'] as TextColors[];

  return (
    <Container dimension="fixed">
      {colors.map(e => <Text key={e} variant="heading-1" color={e}>{e}</Text>)}
    </Container>
  );
};

export const Colors = TemplateColors.bind({});

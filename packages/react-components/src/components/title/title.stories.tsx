import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container } from '../..';
import { Title } from './title';

const story: ComponentMeta<typeof Title> = {
  title: 'Components/Typography/Title',
  component: Title,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    responsive: true,
  },
  argTypes: {
    level: {
      options: ['display', '1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
    },
    lineHeight: {
      options: ['none', 'small', 'large'],
      control: { type: 'inline-radio' },
    },
    textAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

export const Default: ComponentStory<typeof Title> = ({ lineHeight }) => (
  <Container>
    <Title lineHeight={lineHeight} as="h1" level="display">Sample title</Title>
    <Title lineHeight={lineHeight} as="h1" level="1">Sample title</Title>
    <Title lineHeight={lineHeight} as="h2" level="2">Sample title</Title>
    <Title lineHeight={lineHeight} as="h3" level="3">Sample title</Title>
    <Title lineHeight={lineHeight} as="h4" level="4">Sample title</Title>
    <Title lineHeight={lineHeight} as="h5" level="5">Sample title</Title>
    <Title lineHeight={lineHeight} as="h6" level="6">Sample title</Title>
  </Container>
);

const Template: ComponentStory<typeof Title> = args => (
  <Container dimension="medium">
    <Title {...args}>Sample title</Title>
  </Container>
);

export const Single = Template.bind({});
Single.args = {
  as: 'span',
  lineHeight: 'small',
  level: '1',
  maxWidth: 'auto',
  textAlign: 'center',
};

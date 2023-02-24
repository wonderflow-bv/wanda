import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Stack, Text } from '@/components';

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
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large', 'fixed', 'full'],
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

const TemplateComparison: ComponentStory<typeof Container> = () => (
  <Stack rowGap={24}>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Extra Small</Text>
      <Container dimension="extra-small" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Small</Text>
      <Container dimension="small" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Medium</Text>
      <Container dimension="medium" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Large</Text>
      <Container dimension="large" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Extra Large</Text>
      <Container dimension="extra-large" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Fixed</Text>
      <Container dimension="fixed" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Full</Text>
      <Container dimension="full" className="ContainerEx" />
    </Stack>
  </Stack>
);

export const WithPadding = Template.bind({});
WithPadding.args = {
  dimension: 'full',
  padding: true,
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

export const Comparison = TemplateComparison.bind({});


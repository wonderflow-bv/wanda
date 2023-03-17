import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Stack } from '../..';
import { InfoState } from './info-state';

const story: ComponentMeta<typeof InfoState> = {
  title: 'Dialogs/InfoState',
  component: InfoState,
  args: {
    title: 'Sample very long title',
  },
  argTypes: {
    iconColor: {
      options: ['gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof InfoState> = args => (
  <InfoState {...args}>
    <Stack hAlign="center" fill={false}>
      Cras ultricies, elit sit amet cursus consectetur, risus felis ullamcorper nulla,
      ut scelerisque sapien lorem non sem.
    </Stack>
  </InfoState>
);

export const Default = Template.bind({});
Default.args = {
  icon: 'compass',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'row',
  icon: 'compass',
};

export const WithImage = Template.bind({});
WithImage.args = {
  image: 'https://wonderimages.gumlet.io/placeholders/illustration.png?format=webp&q=100',
};

export const WithImageHorizontal = Template.bind({});
WithImageHorizontal.args = {
  direction: 'row',
  image: 'https://wonderimages.gumlet.io/placeholders/illustration.png?format=webp&q=100',
};

export const WithActions = Template.bind({});
WithActions.args = {
  actions:
  <>
    <Button>Primary</Button>
    <Button kind="flat">Secondary</Button>
  </>,
};

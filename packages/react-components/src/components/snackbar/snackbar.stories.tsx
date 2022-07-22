import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Snackbar } from './snackbar';

const story: ComponentMeta<typeof Snackbar> = {
  title: 'Components/Dialogs/Snackbar',
  component: Snackbar,
  argTypes: {
    kind: {
      options: ['info', 'warning', 'neutral', 'positive', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Snackbar> = args => (
  <Snackbar {...args}>
    Cras ultricies, elit sit amet cursus consectetur, risus felis ullamcorper nulla,
    ut scelerisque sapien lorem non sem. Integer vestibulum ornare ligula, a placerat lectus volutpat ultrices.
    Aliquam commodo malesuada purus a mollis.
  </Snackbar>
);

export const Single = Template.bind({});
Single.args = {
  title: 'Sample title',
};
export const Dismissable = Template.bind({});
Dismissable.args = {
  dismissable: true,
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button, Text } from '../..';
import { Tooltip } from './tooltip';

const story: ComponentMeta<typeof Tooltip> = {
  title: 'Dialogs/Tooltip',
  component: Tooltip,
  args: {
    trigger: <Text as="span">HTML</Text>,
    interactive: true,
  },
};

export default story;

const Template: ComponentStory<typeof Tooltip> = args => (
  <>
    <Tooltip {...args}>
      <button type="button">test</button>
      HTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands
      for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup Language
      <button type="button">test</button>
    </Tooltip>
    <Tooltip {...args}>
      <button type="button">test</button>
      HTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands
      for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup Language
      <button type="button">test</button>
    </Tooltip>
  </>
);

export const Default = Template.bind({});
Default.args = {
  interactive: true,
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  trigger: <Button>HTML</Button>,
  interactive: true,
};

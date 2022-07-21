import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { List } from './list';

const story: ComponentMeta<typeof List> = {
  title: 'Components/Typography/List',
  component: List,
  args: {
    hideMarker: false,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof List> = ({ marker, markerColor, ...args }) => (
  <List {...args}>
    <List.Li marker={marker} markerColor={markerColor}>List item text</List.Li>
    <List.Li marker={marker} markerColor={markerColor}>
      List item text List item textList item textList item
      textList item text
    </List.Li>
    <List.Li marker={marker} markerColor={markerColor}>List item text</List.Li>
  </List>
);

export const Default = Template.bind({});
export const CustomMarker = Template.bind({});
CustomMarker.args = {
  marker: 'circle-check',
};

export const MarkerColor = Template.bind({});
MarkerColor.args = {
  marker: 'circle-check',
  markerColor: 'var(--highlight-green-foreground)',
};

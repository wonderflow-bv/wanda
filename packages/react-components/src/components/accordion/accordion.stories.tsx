import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Accordion } from './accordion';

const story: ComponentMeta<typeof Accordion> = {
  title: 'Components/Actions/Accordion',
  component: Accordion,
};

export default story;

const Template: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Accordion.Item summary="Item 1">
      Item 1
    </Accordion.Item>
    <Accordion.Item summary="Item 2">
      Item 2
    </Accordion.Item>
    <Accordion.Item summary="Item 3">
      Item 3
    </Accordion.Item>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  ratio: '1',
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { Chip } from '../..';
import { Text } from '../text-new';
import { Menu } from './menu';

const story: ComponentMeta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
};

export default story;

const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item value="1" padding={false}>List item text</Menu.Item>
    <Menu.Item value="2" padding={false}>List item text</Menu.Item>
    <Menu.Item value="3" padding={false}>List item text List item text List item text List item text List item text</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="4" padding={false}>List item text</Menu.Item>
    <Menu.Item value="5" padding={false} subtext="Hint text">List item text with subtext</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="6" padding={false}>
      <span>
        <Text variant="heading-6">Custom item</Text>
        <Text variant="body-3">Custom sub text example</Text>
      </span>
    </Menu.Item>
  </Menu>
);

export const Default = Template.bind({});

export const WithMaxHeight = Template.bind({});
WithMaxHeight.args = {
  maxHeight: '100px',
};

const WithIconsTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item value="1" icon="user">List item text</Menu.Item>
    <Menu.Item value="2" icon="message">List item text List item</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" icon="bell">List item text</Menu.Item>
  </Menu>
);

export const WithIcons = WithIconsTemplate.bind({});

const WithCheckboxTemplate: ComponentStory<typeof Menu> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        value="1"
        checked={isChecked}
        icon={isChecked ? 'check' : undefined}
        onClick={() => setIsChecked(val => !val)}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        value="2"
        icon="compass"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      >
        List item text
      </Menu.Item>
    </Menu>
  );
};

export const WithCheckboxes = WithCheckboxTemplate.bind({});

const LinksTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item value="1" as="a" href="https://design.wonderflow.ai" target="_blank" icon="user">List item text as Link in new Tab</Menu.Item>
    <Menu.Item value="2" icon="message">List item text</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" as="a" href="https://design.wonderflow.ai" icon="bell">List item text as Link</Menu.Item>
  </Menu>
);

export const AsLink = LinksTemplate.bind({});

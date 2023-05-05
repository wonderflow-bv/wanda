import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Chip } from '../..';
import { Text } from '../../text-new';
import { Menu } from '..';

const story: ComponentMeta<typeof Menu.Item> = {
  title: 'Navigation/Menu/Menu Item',
  component: Menu.Item,
  args: {
    dimension: 'regular',
    padding: true,
    iconPosition: 'left',
    subtext: '',
    description: '',
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const TemplateItem: ComponentStory<typeof Menu.Item> = args => (
  <>
    <Menu.Item
      {...args}
      icon="compass"
      value="1"
    >
      List item text
    </Menu.Item>
    <Menu.Item
      {...args}
      icon="compass"
      decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      value="2"
    >
      List item text
    </Menu.Item>
  </>
);

export const DefaultItem = TemplateItem.bind({});

const WithCheckboxTemplate: ComponentStory<typeof Menu.ItemCheckbox> = (args) => {
  const [checked, setChecked] = useState<string>('1');

  return (
    <>
      {`Selected: ${checked ?? 'none'}`}
      <Menu.ItemCheckbox
        {...args}
        icon={checked === '1' ? 'check' : undefined}
        onClick={(_, value) => setChecked(value)}
        value="1"
        checked={checked === '1'}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.ItemCheckbox
        {...args}
        onClick={(_, value) => setChecked(value)}
        value="2"
        icon={checked === '2' ? 'check' : undefined}
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
        checked={checked === '2'}
      >
        List item text
      </Menu.ItemCheckbox>
    </>
  );
};

export const WithCheckboxes = WithCheckboxTemplate.bind({});

const WithDecoratorsTemplate: ComponentStory<typeof Menu.Item> = args => (
  <>
    <Menu.Item {...args} value="1" decoration={<Chip dimension="small" color="yellow">Good</Chip>} icon="user">List item text</Menu.Item>
    <Menu.Item {...args} value="2" decoration={<Chip dimension="small" color="blue">Example</Chip>} icon="message">List item text List item</Menu.Item>
    <Menu.Item {...args} value="3" decoration={<Text variant="body-3" color="danger">Warning</Text>} icon="compass">List item text</Menu.Item>
    <Menu.Item {...args} value="4" decoration={<Chip dimension="small" color="purple">Decoration</Chip>} icon="bell">List item text</Menu.Item>
  </>
);

export const WithDecorations = WithDecoratorsTemplate.bind({});

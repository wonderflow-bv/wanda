import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from '..'
import { Chip, Text } from '../..'

const story: ComponentMeta<typeof Menu.Item> = {
  title: 'Components/Navigation/Menu/Menu Item',
  component: Menu.Item,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150',
    padding: true,
    iconPosition: 'left'
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'radio' }
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
}

export default story

const TemplateItem: ComponentStory<typeof Menu.Item> = (args) => (
  <>
    <Menu.Item
      value="1"
      icon="compass"
      {...args}
    >
      List item text
    </Menu.Item>
    <Menu.Item
      value="2"
      icon="compass"
      decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      {...args}
    >
      List item text
    </Menu.Item>
  </>
)

export const DefaultItem = TemplateItem.bind({})

const WithCheckboxTemplate: ComponentStory<typeof Menu.ItemCheckbox> = (args) => {
  const [checked, setChecked] = useState<string>(null)

  return (
    <>
      {`Selected: ${checked || 'none'}`}
      <Menu.ItemCheckbox
        value="1"
        checked={checked}
        icon={checked === '1' ? 'check' : undefined}
        onClick={(_, value) => setChecked(value)}
        {...args}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        onClick={(_, value) => setChecked(value)}
        value="2"
        icon={checked === '2' ? 'check' : undefined}
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
        {...args}
      >
        List item text
      </Menu.Item>
    </>
  )
}

export const WithCheckboxes = WithCheckboxTemplate.bind({})

const WithDecoratorsTemplate: ComponentStory<typeof Menu.Item> = (args) => (
  <>
    <Menu.Item value="1" decoration={<Chip dimension="small" color="yellow">Good</Chip>} icon="user" {...args}>List item text</Menu.Item>
    <Menu.Item value="2" decoration={<Chip dimension="small" color="blue">Example</Chip>} icon="message" {...args}>List item text List item</Menu.Item>
    <Menu.Item value="3" decoration={<Text size={14} sentiment="danger">Warning</Text>} icon="compass" {...args}>List item text</Menu.Item>
    <Menu.Item value="4" decoration={<Chip dimension="small" color="purple">Decoration</Chip>} icon="bell" {...args}>List item text</Menu.Item>
  </>
)

export const WithDecorations = WithDecoratorsTemplate.bind({})

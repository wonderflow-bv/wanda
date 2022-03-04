import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from '..'
import { Chip, Text } from '../..'

export default {
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
} as ComponentMeta<typeof Menu.Item>

const TemplateItem: ComponentStory<typeof Menu.Item> = (args) => (
  <>
    <Menu.Item
      icon="compass"
      {...args}
    >
      List item text
    </Menu.Item>
    <Menu.Item
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
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <>
      <Menu.ItemCheckbox
        checked={checked}
        icon={checked ? 'check' : undefined}
        onClick={() => setChecked(val => !val)}
        {...args}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        icon="compass"
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
    <Menu.Item decoration={<Chip dimension="small" color="yellow">Good</Chip>} icon="user" {...args}>List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="blue">Example</Chip>} icon="message" {...args}>List item text List item</Menu.Item>
    <Menu.Item decoration={<Text size={14} sentiment="danger">Warning</Text>} icon="compass" {...args}>List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="purple">Decoration</Chip>} icon="bell" {...args}>List item text</Menu.Item>
  </>
)

export const WithDecorations = WithDecoratorsTemplate.bind({})

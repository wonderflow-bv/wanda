import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from './menu'
import { Separator, Chip, Text } from '../..'

export default {
  title: 'Components/Navigation/Menu',
  component: Menu,
  args: {
    dimension: 'regular',
    iconPosition: 'left',
    padding: true
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular'],
      control: { type: 'radio' }
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item padding={false}>List item text</Menu.Item>
    <Menu.Item padding={false}>List item text</Menu.Item>
    <Menu.Item padding={false}>List item text List item textList item textList item textList item text</Menu.Item>
    <Separator />
    <Menu.Item padding={false}>List item text</Menu.Item>
  </Menu>
)

export const Default = Template.bind({})

const WithIconsTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item icon="user">List item text</Menu.Item>
    <Menu.Item icon="message">List item text List item</Menu.Item>
    <Separator />
    <Menu.Item>List item text</Menu.Item>
    <Menu.Item icon="bell">List item text</Menu.Item>
  </Menu>
)

export const WithIcons = WithIconsTemplate.bind({})

const WithCheckboxTemplate: ComponentStory<typeof Menu> = (args) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        checked={checked}
        icon={checked ? 'check' : undefined}
        onClick={() => setChecked(val => !val)}
      >
        Checkable item
      </Menu.ItemCheckbox>
      <Menu.Item
        icon="compass"
        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}
      >
        List item text
      </Menu.Item>
    </Menu>
  )
}

export const WithCheckboxes = WithCheckboxTemplate.bind({})

const LinksTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item as="a" href="https://design.wonderflow.ai" icon="user">List item text</Menu.Item>
    <Menu.Item icon="message">List item text List item</Menu.Item>
    <Separator />
    <Menu.Item>List item text</Menu.Item>
    <Menu.Item as="a" href="https://design.wonderflow.ai" icon="bell">List item text</Menu.Item>
  </Menu>
)

export const AsLink = LinksTemplate.bind({})

const WithDecoratorsTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item decoration={<Chip dimension="small" color="yellow">Good</Chip>} icon="user">List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="blue">Example</Chip>} icon="message">List item text List item</Menu.Item>
    <Separator />
    <Menu.Item decoration={<Text size={14} sentiment="danger">Warning</Text>} icon="compass">List item text</Menu.Item>
    <Menu.Item decoration={<Chip dimension="small" color="purple">Decoration</Chip>} icon="bell">List item text</Menu.Item>
  </Menu>
)

export const WithDecorations = WithDecoratorsTemplate.bind({})

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from './menu'
import { Chip } from '../..'

const story: ComponentMeta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu
}

export default story

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item value="1" padding={false}>List item text</Menu.Item>
    <Menu.Item value="2" padding={false}>List item text</Menu.Item>
    <Menu.Item value="3" padding={false}>List item text List item textList item textList item textList item text</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="4" padding={false}>List item text</Menu.Item>
  </Menu>
)

export const Default = Template.bind({})

export const WithMaxHeight = Template.bind({})
WithMaxHeight.args = {
  maxHeight: '100px'
}

const WithIconsTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item value="1" icon="user">List item text</Menu.Item>
    <Menu.Item value="2" icon="message">List item text List item</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" icon="bell">List item text</Menu.Item>
  </Menu>
)

export const WithIcons = WithIconsTemplate.bind({})

const WithCheckboxTemplate: ComponentStory<typeof Menu> = (args) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Menu {...args}>
      <Menu.ItemCheckbox
        value="1"
        checked={checked}
        icon={checked ? 'check' : undefined}
        onClick={() => setChecked(val => !val)}
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
  )
}

export const WithCheckboxes = WithCheckboxTemplate.bind({})

const LinksTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item value="1" as="a" href="https://design.wonderflow.ai" icon="user">List item text</Menu.Item>
    <Menu.Item value="2" icon="message">List item text List item</Menu.Item>
    <Menu.Separator />
    <Menu.Item value="3">List item text</Menu.Item>
    <Menu.Item value="4" as="a" href="https://design.wonderflow.ai" icon="bell">List item text</Menu.Item>
  </Menu>
)

export const AsLink = LinksTemplate.bind({})

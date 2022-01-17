import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Menu, Chip } from '../..'

export default {
  title: 'Components/Navigation/Menu Item',
  component: Menu.Item,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150'
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
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
    <Menu>
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
    </Menu>
  )
}

export const WithCheckboxes = WithCheckboxTemplate.bind({})

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Polymorphic } from '../..'
import { Button, ButtonsGroup } from './button'

export default {
  title: 'Components/Actions/Button',
  component: Button,
  args: {
    dimension: 'regular',
    kind: 'primary',
    children: 'Click me',
    fullWidth: false,
    disabled: false,
    busy: false,
    pressed: false
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: {
        disable: true
      }
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' }
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
} as ComponentMeta<Polymorphic.IntrinsicElement<typeof Button>>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  disabled: false
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: 'bookmark',
  iconPosition: 'left',
  iconColor: 'currentColor'
}

const GroupTemplate: ComponentStory<typeof Button> = (args) => (
  <ButtonsGroup {...args}>
    <Button pressed>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button disabled>Action</Button>
  </ButtonsGroup>
)

export const Grouped = GroupTemplate.bind({})
Grouped.args = {}

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ToggleButton } from './toggle-button'

export default {
  title: 'Components/Actions/Toggle button',
  component: ToggleButton,
  args: {
    dimension: 'regular',
    kind: 'primary',
    restingIcon: 'play'
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    },
    kind: {
      options: ['primary', 'secondary', 'flat'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof ToggleButton>

const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />

export const Default = Template.bind({})

export const MultipleIcons = Template.bind({})
MultipleIcons.args = {
  pressedIcon: 'pause'
}

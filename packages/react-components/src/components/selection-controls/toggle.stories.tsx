import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Toggle } from './toggle'

export default {
  title: 'Components/Inputs/Toggle',
  component: Toggle,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true
      }
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' }
    }
  }
} as ComponentMeta<typeof Toggle>

export const Default: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />
export const Checked: ComponentStory<typeof Toggle> = (args) => <Toggle defaultChecked {...args} />
export const DisabledChecked: ComponentStory<typeof Toggle> = (args) => <Toggle defaultChecked disabled {...args} />

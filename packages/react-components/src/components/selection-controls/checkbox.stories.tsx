import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Checkbox } from './checkbox'

export default {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
)

export const Default = Template.bind({})

export const Checked = Template.bind({})
Checked.args = {
  defaultChecked: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  defaultChecked: true,
  disabled: true
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  indeterminate: true
}

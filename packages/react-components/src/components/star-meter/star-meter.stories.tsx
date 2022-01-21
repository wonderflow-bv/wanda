import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StarMeter } from './star-meter'
import { Stack } from '../..'

export default {
  title: 'Components/Widgets/Star meter',
  component: StarMeter,
  args: {
    dimension: 'regular',
    value: 3.76
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof StarMeter>

const Template: ComponentStory<typeof StarMeter> = (args) => <Stack><StarMeter {...args} /></Stack>

export const Default = Template.bind({})

export const CustomLabel = Template.bind({})
CustomLabel.args = {
  label: 'Hello there 👋'
}

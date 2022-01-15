import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CircularProgress } from './circular-progress'

export default {
  title: 'Components/Loading/Circular progress',
  component: CircularProgress,
  args: {
    max: 100,
    dimension: 'regular',
    showProgress: true
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100
      }
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' }
    }
  }
} as ComponentMeta<typeof CircularProgress>

const Template: ComponentStory<typeof CircularProgress> = (args) => <CircularProgress {...args} />

export const Determinate = Template.bind({})
Determinate.args = {
  value: 2000
}

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Polymorphic } from '../..'
import { Stack } from './stack'

export default {
  title: 'Layouts/Stack',
  component: Stack,
  argTypes: {
    inline: {
      options: [true, false],
      control: { type: 'inline-radio' }
    },
    wrap: {
      options: [true, false],
      control: { type: 'inline-radio' }
    },
    fill: {
      options: [true, false],
      control: { type: 'inline-radio' }
    },
    direction: {
      options: ['row', 'column'],
      control: { type: 'inline-radio' }
    }
  },
  args: {
    direction: 'row',
    verticalPadding: 16,
    horizontalPadding: 24,
    columnGap: 16,
    rowGap: 80,
    wrap: true,
    as: 'div'
  }
} as ComponentMeta<Polymorphic.IntrinsicElement<typeof Stack>>

const Template: ComponentStory<typeof Stack> = (args) => (
  <Stack {...args}>
    <div className="DivEx">01</div>
    <div className="DivEx">02</div>
    <div className="DivEx">03</div>
    <div className="DivEx">04</div>
    <div className="DivEx">05</div>
    <div className="DivEx">06</div>
    <div className="DivEx">07</div>
    <div className="DivEx">08</div>
    <div className="DivEx">09</div>
  </Stack>
)

export const Default = Template.bind({})
Default.args = {
  horizontalAlign: 'start',
  verticalAlign: 'start'
}

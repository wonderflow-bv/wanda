import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Elevator } from './elevator'

export default {
  title: 'Components/Widgets/Elevator',
  component: Elevator
} as ComponentMeta<typeof Elevator>

const Template: ComponentStory<typeof Elevator> = (args) => (
  <Elevator {...args}>
    <div style={{ padding: 32, background: 'var(--dimmed-0)' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.</div>
  </Elevator>
)

export const Default = Template.bind({})
Default.args = {
  resting: 1
}
export const WithHover = Template.bind({})
WithHover.args = {
  resting: 1,
  hover: 3
}

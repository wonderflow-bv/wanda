import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon } from './icon'

export default {
  title: 'Components/Widgets/Icon',
  component: Icon,
  args: {
    dimension: 24
  }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'comment'
}

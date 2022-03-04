import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Chip } from './chip'

const story: ComponentMeta<typeof Chip> = {
  title: 'Components/Widgets/Chip',
  component: Chip,
  argTypes: {
    onDismissClick: {
      action: 'dismissed',
      table: {
        disable: true
      }
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    },
    color: {
      options: ['gray', 'cyan', 'green', 'purple', 'yellow', 'red', 'blue'],
      control: { type: 'select' }
    }
  },
  args: {
    dimension: 'regular',
    interactive: false,
    color: 'gray'
  }
}

export default story

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args}>Chip text</Chip>

export const Default = Template.bind({})
Default.args = {
}

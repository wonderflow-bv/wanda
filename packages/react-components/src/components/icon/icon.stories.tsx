import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon } from './icon'

export default {
  title: 'Components/Widgets/Icon',
  component: Icon,
  args: {
    style: 'outline',
    dimension: 24,
    fill: 'currentColor'
  },
  argTypes: {
    style: {
      control: {
        options: ['outline', 'duotone'],
        type: 'inline-radio'
      }
    }
  }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

const CustomReactIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M128 16a96.2 96.2 0 0 0-96 96c0 24 12.6 55.1 33.6 83s44.5 45 62.4 45 41.2-16.8 62.4-45 33.6-59 33.6-83a96.2 96.2 0 0 0-96-96ZM64 116v-4a12 12 0 0 1 12-12 36 36 0 0 1 36 36v4a12 12 0 0 1-12 12 36 36 0 0 1-36-36Zm80 84h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16Zm48-84a36 36 0 0 1-36 36 12 12 0 0 1-12-12v-4a36 36 0 0 1 36-36 12 12 0 0 1 12 12Z" />
  </svg>
)

export const Default = Template.bind({})
Default.args = {
  source: 'comment'
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
  source: <CustomReactIcon />
}

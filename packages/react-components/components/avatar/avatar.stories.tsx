import React from 'react'
import { Avatar } from './avatar'

export default {
  title: 'Components/Widgets/Avatar',
  component: Avatar,
  args: {
    dimension: 'regular',
    src: 'https://api.lorem.space/image/face?w=150&h=150'
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <Avatar {...args} />

export const Default = Template.bind({})

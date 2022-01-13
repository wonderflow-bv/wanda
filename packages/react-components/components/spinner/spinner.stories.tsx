import React from 'react'
import { Spinner } from './spinner'

export default {
  title: 'Components/Loading/Spinner',
  component: Spinner,
  args: {
    dimension: 'big'
  },
  argTypes: {
    onClick: { action: 'clicked' },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <Spinner {...args} />

export const Default = Template.bind({})

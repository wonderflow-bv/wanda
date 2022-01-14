import React from 'react'
import { Icon } from './icon'

export default {
  title: 'Components/Widgets/Icon',
  component: Icon,
  args: {
    dimension: 16
  }
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  dimension: 16,
  name: 'comment'
}

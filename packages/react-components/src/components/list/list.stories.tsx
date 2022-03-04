import { ComponentStory, ComponentMeta } from '@storybook/react'
import { List } from './list'

const story: ComponentMeta<typeof List> = {
  title: 'Components/Typography/List',
  component: List,
  args: {
    hideMarker: false
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' }
    }
  }
}

export default story

const Template: ComponentStory<typeof List> = (args) => (
  <List {...args}>
    <li>List item text</li>
    <li>List item text List item textList item textList item textList item text</li>
    <li>List item text</li>
  </List>
)

export const Default = Template.bind({})
export const CustomMarker = Template.bind({})
CustomMarker.args = {
  marker: 'circle-check'
}

export const MarkerColor = Template.bind({})
MarkerColor.args = {
  marker: 'circle-check',
  markerColor: 'var(--highlight-green-foreground)'
}

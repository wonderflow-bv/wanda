import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AspectRatio } from './aspect-ratio'

const story: ComponentMeta<typeof AspectRatio> = {
  title: 'Components/Widgets/Aspect ratio',
  component: AspectRatio
}

export default story

const Template: ComponentStory<typeof AspectRatio> = (args) => (
  <AspectRatio {...args}>
    <div style={{ padding: 32, background: 'var(--dimmed-4)' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.</div>
  </AspectRatio>
)

export const Default = Template.bind({})
Default.args = {
  ratio: '1'
}

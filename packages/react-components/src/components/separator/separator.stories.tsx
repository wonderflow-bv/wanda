import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Separator } from './separator'

const story: ComponentMeta<typeof Separator> = {
  title: 'Layouts/Separator',
  component: Separator
}

export default story

export const Default: ComponentStory<typeof Separator> = () => <Separator />

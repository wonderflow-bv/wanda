import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Separator } from './separator'

export default {
  title: 'Layouts/Separator',
  component: Separator
} as ComponentMeta<typeof Separator>

export const Default: ComponentStory<typeof Separator> = () => <Separator />

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Text } from '../text'

export default {
  title: 'Components/Dialogs/Tooltip',
  component: Tooltip,
  args: {
    trigger: <Text as="span">HTML</Text>,
    interactive: true
  }
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <>
    <Tooltip {...args}>
      <button type="button">test</button>
      HTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup Language
      <button type="button">test</button>
    </Tooltip>
    <Tooltip {...args}>
      <button type="button">test</button>
      HTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup LanguageHTML stands for HyperText Markup Language
      <button type="button">test</button>
    </Tooltip>
  </>
)

export const Default = Template.bind({})
Default.args = {
  interactive: true
}

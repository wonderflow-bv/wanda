import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Autocomplete } from './autocomplete'
import { Chip, List } from '../..'

const story: ComponentMeta<typeof Autocomplete> = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    invalid: false
  }
}

export default story

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <>
    <Autocomplete
      onChange={(value) => console.log(value)}
      style={{ maxWidth: '300px' }}
      icon="magnifying-glass"
      {...args}
    >
      {[...Array(10)].map((_, i) => (
        <Autocomplete.Option
          icon="compass"
          value={`${i}`}
          key={`key-${Date.now() + i}`}
          decoration={(i === 4) && <Chip dimension="small">Decoration</Chip>}
        >
          Option
          {' '}
          {`${i}`}
        </Autocomplete.Option>
      ))}
    </Autocomplete>
    <List>
      <List.Li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus non laboriosam facere? </List.Li>
      <List.Li>Eum, assumenda ad sunt dolorum aspernatur quia sit! Mollitia eligendi accusantium alias non enim quaerat quidem fugiat architecto.</List.Li>
    </List>
  </>
)

export const Default = Template.bind({})

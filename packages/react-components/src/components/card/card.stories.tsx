import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Card } from './card'
import { Text, Title, Icon, Stack } from '../..'

const story: ComponentMeta<typeof Card> = {
  title: 'Layouts/Card',
  component: Card,
  args: {
    bordered: false,
    vibrant: false,
    highlightOnHover: true,
    dimmed: 1
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
}

export default story

const Template: ComponentStory<typeof Card> = (args) => <Card dimmed={1} {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Title level="3">Card title</Title>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </>
  )
}
export const Vibrant = Template.bind({})
Vibrant.args = {
  vibrant: true,
  children: (
    <>
      <Title level="3">Card title</Title>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </>
  )
}

export const WithLeft = Template.bind({})
WithLeft.args = {
  left: <Icon source="bell" dimension={32} />,
  children: (
    <Stack>
      <Title level="5">Title</Title>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  )
}

export const WithRight = Template.bind({})
WithRight.args = {
  right: <Icon source="bell" dimension={32} />,
  children: (
    <Stack>
      <Title level="5">Title</Title>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  )
}

export const WithLeftAndRight = Template.bind({})
WithLeftAndRight.args = {
  left: <Icon source="bell" dimension={32} />,
  children: (
    <Stack>
      <Title level="5">Title</Title>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Stack>
  ),
  right: <Icon source="calendar" dimension={32} />
}

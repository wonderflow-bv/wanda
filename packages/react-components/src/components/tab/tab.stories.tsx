import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Tab } from './tab'
import { Button, Stack } from '../..'

const story: ComponentMeta<typeof Tab> = {
  title: 'Components/Navigation/Tab',
  component: Tab,
  argTypes: {
    onChange: {
      action: 'changed',
      table: {
        disable: true
      }
    }
  }
}

export default story

const Template: ComponentStory<typeof Tab> = (args) => {
  return (
    <>
      <Tab {...args}>
        <Tab.Panel label="Tab 1">Panel 1</Tab.Panel>
        <Tab.Panel label="Tab 2">Panel 2</Tab.Panel>
        <Tab.Panel label="Tab 3">Panel 3</Tab.Panel>
        <Tab.Panel label="Tab 4">Panel 4</Tab.Panel>
        <Tab.Panel label="Tab 5">Panel 5</Tab.Panel>
        <Tab.Panel label="Tab 6">Panel 6</Tab.Panel>
      </Tab>
    </>
  )
}

export const Default = Template.bind({})

export const InitialTab = () => {
  const state = useState(2)

  return (
    <Tab state={state}>
      <Tab.Panel label="Tab 1">Panel 1</Tab.Panel>
      <Tab.Panel label="Tab 2">Panel 2</Tab.Panel>
      <Tab.Panel label="Tab 3">Panel 3</Tab.Panel>
      <Tab.Panel label="Tab 4">Panel 4</Tab.Panel>
      <Tab.Panel label="Tab 5">Panel 5</Tab.Panel>
      <Tab.Panel label="Tab 6">Panel 6</Tab.Panel>
      <Tab.Panel label="Tab 7">Panel 7</Tab.Panel>
    </Tab>
  )
}

export const ProgrammaticTab = () => {
  const state = useState(0)
  const [, setState] = state

  return (
    <Tab state={state}>
      <Tab.Panel label="Tab 1"><button type="button" onClick={() => setState(4)}>Go to 5</button></Tab.Panel>
      <Tab.Panel label="Tab 2">Panel 2</Tab.Panel>
      <Tab.Panel label="Tab 3">Panel 3</Tab.Panel>
      <Tab.Panel label="Tab 4">Panel 4</Tab.Panel>
      <Tab.Panel label="Tab 5">Panel 5</Tab.Panel>
      <Tab.Panel label="Tab 6">Panel 6</Tab.Panel>
      <Tab.Panel label="Tab 7">Panel 7</Tab.Panel>
    </Tab>
  )
}

export const ChangeEvent = Template.bind({})

ChangeEvent.args = {
  onChange: (current) => alert(`current is ${current}`)
}

export const IconsTab = () => {
  const state = useState(0)

  return (
    <Tab state={state}>
      <Tab.Panel icon="circle-info" label="Tab 1">Panel 1</Tab.Panel>
      <Tab.Panel icon="check" label="Tab 2">Panel 2</Tab.Panel>
      <Tab.Panel icon="smile" label="Tab 3">Panel 3</Tab.Panel>
      <Tab.Panel icon="star" label="Tab 4">Panel 4</Tab.Panel>
    </Tab>
  )
}

export const ConditionalTab = () => {
  const state = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Tab state={state}>
      <Tab.Panel label="Always visible">
        <Stack direction="column" vPadding={16} rowGap={8} inline>
          Always visible
          <Button icon="eye" onClick={() => setIsVisible(!isVisible)}>Toggle new tab</Button>
        </Stack>
      </Tab.Panel>
      {isVisible && <Tab.Panel label="Visible conditionally">Panel 2</Tab.Panel>}
    </Tab>
  )
}

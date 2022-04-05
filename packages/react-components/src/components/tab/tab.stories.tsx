import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../..'
import { Tab } from './tab'

const story: ComponentMeta<typeof Tab> = {
  title: 'Components/Navigation/Tab',
  component: Tab,
  args: {
    defaultValue: '1'
  }
}
export default story

const Template: ComponentStory<typeof Tab> = args => (
  <Tab {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
)

export const Default = Template.bind({})

export const InitialTab = Template.bind({})
InitialTab.args = {
  defaultValue: '3'
}

// export const ProgrammaticTab = () => {
//   const state = useState(0);
//   const [, setState] = state;

//   return (
//     <Tab state={state}>
//       <Tab.Panel label="Tab 1"><button type="button" onClick={() => setState(4)}>Go to 5</button></Tab.Panel>
//       <Tab.Panel label="Tab 2">Panel 2</Tab.Panel>
//       <Tab.Panel label="Tab 3">Panel 3</Tab.Panel>
//       <Tab.Panel label="Tab 4">Panel 4</Tab.Panel>
//       <Tab.Panel label="Tab 5">Panel 5</Tab.Panel>
//       <Tab.Panel label="Tab 6">Panel 6</Tab.Panel>
//       <Tab.Panel label="Tab 7">Panel 7</Tab.Panel>
//     </Tab>
//   );
// };

// export const ChangeEvent = Template.bind({});

// ChangeEvent.args = {
//   onChange: current => alert(`current is ${current}`),
// };

// export const IconsTab = () => {
//   const state = useState(0);

//   return (
//     <Tab state={state}>
//       <Tab.Panel icon="sun" label="Tab 1">Panel 1</Tab.Panel>
//       <Tab.Panel icon="star" label="Tab 2">Panel 2</Tab.Panel>
//       <Tab.Panel icon="moon-stars" label="Tab 3">Panel 3</Tab.Panel>
//       <Tab.Panel icon="view" label="Tab 4">Panel 4</Tab.Panel>
//     </Tab>
//   );
// };

export const ConditionalTab = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Tab defaultValue="1">
      <Tab.Panel value="1" label="Tab 1">
        Tab panel 1
      </Tab.Panel>
      <Tab.Panel value="2" label="Tab 2">
        <Button icon="sun-bright" onClick={() => setIsVisible(!isVisible)}>Toggle new tab</Button>
      </Tab.Panel>
      {isVisible && <Tab.Panel value="3" label="Tab 3">Tab panel 3</Tab.Panel>}
    </Tab>
  )
}

export const DisabledTab: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
)

export const WithIcons: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel icon="star" value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel icon="eye" value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel icon="sun-bright" value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel icon="moon" disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel icon="magnifying-glass" value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel icon="check" value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
)

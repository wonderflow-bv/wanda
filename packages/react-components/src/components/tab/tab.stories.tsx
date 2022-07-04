/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../..';
import { Tab } from './tab';

const story: ComponentMeta<typeof Tab> = {
  title: 'Components/Navigation/Tab',
  component: Tab,
  args: {
    defaultValue: '1',
    dimension: 'regular',
  },
};
export default story;

const Template: ComponentStory<typeof Tab> = args => (
  <Tab {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

export const Default = Template.bind({});

export const InitialTab = Template.bind({});
InitialTab.args = {
  defaultValue: '3',
};

// export const ProgrammaticTab = () => {
//   const [state, setState] = useState('1');

//   return (
//     <Tab value={state} onValueChange={val => setState(val)}>
//       <Tab.Panel value="1" label="Tab 1">
//         Tab panel 1
//         <Button icon="sun-bright" onClick={() => setState('3')}>Go to tab 3</Button>
//       </Tab.Panel>
//       <Tab.Panel value="2" label="Tab 2">
//         Tab panel 2
//       </Tab.Panel>
//       <Tab.Panel value="3" label="Tab 3">
//         Tab panel 3
//       </Tab.Panel>
//     </Tab>
//   );
// };

export const ChangeEvent = Template.bind({});

ChangeEvent.args = {
  onValueChange: current => alert(`current is ${current}`),
};

export const ConditionalTab = () => {
  const [isVisible, setIsVisible] = useState(false);

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
  );
};

export const DisabledTab: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

export const WithIcons: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel symbol="star" value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel symbol="eye" value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel symbol="sun-bright" value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel symbol="moon" disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel symbol="magnifying-glass" value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel symbol="check" value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

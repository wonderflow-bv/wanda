import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import {
  Button, Menu, Stack, Textfield,
} from '../..';
import { Popover } from './popover';

const story: ComponentMeta<typeof Popover> = {
  title: 'Dialogs/Popover',
  component: Popover,
  args: {
    placement: 'auto-start',
    offset: 8,
    closeOnOutsideClick: true,
    matchTriggerWidth: false,
    trigger: <Button>Open Popover</Button>,
  },
  argTypes: {
    placement: {
      options: ['auto', 'auto-start', 'auto-end', 'top', 'bottom', 'right', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'right-start', 'right-end', 'left-start', 'left-end'],
      control: { type: 'select' },
    },
  },
};

export default story;

const DefaultTemplate: ComponentStory<typeof Popover> = (args) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Popover {...args}>
      <Menu>
        <Menu.Item
          autoFocus
          icon="arrow-right"
          value="1"
          description={<>this is my description</>}
        >
          Sample long menu item
        </Menu.Item>
        <Menu.ItemCheckbox
          onClick={() => setIsChecked(val => !val)}
          checked={isChecked}
          icon={isChecked ? 'check' : undefined}
          value="2"
        >
          Checkbox item
        </Menu.ItemCheckbox>
        <Menu.Item value="3" icon="right-from-bracket">
          Item option 3
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="4" icon="arrow-down-to-bracket">Even shorter</Menu.Item>
        <Menu.Item value="5" disabled>Really?</Menu.Item>
      </Menu>
    </Popover>
  );
};

export const Default = DefaultTemplate.bind({});

const CustomTemplate: ComponentStory<typeof Popover> = args => (
  <Stack direction="row" columnGap={8}>
    <Popover {...args}>
      <div style={{
        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,
      }}
      >
        Lorem.
      </div>
    </Popover>
    <Popover {...args}>
      <div style={{
        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,
      }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Popover>
  </Stack>
);

export const CustomElement = CustomTemplate.bind({});
CustomElement.args = {
  matchTriggerWidth: true,
  placement: 'bottom-start',
};

const WithFieldTemplate: ComponentStory<typeof Popover> = args => (
  <>
    <Popover
      {...args}
    >
      <div style={{
        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,
      }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Popover>
  </>
);

export const WithField = WithFieldTemplate.bind({});
WithField.args = {
  trigger: <Textfield type="search" icon="magnifying-glass" />,
  matchTriggerWidth: true,
  placement: 'bottom-start',
};

const ControlledTemplate: ComponentStory<typeof Popover> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover
      {...args}
      trigger={(
        <Button onClick={() => setIsOpen(val => !val)}>
          {`${isOpen ? 'Close' : 'Open'} Popover`}
        </Button>
      )}
      onOpenChange={state => setIsOpen(state)}
      open={isOpen}
    >
      <div style={{
        background: 'var(--global-vibrancy-background)',
        backdropFilter: 'blur(10px)',
        border: '2px solid black',
        padding: 24,
        maxWidth: '300px',
      }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
        <button type="button" onClick={() => setIsOpen(val => !val)}>
          Close popover
        </button>
      </div>
    </Popover>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
};

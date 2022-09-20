import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import {
  Button, Menu, Textfield, Title,
} from '../..';
import { Popover } from './popover';

const story: ComponentMeta<typeof Popover> = {
  title: 'Dialogs/Popover',
  component: Popover,
  args: {
    placement: 'auto-start',
    trigger: <Button>Open Popover</Button>,
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
          description={<>Description for this item</>}
          value="1"
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
        <Menu.Item
          icon="user"
          value="3"
          description={(
            <>
              <Title as="h2" level="5">Sample H2 Title longlonglonglonglonglonglonglonglonglonglong</Title>
              <p>long text content placeholder to test wrapping and sizes</p>
              <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            </>
          )}
        >
          Short menu label
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
  <>
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
  </>
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
        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,
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

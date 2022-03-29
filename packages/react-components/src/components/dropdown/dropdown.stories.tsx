import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Dropdown } from './dropdown'
import { Button, Separator, Textfield, Menu, Title } from '../..'

const story: ComponentMeta<typeof Dropdown> = {
  title: 'Components/Dialogs/Dropdown',
  component: Dropdown,
  args: {
    placement: 'auto-start',
    trigger: <Button>Open Dropdown</Button>
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: {
        disable: true
      }
    }
  }
}

export default story

const DefaultTemplate: ComponentStory<typeof Dropdown> = (args) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Dropdown {...args}>
      <Menu>
        <Menu.Item
          autoFocus
          icon="arrow-right"
          description={<>Description for this item</>}
        >
          Sample long menu item
        </Menu.Item>
        <Menu.ItemCheckbox
          onClick={() => setChecked(val => !val)}
          checked={checked}
          icon={checked ? 'check' : undefined}
        >
          Checkbox item
        </Menu.ItemCheckbox>
        <Menu.Item
          icon="user"
          description={(
            <>
              <Title as="h2" level="5">Sample H2 Title longlonglonglonglonglonglonglonglonglonglong</Title>
              <p>long text content placeholder to test wrapping and sizes</p>
              <img style={{ width: '100%' }} src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            </>
          )}
        >
          Short menu label
        </Menu.Item>
        <Separator />
        <Menu.Item icon="arrow-down-to-bracket">Even shorter</Menu.Item>
        <Menu.Item disabled>Really?</Menu.Item>
      </Menu>
    </Dropdown>
  )
}

export const Default = DefaultTemplate.bind({})

const CustomTemplate: ComponentStory<typeof Dropdown> = (args) => (
  <>
    <Dropdown {...args}>
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem.
      </div>
    </Dropdown>
    <Dropdown {...args}>
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Dropdown>
  </>
)

export const CustomElement = CustomTemplate.bind({})
CustomElement.args = {
  matchTriggerWidth: true,
  placement: 'bottom-start'
}

const WithFieldTemplate: ComponentStory<typeof Dropdown> = (args) => (
  <>
    <Dropdown
      {...args}
    >
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Dropdown>
  </>
)

export const WithField = WithFieldTemplate.bind({})
WithField.args = {
  trigger: <Textfield type="search" icon="magnifying-glass" />,
  matchTriggerWidth: true,
  placement: 'bottom-start'
}

const ControlledTemplate: ComponentStory<typeof Dropdown> = (args) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dropdown
      {...args}
      trigger={(
        <Button onClick={() => setOpen(val => !val)}>
          {`${open ? 'Close' : 'Open'} Dropdown`}
        </Button>
      )}
      onOpenChange={(state) => setOpen(state)}
      open={open}
    >
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
        <button type="button" onClick={() => setOpen(val => !val)}>
          Close dropdown
        </button>
      </div>
    </Dropdown>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
}

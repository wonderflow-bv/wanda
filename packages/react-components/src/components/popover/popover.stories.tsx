import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Popover } from './popover'
import { Button, Separator, Textfield, Menu, Title } from '../..'

const story: ComponentMeta<typeof Popover> = {
  title: 'Components/Dialogs/Popover',
  component: Popover,
  args: {
    placement: 'auto-start',
    trigger: <Button>Open Popover</Button>
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

const DefaultTemplate: ComponentStory<typeof Popover> = (args) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Popover {...args}>
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
    </Popover>
  )
}

export const Default = DefaultTemplate.bind({})

const CustomTemplate: ComponentStory<typeof Popover> = (args) => (
  <>
    <Popover {...args}>
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem.
      </div>
    </Popover>
    <Popover {...args}>
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Popover>
  </>
)

export const CustomElement = CustomTemplate.bind({})
CustomElement.args = {
  matchTriggerWidth: true,
  placement: 'bottom-start'
}

const WithFieldTemplate: ComponentStory<typeof Popover> = (args) => (
  <>
    <Popover
      {...args}
    >
      <div style={{ background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
      </div>
    </Popover>
  </>
)

export const WithField = WithFieldTemplate.bind({})
WithField.args = {
  trigger: <Textfield type="search" icon="magnifying-glass" />,
  matchTriggerWidth: true,
  placement: 'bottom-start'
}

const ControlledTemplate: ComponentStory<typeof Popover> = (args) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover
      {...args}
      trigger={(
        <Button onClick={() => setOpen(val => !val)}>
          {`${open ? 'Close' : 'Open'} Popover`}
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
          Close popover
        </button>
      </div>
    </Popover>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
}

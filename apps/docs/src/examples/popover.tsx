import { Button, Menu, Popover } from '@wonderflow/react-components';
import { useState } from 'react';

export const Example = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Popover
      placement="bottom-start"
      trigger={<Button kind="flat">Open popover</Button>}
    >
      <Menu>
        <Menu.Item value="1" autoFocus icon="user">Item option 1</Menu.Item>
        <Menu.ItemCheckbox
          value="2"
          onClick={() => setIsChecked(val => !val)}
          icon={isChecked ? 'check' : undefined}
          checked={isChecked}
        >
          Checkable option 2
        </Menu.ItemCheckbox>
        <Menu.Separator />
        <Menu.Item value="3" icon="right-from-bracket">
          Item option 3
        </Menu.Item>
        <Menu.Item value="4" disabled icon="right-from-bracket">
          Disabled option 4
        </Menu.Item>
      </Menu>
    </Popover>
  );
};

export const ControlledExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      placement="bottom"
      onOpenChange={state => setIsOpen(state)}
      trigger={(
        <Button onClick={() => setIsOpen(open => !open)}>
          {`${isOpen ? 'Close' : 'Open'} popover`}
        </Button>
      )}
    >
      <div style={{
        background: 'var(--global-vibrancy-background-hard)', backdropFilter: 'blur(10px)', border: '2px solid black', maxInlineSize: '30ch', padding: 24,
      }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Magni error unde sapiente beatae! Nostrum praesentium similique
        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?
        {' '}
        <br />
        <br />
        <Button kind="secondary" dimension="small" onClick={() => setIsOpen(val => !val)}>
          Close popover
        </Button>
      </div>
    </Popover>
  );
};

export const CustomExample = () => (
  <Popover trigger={<Button>Open popover</Button>} placement="bottom">
    <>
      <p>Custom element</p>
      <Button autoFocus dimension="small" kind="flat">
        Another button
      </Button>
    </>
  </Popover>
);

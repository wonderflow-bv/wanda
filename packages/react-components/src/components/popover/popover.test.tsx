import { fireEvent, render } from '@testing-library/react';

import { Button } from '../button';
import { Menu } from '../menu';
import { Popover } from './popover';

describe('<Popover>', () => {
  test(' it should render properly', () => {
    const { container, getByTestId } = render(
      <Popover
        placement="bottom-start"
        trigger={<Button kind="flat">Open popover</Button>}
      >
        <div>Some Content</div>
      </Popover>,
    );
    const btn = getByTestId('Button');
    fireEvent.click(btn);
    fireEvent.blur(btn);
    fireEvent.keyPress(btn, { key: 'esc' });

    expect(container).not.toBeNull();
  });

  test(' it should render properly open', () => {
    const { container, getByTestId } = render(
      <Popover
        placement="bottom-start"
        trigger={<Button kind="flat">Open popover</Button>}
        open
        matchTriggerWidth
      >
        <div>Some Content</div>
      </Popover>,
    );
    const btn = getByTestId('Button');
    fireEvent.click(btn);
    fireEvent.blur(btn);
    fireEvent.keyPress(btn, { key: 'esc' });

    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Popover
        placement="bottom-start"
        trigger={<Button kind="flat">Open popover</Button>}
        disabled
      >
        <div>Some Content</div>
      </Popover>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should open/close properly', () => {
    const handleClickSpy = jest.fn();

    const { getByTestId } = render(
      <Popover
        open
        placement="bottom-start"
        trigger={<Button kind="flat">Open popover</Button>}
        closeOnInsideClick
      >
        <Menu>
          <Menu.Item
            autoFocus
            icon="arrow-right"
            value="1"
            onClick={handleClickSpy}
            data-testid="menu-item"
          >
            menu item
          </Menu.Item>
        </Menu>
      </Popover>,
    );
    const btn = getByTestId('Button');
    const item = getByTestId('menu-item');
    fireEvent.click(btn);

    const tooltip = getByTestId('tooltip');

    expect(item).toBeDefined();
    expect(tooltip).toBeDefined();
    fireEvent.click(item);

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });
});

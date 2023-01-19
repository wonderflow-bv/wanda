import { fireEvent, render } from '@testing-library/react';

import { Menu } from './menu';

describe('<Menu>', () => {
  test(' it should render properly', () => {
    const { container, getByText } = render(
      <Menu>
        <Menu.Item value="Item1">Item 1</Menu.Item>
        <Menu.Item value="Item2" subtext="hint text">Item 2</Menu.Item>
        <Menu.ItemCheckbox value="Check1">Checkable item</Menu.ItemCheckbox>
        <Menu.ItemCheckbox value="Check2" checked>Checked item</Menu.ItemCheckbox>
        <Menu.Separator />
        <Menu.Item value="Item3" icon="bell">Item 3</Menu.Item>
        <Menu.Item value="Item4" icon="bell" iconPosition="right">Item 4</Menu.Item>
        <Menu.Item value="Item5" icon="bell" iconPosition="left" dimension="small">Item 5</Menu.Item>
        <Menu.Item value="Item6" description={<p>some description</p>}>Item 6</Menu.Item>
        <Menu.Item value="Item7" disabled>Item 7</Menu.Item>
        <Menu.Item value="Item8" as="div">Item 8</Menu.Item>
      </Menu>,
    );
    fireEvent.click(getByText(/Item 1/));
    expect(container).not.toBeNull();
  });
});

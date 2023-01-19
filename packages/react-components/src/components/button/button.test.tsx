import { fireEvent, render } from '@testing-library/react';

import { Button, ButtonsGroup } from './button';

describe('<Button>', () => {
  test('it should render properly', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).not.toBeNull();
  });

  test('it should render properly as different type', () => {
    const { container } = render(<Button as="a">Click me</Button>);
    expect(container).not.toBeNull();
  });

  test('it should render properly as busy', () => {
    const { container } = render(<Button busy>Click me</Button>);
    expect(container).not.toBeNull();
  });

  test('it should render properly with icon', () => {
    const { container } = render(<Button icon="bell">Click me</Button>);
    expect(container).not.toBeNull();
  });

  test('it should render properly with dimension', () => {
    const { container } = render(<Button dimension="big">Click me</Button>);
    expect(container).not.toBeNull();
  });

  test('it should click properly', () => {
    const { container, getByTestId } = render(<Button>Click me</Button>);
    fireEvent.click(getByTestId('Button'));
    expect(container).not.toBeNull();
  });

  test('it should not click while disabled', () => {
    const { container, getByTestId } = render(<Button disabled>Click me</Button>);
    fireEvent.click(getByTestId('Button'));
    expect(container).not.toBeNull();
  });
});

describe('<Buttons Group>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <ButtonsGroup>
        <Button pressed>Pressed</Button>
        <Button>Click</Button>
        <Button disabled>Disabled</Button>
      </ButtonsGroup>,
    );
    expect(container).not.toBeNull();
  });
});

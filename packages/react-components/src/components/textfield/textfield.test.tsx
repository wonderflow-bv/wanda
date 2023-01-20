import { fireEvent, render } from '@testing-library/react';

import { Textfield } from './textfield';

describe('<Textfield>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Textfield icon="bell">Lorem ipsum dolor sit amet</Textfield>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly as password', () => {
    const { container, getByTestId } = render(
      <Textfield type="password" label="Password" invalid message="Wrong password" />,
    );
    fireEvent.click(getByTestId('RevealIcon'));
    expect(container).not.toBeNull();
  });

  test(' it should render properly as visible password', () => {
    const { container } = render(
      <Textfield type="text" label="Password" dimension="small" message="Enter password" />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly as textarea', () => {
    const { container } = render(
      <Textfield type="textarea" textarea dimension="small" disabled />,
    );
    expect(container).not.toBeNull();
  });
});

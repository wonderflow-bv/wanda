import { fireEvent, render, waitFor } from '@testing-library/react';

import { Autocomplete } from './autocomplete';

describe('<Autocomplete>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Autocomplete />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should change properly', async () => {
    const { container, getByTestId } = render(
      <Autocomplete>
        <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        <Autocomplete.Option value="2">Option 2</Autocomplete.Option>
        <Autocomplete.Option value="3">Option 3</Autocomplete.Option>
      </Autocomplete>,
    );
    const el = getByTestId('Autocomplete');

    fireEvent.focus(el);
    fireEvent.change(el, { target: { value: 'Option 3' } });
    fireEvent.blur(el);

    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', async () => {
    const { container, getByTestId } = render(
      <Autocomplete>
        <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
      </Autocomplete>,
    );
    const el = getByTestId('Autocomplete');

    fireEvent.focus(el);

    await waitFor(() => expect(getByTestId('AutocompleteOption')).toBeDefined());
    const elOpt = getByTestId('AutocompleteOption');

    fireEvent.click(elOpt);
    fireEvent.keyPress(el, { key: 'esc' });

    expect(container).not.toBeNull();
  });
});

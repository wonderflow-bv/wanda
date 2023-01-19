import { render } from '@testing-library/react';

import { Datetime } from './datetime';

describe('<DateTime>', () => {
  test(' it should render properly', () => {
    const dt = '2021-12-15T16:00:32.507981+00:00';
    const edt = 'December 15, 2021';

    const { container, getByText } = render(
      <Datetime date={dt} />,
    );
    expect(getByText(edt)).toBeDefined();
    expect(container).not.toBeNull();
  });

  test(' it should render properly with local ""it-IT', () => {
    const dt = '2021-12-15T16:00:32.507981+00:00';
    const edt = '15 dicembre 2021';

    const { container, getByText } = render(
      <Datetime date={dt} locale="it-IT" />,
    );
    expect(getByText(edt)).toBeDefined();
    expect(container).not.toBeNull();
  });

  test(' it should render properly with local ""it-IT and options', () => {
    const dt = '2021-12-15T16:00:32.507981+00:00';
    const edt = '15 dicembre 21';

    const { container, getByText } = render(
      <Datetime date={dt} locale="it-IT" options={{ year: '2-digit' }} />,
    );
    expect(getByText(edt)).toBeDefined();
    expect(container).not.toBeNull();
  });
});

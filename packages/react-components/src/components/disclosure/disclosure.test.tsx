import '@testing-library/jest-dom';

import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { Disclosure } from './disclosure';

describe('<Disclosure>', () => {
  it('should render properly open', async () => {
    render(
      <Disclosure open expandable summary="Click to expand">
        Text inside
      </Disclosure>,
    );

    const disclosure = screen.getByText(/click to expand/i);
    const el = screen.getByText(/text inside/i);

    expect(el).toBeDefined();
    fireEvent.click(disclosure);

    await waitFor(() => {
      expect(disclosure.getAttribute('open')).toBeFalsy();
    });
  });

  it('should render properly close', async () => {
    render(
      <Disclosure expandable summary="Click to expand">
        Text inside
      </Disclosure>,
    );

    const disclosure = screen.getByText(/click to expand/i);
    const el = screen.getByText(/text inside/i);

    expect(disclosure).toBeDefined();
    expect(el).toBeDefined();
  });
});

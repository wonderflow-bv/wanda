import { render } from '@testing-library/react';

import { OverlayProvider } from './overlay';
import { ResponsiveProvider } from './responsive';

describe('<Providers>', () => {
  test('OverlayProvider should render properly', () => {
    const { container } = render(
      <OverlayProvider>
        Content
      </OverlayProvider>,
    );
    expect(container).not.toBeNull();
  });

  test('OverlayProvider should render properly with props', () => {
    const fn = jest.fn(() => ({}));
    const { container } = render(
      <OverlayProvider titleId="overlay" onClose={fn}>
        Content
      </OverlayProvider>,
    );
    expect(container).not.toBeNull();
  });

  test('ResponsiveProvider should render properly with props', () => {
    const { container } = render(
      <ResponsiveProvider>
        Content
      </ResponsiveProvider>,
    );
    expect(container).not.toBeNull();
  });
});

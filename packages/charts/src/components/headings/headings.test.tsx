import '@testing-library/jest-dom';

import {
  fireEvent,
  render, screen,
} from '@testing-library/react';

import { Headings } from './headings';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<Headings>', () => {
  it('should render the component', () => {
    render(<Headings title="Title" onMenuOpen={() => ({})} />);
    const element = screen.getByTestId('headings');
    expect(element).toBeDefined();
  });

  it('should NOT render the component w/o title', () => {
    const { container } = render(<Headings onMenuOpen={() => ({})} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render menu button and open menu on click and close at key down', () => {
    const spyOnMenu = jest.fn();
    const { getByTestId, queryByTestId } = render(<Headings onMenuOpen={spyOnMenu} menu="some content here" />);
    expect(getByTestId('menu-button')).toBeDefined();

    fireEvent.click(getByTestId('menu-button'));

    expect(spyOnMenu).toHaveBeenCalledTimes(1);
    expect(getByTestId('menu')).toBeDefined();

    fireEvent.keyDown(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(queryByTestId('menu')).toBeNull();
  });

  it('should open when hit Enter on focus and close on click away', () => {
    const { queryByTestId } = render(<Headings onMenuOpen={() => ({})} menu="some content here" />);

    expect(queryByTestId('menu')).toBeNull();

    fireEvent.keyDown(document, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(queryByTestId('menu')).toBeDefined();

    fireEvent.click(document);

    expect(queryByTestId('menu')).toBeNull();
  });
});

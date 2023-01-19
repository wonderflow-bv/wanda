import { fireEvent, render } from '@testing-library/react';

import { Pagination } from './pagination';

describe('<Pagination>', () => {
  test(' it should render properly', () => {
    const fn = jest.fn();
    const { container, getByTestId } = render(
      <Pagination itemsCount={100} onPageClick={fn} />,
    );
    fireEvent.click(getByTestId('RightChevron'));
    expect(fn).toHaveBeenCalled();
    fireEvent.click(getByTestId('RightChevron'));
    expect(fn).toHaveBeenCalled();
    expect(container).not.toBeNull();
  });
});

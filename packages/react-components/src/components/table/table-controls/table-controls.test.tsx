import { fireEvent, render } from '@testing-library/react';

import { CustomColumnInstanceType } from '../types';
import { ToggleColumnsControl } from './toggle-columns';

const COLUMNS = [
  {
    isToggable: true,
    isVisible: true,
  },
  {
    isToggable: true,
    isVisible: true,
  },
] as Array<CustomColumnInstanceType<Record<string, unknown>>>;

describe('<ToggleColumnsControl>', () => {
  test('it should render properly', () => {
    const { container, getByTestId } = render(
      <ToggleColumnsControl columns={COLUMNS} visibleColumns={COLUMNS} />,
    );

    fireEvent.click(getByTestId('Button'));
    expect(container).not.toBeNull();
  });
});

import { fireEvent, render } from '@testing-library/react';

import { CustomColumnInstanceType } from '../types';
import { ToggleColumnsControl } from './toggle-columns';

const makeColumn = (id: string): CustomColumnInstanceType<Record<string, unknown>> => ({
  id,
  columnDef: {
    id,
    header: id,
    meta: { isToggable: false },
  },
  getIsVisible: () => true,
  toggleVisibility: jest.fn(),
} as unknown as CustomColumnInstanceType<Record<string, unknown>>);

const COLUMNS = [makeColumn('firstName'), makeColumn('lastName')];

describe('<ToggleColumnsControl>', () => {
  test('it should render properly', () => {
    const { container, getByTestId } = render(
      <ToggleColumnsControl columns={COLUMNS} visibleColumns={COLUMNS} />,
    );

    fireEvent.click(getByTestId('Button'));
    expect(container).not.toBeNull();
  });
});

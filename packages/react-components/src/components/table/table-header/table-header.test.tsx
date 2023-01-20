import { render } from '@testing-library/react';

import { TableHeader } from './table-header';

describe('<TableHeader>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <TableHeader />,
    );
    expect(container).not.toBeNull();
  });
});

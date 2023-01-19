/* eslint-disable max-len */
import { render } from '@testing-library/react';

import { Elevator } from './elevator';

describe('<Elevator>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Elevator resting={1} hover={1}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolore hic nisi voluptates quam error! At quod alias architecto? Qui tenetur odio molestias cupiditate quisquam!
        </div>
      </Elevator>,
    );
    expect(container).not.toBeNull();
  });
});

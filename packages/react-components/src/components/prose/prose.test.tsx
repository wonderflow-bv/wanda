/* eslint-disable max-len */
import { render } from '@testing-library/react';

import { Prose } from './prose';

const innerText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam hic illo quam ipsa. Aspernatur, eveniet? Optio dolore minima magni culpa necessitatibus facilis quam libero nam.';

describe('<Prose>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Prose>{innerText}</Prose>,
    );
    expect(container).not.toBeNull();
  });
});

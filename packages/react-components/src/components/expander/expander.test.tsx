/* eslint-disable max-len */
import { fireEvent, render } from '@testing-library/react';

import { Expander } from './expander';

const innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed fugiat numquam ea, blanditiis consequatur rem, rerum corrupti soluta asperiores cupiditate a eaque voluptates? Natus ullam vero incidunt in, adipisci nobis iusto eveniet error neque. Sed in dolor temporibus magni inventore laboriosam esse quas ab. Nulla ipsa dolores error dolore corrupti libero optio beatae ex veritatis assumenda, officia voluptatibus aperiam rerum at officiis nostrum ipsam facere, dignissimos doloremque ad laboriosam voluptatem. Eum officiis dolorum nemo. Voluptatibus iure suscipit sequi libero, quasi doloribus consequatur. Architecto facilis libero qui, numquam saepe labore fugiat. Magni laborum voluptas sapiente harum labore mollitia, cupiditate exercitationem tempore?';

describe('<Expander>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Expander>{innerText}</Expander>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should expand properly', () => {
    const { container, getByTestId } = render(
      <Expander>{innerText}</Expander>,
    );
    const btn = getByTestId('ExpanderButton');
    fireEvent.click(btn);
    expect(container).not.toBeNull();
  });
});

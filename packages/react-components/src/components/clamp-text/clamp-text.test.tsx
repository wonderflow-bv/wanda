/* eslint-disable max-len */
import { fireEvent, render } from '@testing-library/react';

import { ClampText } from './clamp-text';

const innerText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit odit neque mollitia voluptate? Natus quibusdam dicta minus! Officiis velit ex facere, repudiandae cum maiores excepturi porro recusandae necessitatibus voluptatum veniam, unde voluptates fugiat labore voluptas eius tempore, facilis animi ut ipsum quo? Placeat, atque fuga pariatur hic obcaecati, nam accusamus dolor natus nostrum odit rerum iusto suscipit ducimus nobis eos? Voluptas accusamus repellat sit deleniti adipisci eum dolorem repudiandae mollitia, obcaecati rem eius vitae sint expedita cum rerum quos voluptatibus fugit ipsa impedit aliquid voluptates officia. Veniam, beatae laboriosam at quia error harum, adipisci commodi exercitationem cumque repellat doloribus cum aut tenetur animi recusandae. Neque reiciendis dolores, fugiat unde delectus incidunt dolorum temporibus rerum repellendus nemo iusto expedita placeat!';

describe('<ClampText>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <ClampText rows={3}>{innerText}</ClampText>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly w/o # of rows', () => {
    const { container } = render(
      <ClampText>{innerText}</ClampText>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should expand properly', () => {
    const { container, getByTestId } = render(
      <ClampText expandable rows={1}>{innerText}</ClampText>,
    );

    const btn = getByTestId('ExpandableButton');
    expect(btn).toBeDefined();

    fireEvent.click(btn);
    expect(container).not.toBeNull();
  });
});

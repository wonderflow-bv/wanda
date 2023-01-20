/* eslint-disable @typescript-eslint/comma-dangle */
import { fireEvent, render } from '@testing-library/react';

import { Slider } from './slider';

describe('<Slider>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <>
        <Slider label="Qty" iconMin="minus" iconMax="plus" />
        <Slider label="Qty" iconMin="minus" iconMax="plus" dimension="small" />
        <Slider label="Qty" showValues dimension="small" />
        <Slider showValues dimension="regular" />
      </>
    );
    expect(container).not.toBeNull();
  });

  test(' it should slide properly', () => {
    const { container, getByTestId } = render(
      <>
        <Slider defaultValue={0} label="Qty" iconMin="minus" iconMax="plus" />
      </>
    );
    fireEvent.change(getByTestId('SliderInput'), { target: { value: 25 } });
    expect(container).not.toBeNull();
  });
});

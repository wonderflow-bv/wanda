/* eslint-disable no-console */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { AxisOrientation, AxisProps } from '../../types';
import { CartesianBase } from './cartesian-base';
// import { CartesianBaseLegend } from './cartesian-base-legend';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockedAxis: Record<AxisOrientation, AxisProps | undefined> = {
  top: {
    domain: [0, 1],
    scaleType: 'linear',
    orientation: 'top',
  },
  right: {
    domain: ['a', 'b'],
    scaleType: 'label',
    orientation: 'right',
  },
  bottom: {
    domain: ['01-01-2020', '01-01-2024'],
    scaleType: 'time',
    orientation: 'bottom',
  },
  left: {
    domain: [0, 1],
    scaleType: 'linear',
    orientation: 'left',
  },
};

describe('<CartesianBase>', () => {
  it('should render the component', () => {
    render(<CartesianBase
      axis={mockedAxis}
      axisFiltered={mockedAxis}
      onBrushChange={() => ({})}
    />);

    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });

  it('should render the component w/o R/B axis', () => {
    render(<CartesianBase
      axis={{ ...mockedAxis, right: undefined, bottom: undefined }}
      axisFiltered={{ ...mockedAxis, right: undefined, bottom: undefined }}
      title="Title"
      preventResponsive
      margin={{
        top: 0, right: 0, bottom: 0, left: 0,
      }}
      onBrushChange={() => ({})}
    />);

    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });

  it('should render the component w props', () => {
    render(<CartesianBase
      axis={{ ...mockedAxis, left: undefined }}
      axisFiltered={{ ...mockedAxis, left: undefined }}
      title="Title"
      preventResponsive
      margin={{
        top: 12, right: 12, bottom: 12, left: 12,
      }}
      onBrushChange={() => ({})}
    />);
    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });

  it('should render the component w/o legend', () => {
    render(<CartesianBase
      axis={{ ...mockedAxis }}
      axisFiltered={{ ...mockedAxis }}
      title="Title"
      hideLegend
      onBrushChange={() => ({})}
    />);
    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });
});

// describe('<CartesianBaseLegend>', () => {
//   it.todo('should render', () => {
//     render(<CartesianBaseLegend onMouseOver={console.log} />);
//     const element = screen.getByTestId('cartesian');
//     expect(element).toBeDefined();
//   });
// });

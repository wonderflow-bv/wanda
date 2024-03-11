import { viewportStyleConfig } from '../style-config';
import { AxisProps, CartesianAxis } from '../types';
import { computeAxisProperties } from './axis';
import { manageViewport } from './viewport';

describe('manageViewport()', () => {
  const config = {
    hasReversedIndex: false,
    hasMirroredDomainsHorizontal: false,
    hasMirroredDomainsVertical: false,
  };

  it('should return correct number of ticks - horizontal/linear', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
    };
    const cartesian: CartesianAxis = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
      config,
    })!;
    const res = manageViewport(800, 600, cartesian, viewportStyleConfig);
    const exp = { numTicks: 10 };
    expect(res).toStrictEqual(exp);
  });

  it('should return correct number of ticks - vertical/label', () => {
    const axis: AxisProps = {
      domain: ['a', 'b'],
      scaleType: 'label',
      orientation: 'left',
    };
    const cartesian: CartesianAxis = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
      config,
    })!;
    const res = manageViewport(800, 600, cartesian, viewportStyleConfig);
    const exp = { numTicks: 2 };
    expect(res).toStrictEqual(exp);
  });

  it('should return custom number of ticks', () => {
    const axis: AxisProps = {
      domain: ['a', 'b'],
      scaleType: 'label',
      orientation: 'left',
      numTicks: 10,
    };
    const cartesian: CartesianAxis = computeAxisProperties({
      axis,
      maxRangeX: 200,
      maxRangeY: 200,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
      config,
    })!;
    const res = manageViewport(800, 600, cartesian, viewportStyleConfig);
    const exp = { numTicks: 10 };
    expect(res).toStrictEqual(exp);
  });
});

import {
  curveLinear, curveMonotoneX, curveMonotoneY, curveStepAfter, curveStepBefore,
} from '@visx/curve';

import { themes } from '../style-config';
import { AxisProps } from '../types';
import { computeAxisProperties } from './axis';
import {
  accessor,
  accessorInvert,
  bisectIndex,
  createSubArrays,
  getCoordinates,
  getLinesRenderer,
  getMarkerLabelProps,
  isMarkerLabelVisible,
} from './lines';

describe('accessor()', () => {
  it('should return an integer for linear scale', () => {
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessor(cartesian, 'value', { value: 50 });
    const exp = 400;
    expect(res).toStrictEqual(exp);
  });

  it('should return an integer for time scale', () => {
    const axis: AxisProps = {
      domain: ['01-01-2020', '01-01-2022'],
      scaleType: 'time',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessor(cartesian, 'date', { date: '01-01-2021' });
    const exp = 401;
    expect(res).toStrictEqual(exp);
  });

  it('should return an integer for label scale', () => {
    const axis: AxisProps = {
      domain: ['01-01-2020', '01-01-2021', '01-01-2022'],
      scaleType: 'label',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessor(cartesian, 'date', { date: '01-01-2021' });
    const exp = 400;
    expect(res).toStrictEqual(exp);
  });

  it('should return undefined w/o datum', () => {
    const axis: AxisProps = {
      domain: ['01-01-2020', '01-01-2021', '01-01-2022'],
      scaleType: 'label',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessor(cartesian, 'date', { date: undefined });
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });
});

describe('accessorInvert()', () => {
  it('should return the correct value from domain - top axis', () => {
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessorInvert(cartesian, 400);
    const exp = 49.5;
    expect(res).toStrictEqual(exp);
  });

  it('should return the correct value from domain - left axis', () => {
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'left',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessorInvert(cartesian, 300) as number;
    const exp = 50;
    expect(Math.round(res)).toStrictEqual(exp);
  });

  it('should return the correct value from domain - label/left', () => {
    const axis: AxisProps = {
      domain: ['a', 'b', 'c'],
      scaleType: 'label',
      orientation: 'left',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessorInvert(cartesian, 400);
    const exp = 'c';
    expect(res).toStrictEqual(exp);
  });

  it('should return the correct value from domain - label/top', () => {
    const axis: AxisProps = {
      domain: ['a', 'b', 'c'],
      scaleType: 'label',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const cartesian = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    })!;
    const res = accessorInvert(cartesian, 350);
    const exp = 'b';
    expect(res).toStrictEqual(exp);
  });
});

describe('bisectIndex()', () => {
  it('should return correct data array index', () => {
    const res = bisectIndex(
      ['01-01-2020', '01-01-2021', '01-01-2022'],
      new Date('01-03-2021'),
      0, 100,
    );
    const exp = 2;
    expect(res).toStrictEqual(exp);
  });

  it('should return correct data array index', () => {
    const res = bisectIndex(
      ['01-01-2020', '01-01-2021', '01-01-2022'],
      new Date('01-01-2020'),
    );
    const exp = 1;
    expect(res).toStrictEqual(exp);
  });
});

describe('getCoordinates()', () => {
  const indexAxis: AxisProps = {
    domain: ['01-01-2020', '01-01-2023'],
    scaleType: 'time',
    orientation: 'bottom',
  };
  const seriesAxis: AxisProps = {
    domain: [0, 100],
    scaleType: 'linear',
    orientation: 'left',
  };
  const i = computeAxisProperties({
    axis: indexAxis,
    maxRangeX: 800,
    maxRangeY: 600,
    positionTop: 1,
    positionRight: 2,
    positionBottom: 3,
    positionLeft: 4,
  })!;
  const s = computeAxisProperties({
    axis: seriesAxis,
    maxRangeX: 800,
    maxRangeY: 600,
    positionTop: 1,
    positionRight: 2,
    positionBottom: 3,
    positionLeft: 4,
  })!;

  it('should return data - horizontal', () => {
    const res = getCoordinates({
      datum: { date: '01-01-2021', value: 50 },
      indexAxis: i,
      indexDataKey: 'date',
      otherAxis: s,
      otherDataKey: 'value',
      isHorizontal: true,
    });
    const exp = { x: 267, y: 300 };
    expect(res).toStrictEqual(exp);
  });

  it('should return data - vertical', () => {
    const res = getCoordinates({
      datum: { date: '01-01-2021', value: 50 },
      indexAxis: i,
      indexDataKey: 'date',
      otherAxis: s,
      otherDataKey: 'value',
      isHorizontal: false,
    });
    const exp = { x: 300, y: 267 };
    expect(res).toStrictEqual(exp);
  });
});

describe('getLinesRenderer()', () => {
  it('should return curveLinear', () => {
    const res = getLinesRenderer('lines', true);
    const exp = curveLinear;
    expect(res).toStrictEqual(exp);
  });

  it('should return curveMonotoneX', () => {
    const res = getLinesRenderer('curves', true);
    const exp = curveMonotoneX;
    expect(res).toStrictEqual(exp);
  });

  it('should return curveMonotoneY', () => {
    const res = getLinesRenderer('curves', false);
    const exp = curveMonotoneY;
    expect(res).toStrictEqual(exp);
  });

  it('should return curveStepAfter', () => {
    const res = getLinesRenderer('steps', true);
    const exp = curveStepAfter;
    expect(res).toStrictEqual(exp);
  });

  it('should return curveStepBefore', () => {
    const res = getLinesRenderer(undefined, false);
    const exp = curveStepBefore;
    expect(res).toStrictEqual(exp);
  });
});

describe('isMarkerLabelVisible()', () => {
  it('should return true for index 0 of 10 labels', () => {
    const isVisible = isMarkerLabelVisible(0, 10, 12);
    expect(isVisible).toBeTruthy();
  });

  it('should return true for index 19 of 20 labels', () => {
    const isVisible = isMarkerLabelVisible(19, 20, 12);
    expect(isVisible).not.toBeTruthy();
  });

  it('should return true if maxLabel is set to 0', () => {
    const isVisible = isMarkerLabelVisible(19, 20, 0);
    expect(isVisible).not.toBeTruthy();
  });

  it('should return true w/o maxLabel', () => {
    const isVisible = isMarkerLabelVisible(19, 20);
    expect(isVisible).not.toBeTruthy();
  });
});

describe('getMarkerLabelProps()', () => {
  it('shoult return a style configuration - horizontal', () => {
    const res = getMarkerLabelProps(
      { x: 0, y: 0 },
      { maxWidth: 800, maxHeight: 600 },
      true,
      themes.light,
    );
    const exp = {
      anchor: 'start',
      background: 'hsl(220 16% 85%)',
      backgroundProps: {
        filter: 'opacity(0.7)', rx: 4, ry: 4, x: 4, y: 4,
      },
      fontColor: 'hsl(217 11% 14%)',
      fontSize: 12,
      fontWeight: 400,
      padding: {
        bottom: 2, left: 6, right: 6, top: 2,
      },
      titleProps: { textAnchor: 'start', x: 8, y: 6 },
      verticalAnchor: 'start',
    };
    expect(res).toStrictEqual(exp);
  });

  it('shoult return a style configuration - vertical', () => {
    const res = getMarkerLabelProps(
      { x: 0, y: 0 },
      { maxWidth: 800, maxHeight: 600 },
      false,
      themes.light,
    );
    const exp = {
      anchor: 'start',
      background: 'hsl(220 16% 85%)',
      backgroundProps: {
        filter: 'opacity(0.7)', rx: 4, ry: 4, x: 6, y: 4,
      },
      fontColor: 'hsl(217 11% 14%)',
      fontSize: 12,
      fontWeight: 400,
      padding: {
        bottom: 2, left: 6, right: 6, top: 2,
      },
      titleProps: { textAnchor: 'start', x: 10, y: 6 },
      verticalAnchor: 'start',
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('createSubArrays()', () => {
  it('should return an array of arrays - index 0', () => {
    const input = [
      { value: 0 },
      { value: 1 },
      { value: 1 },
      { value: 1 }];
    const condition = (d: Record<string, any>) => d.value === 0;
    const res = createSubArrays(input, condition);
    const exp = [[{ value: 1 }, { value: 1 }, { value: 1 }]];
    expect(res).toStrictEqual(exp);
  });

  it('should return an array of arrays - index 1', () => {
    const input = [
      { value: 1 },
      { value: 0 },
      { value: 1 },
      { value: 1 }];
    const condition = (d: Record<string, any>) => d.value === 0;
    const res = createSubArrays(input, condition);
    const exp = [[{ value: 1 }], [], [{ value: 1 }, { value: 1 }]];
    expect(res).toStrictEqual(exp);
  });

  it('should return an array of arrays - index -1', () => {
    const input = [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 0 }];
    const condition = (d: Record<string, any>) => d.value === 0;
    const res = createSubArrays(input, condition);
    const exp = [[{ value: 1 }, { value: 1 }, { value: 1 }], []];
    expect(res).toStrictEqual(exp);
  });
});

import { Except } from 'type-fest';

import { cartesianStyleConfig, viewportStyleConfig } from '../style-config';
import {
  AxisOffsetProps, AxisOrientation, AxisProps,
} from '../types';
import {
  computeAxisOffset,
  computeAxisProperties,
  computeAxisStyleConfig,
  computeAxisSystemOffset,
  computeAxisSystemProperties,
  getAxisOffset,
  getLabelOffset,
  getTickLabelSize,
  handleChartAxisLayout,
  handleNumberOfTicks,
  handleTickFormat,
  handleVerticalTickLabelOffset,
  handleVerticalTickLabelTransform,
  hasVerticalTickLabel,
  inferScaleTypeFromDomain,
  scaleDomainToAxis,
} from './axis';

describe('getAxisOffset()', () => {
  it('should return offset for top axis', () => {
    const res = getAxisOffset({
      orientation: 'top',
      tick: 10,
      tickOffset: -10,
      tickLabelHeight: 10,
      maxLength: 10,
      axisLabel: 10,
      axisLine: 10,
    });
    const exp = 40;
    expect(res).toStrictEqual(exp);
  });

  it('should return offset for bottom axis', () => {
    const res = getAxisOffset({
      orientation: 'bottom',
      tick: 10,
      tickOffset: 10,
      tickLabelHeight: 10,
      maxLength: 10,
      axisLabel: 10,
      axisLine: 10,
    });
    const exp = 40;
    expect(res).toStrictEqual(exp);
  });

  it('should return offset for left axis', () => {
    const res = getAxisOffset({
      orientation: 'left',
      tick: 10,
      tickOffset: -10,
      tickLabelHeight: 10,
      maxLength: 10,
      axisLabel: 10,
      axisLine: 10,
    });
    const exp = 50;
    expect(res).toStrictEqual(exp);
  });

  it('should return offset for right axis', () => {
    const res = getAxisOffset({
      orientation: 'right',
      tick: 10,
      tickOffset: 10,
      tickLabelHeight: 10,
      maxLength: 10,
      axisLabel: 10,
      axisLine: 10,
    });
    const exp = 50;
    expect(res).toStrictEqual(exp);
  });
});

describe('getTickLabelSize()', () => {
  it('should return ticket label size - hideTickLabel', () => {
    const res = getTickLabelSize({
      isVertical: true,
      hideTickLabel: true,
      maxLength: 3,
      tickOffset: 4,
      tickLabelHeight: 5,
    });
    const exp = 7;
    expect(res).toStrictEqual(exp);
  });

  it('should return ticket label size - vertical', () => {
    const res = getTickLabelSize({
      isVertical: true,
      hideTickLabel: undefined,
      maxLength: 3,
      tickOffset: 4,
      tickLabelHeight: 5,
    });
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });

  it('should return ticket label size - horizontal', () => {
    const res = getTickLabelSize({
      isVertical: false,
      hideTickLabel: true,
      maxLength: 3,
      tickOffset: 4,
      tickLabelHeight: 5,
    });
    const exp = 9;
    expect(res).toStrictEqual(exp);
  });
});

describe('getLabelOffset()', () => {
  it('should get for top axis', () => {
    const res = getLabelOffset({
      orientation: 'top',
      labelOffset: 1,
      tickOffset: 2,
      tickLabelSize: 3,
      maxLength: 4,
    });
    const exp = -4;
    expect(res).toStrictEqual(exp);
  });

  it('should get for right axis', () => {
    const res = getLabelOffset({
      orientation: 'right',
      labelOffset: 1,
      tickOffset: 2,
      tickLabelSize: 3,
      maxLength: 4,
    });
    const exp = 4;
    expect(res).toStrictEqual(exp);
  });

  it('should get for bottom axis', () => {
    const res = getLabelOffset({
      orientation: 'bottom',
      labelOffset: 1,
      tickOffset: 2,
      tickLabelSize: 3,
      maxLength: 4,
    });
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });

  it('should get for left axis', () => {
    const res = getLabelOffset({
      orientation: 'left',
      labelOffset: 1,
      tickOffset: 2,
      tickLabelSize: 3,
      maxLength: 4,
    });
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });
});

describe('computeAxisOffset()', () => {
  it('should return a configuration for top axis', () => {
    const axis: Except<AxisProps, 'scaleType'> = {
      domain: [0, 1],
      orientation: 'top',
      label: 'test',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
      tickFormat: undefined,
    };
    const res = computeAxisOffset(axis);
    const exp = {
      axisLabel: 30,
      axisLine: 1,
      labelOffset: 28,
      offset: 63,
      orientation: 'top',
      tickLabelHeight: 28,
      tickLabelMaxChar: 0,
      tickLabelMaxLength: 0,
      tickLabelOffset: -12,
      tickLabelSize: 0,
      tickLength: 4,
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a configuration for right axis', () => {
    const axis: Except<AxisProps, 'scaleType'> = {
      domain: [0, 1],
      orientation: 'right',
      label: 'test',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
      tickFormat: undefined,
    };
    const res = computeAxisOffset(axis);
    const exp = {
      axisLabel: 30,
      axisLine: 1,
      labelOffset: 52,
      offset: 71,
      orientation: 'right',
      tickLabelHeight: 20,
      tickLabelMaxChar: 3,
      tickLabelMaxLength: 32,
      tickLabelOffset: 4,
      tickLabelSize: 0,
      tickLength: 4,
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a configuration for bottom axis', () => {
    const axis: Except<AxisProps, 'scaleType'> = {
      domain: [0, 1],
      orientation: 'bottom',
      label: 'test',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
      tickFormat: undefined,
    };
    const res = computeAxisOffset(axis);
    const exp = {
      axisLabel: 30,
      axisLine: 1,
      labelOffset: 20,
      offset: 55,
      orientation: 'bottom',
      tickLabelHeight: 20,
      tickLabelMaxChar: 0,
      tickLabelMaxLength: 0,
      tickLabelOffset: 4,
      tickLabelSize: 0,
      tickLength: 4,
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a configuration for left axis', () => {
    const axis: Except<AxisProps, 'scaleType'> = {
      domain: [0, 1],
      orientation: 'left',
      label: 'test',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
      tickFormat: undefined,
    };
    const res = computeAxisOffset(axis);
    const exp = {
      axisLabel: 30,
      axisLine: 1,
      labelOffset: 44,
      offset: 63,
      orientation: 'left',
      tickLabelHeight: 20,
      tickLabelMaxChar: 3,
      tickLabelMaxLength: 24,
      tickLabelOffset: -4,
      tickLabelSize: 0,
      tickLength: 4,
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a configuration hiding elements', () => {
    const axis: Except<AxisProps, 'scaleType'> = {
      domain: [0, 1],
      orientation: 'left',
      label: 'test',
      hideAxisLine: true,
      hideTickLabel: true,
      hideTicks: true,
      tickFormat: undefined,
    };
    const res = computeAxisOffset(axis);
    const exp = {
      axisLabel: 30,
      axisLine: 0,
      labelOffset: 16,
      offset: 34,
      orientation: 'left',
      tickLabelHeight: 0,
      tickLabelMaxChar: 3,
      tickLabelMaxLength: 0,
      tickLabelOffset: -4,
      tickLabelSize: 4,
      tickLength: 4,
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('computeAxisSystemOffset()', () => {
  it('should return', () => {
    const system: Record<AxisOrientation, AxisProps | undefined> = {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    };
    const res = computeAxisSystemOffset(system);
    const exp = {
      axis: {
        bottom: undefined,
        left: undefined,
        right: undefined,
        top: undefined,
      },
      offset: {
        bottomAxisOffset: 0,
        horizontalAxisOffset: 0,
        leftAxisOffset: 0,
        rightAxisOffset: 0,
        topAxisOffset: 0,
        verticalAxisOffset: 0,
      },
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a 4 axis configuration', () => {
    const system: Record<AxisOrientation, AxisOffsetProps | undefined> = {
      top: {
        domain: [0, 1],
        orientation: 'top',
        label: 'test',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
        tickFormat: undefined,
      },
      right: {
        domain: [0, 1],
        orientation: 'right',
        label: 'test',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
        tickFormat: undefined,
      },
      bottom: {
        domain: [0, 1],
        orientation: 'bottom',
        label: 'test',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
        tickFormat: undefined,
      },
      left: {
        domain: [0, 1],
        orientation: 'left',
        label: 'test',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
        tickFormat: undefined,
      },
    };
    const res = computeAxisSystemOffset(system);
    const exp = {
      axis: {
        bottom: {
          axisLabel: 30, axisLine: 1, labelOffset: 20, offset: 55, orientation: 'bottom', tickLabelHeight: 20, tickLabelMaxChar: 0, tickLabelMaxLength: 0, tickLabelOffset: 4, tickLabelSize: 0, tickLength: 4,
        },
        left: {
          axisLabel: 30, axisLine: 1, labelOffset: 44, offset: 63, orientation: 'left', tickLabelHeight: 20, tickLabelMaxChar: 3, tickLabelMaxLength: 24, tickLabelOffset: -4, tickLabelSize: 0, tickLength: 4,
        },
        right: {
          axisLabel: 30, axisLine: 1, labelOffset: 52, offset: 71, orientation: 'right', tickLabelHeight: 20, tickLabelMaxChar: 3, tickLabelMaxLength: 32, tickLabelOffset: 4, tickLabelSize: 0, tickLength: 4,
        },
        top: {
          axisLabel: 30, axisLine: 1, labelOffset: 28, offset: 63, orientation: 'top', tickLabelHeight: 28, tickLabelMaxChar: 0, tickLabelMaxLength: 0, tickLabelOffset: -12, tickLabelSize: 0, tickLength: 4,
        },
      },
      offset: {
        bottomAxisOffset: 55,
        horizontalAxisOffset: 118,
        leftAxisOffset: 63,
        rightAxisOffset: 71,
        topAxisOffset: 63,
        verticalAxisOffset: 134,
      },
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('computeAxisStyleConfig()', () => {
  it('should return', () => {
    const system: Record<AxisOrientation, AxisProps | undefined> = {
      top: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
        label: 'test',
      },
      right: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
        label: 'test',
      },
      bottom: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
        label: 'test',
      },
      left: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
        label: 'test',
      },
    };
    const res = computeAxisStyleConfig(system);
    const exp = {
      bottom: { labelOffset: 28, labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'auto', dy: 4 } },
      left: { labelOffset: 28, labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'middle', dx: -4, textAnchor: 'end' } },
      offset: {
        bottomAxisOffset: 63,
        horizontalAxisOffset: 126,
        leftAxisOffset: 63,
        rightAxisOffset: 63,
        topAxisOffset: 63,
        verticalAxisOffset: 126,
      },
      right: { labelOffset: 28, labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'middle', dx: 4, textAnchor: 'start' } },
      style: {
        axisLineProps: { strokeDasharray: '', strokeWidth: 1 },
        bottom: { labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'auto', dy: 4 } },
        formatting: { maxCharactersLength: 20, omission: '...' },
        labelProps: {
          fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600, textAnchor: 'middle',
        },
        left: { labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'middle', dx: -4, textAnchor: 'end' } },
        right: { labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'middle', dx: 4, textAnchor: 'start' } },
        spacing: {
          labelCharExtimatedWidth: 8, labelHeight: 14, labelOffset: 16, tickLabelHeight: 16, tickLength: 4,
        },
        tickLabelProps: { fontFamily: 'system-ui, sans-serif', fontSize: 14, fontWeight: 400 },
        tickLineProps: { length: 4, strokeLinecap: 'round', strokeWidth: 1 },
        top: { labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'auto', dy: -12 } },
      },
      top: { labelOffset: 28, labelProps: { dominantBaseline: 'auto' }, tickLabelProps: { dominantBaseline: 'auto', dy: -12 } },
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('inferScaleTypeFromDomain()', () => {
  it('should return linear', () => {
    const domain: Array<string | number | undefined> = [0, 1];
    const scaleType = undefined;
    const res = inferScaleTypeFromDomain(domain, scaleType);
    const exp = 'linear';
    expect(res).toStrictEqual(exp);
  });

  it('should return label', () => {
    const domain: Array<string | number | undefined> = ['a', 'b'];
    const scaleType = undefined;
    const res = inferScaleTypeFromDomain(domain, scaleType);
    const exp = 'label';
    expect(res).toStrictEqual(exp);
  });

  it('should return defined scaleType', () => {
    const domain: Array<string | number | undefined> = ['01-01-2020', '01-01-2023'];
    const scaleType = 'label';
    const res = inferScaleTypeFromDomain(domain, scaleType);
    const exp = 'label';
    expect(res).toStrictEqual(exp);
  });

  it('should return time', () => {
    const domain: Array<string | number | undefined> = ['01-01-2020', '01-01-2023'];
    const scaleType = undefined;
    const res = inferScaleTypeFromDomain(domain, scaleType);
    const exp = 'time';
    expect(res).toStrictEqual(exp);
  });
});

describe('scaleDomainToAxis()', () => {
  it('should return undefined for empty domain', () => {
    const axis: Except<AxisProps, 'orientation'> = {
      domain: [],
      range: [0, 100],
      scaleType: 'linear',
    };
    const scale = scaleDomainToAxis(axis);
    const res = scale?.('0.5' as any);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });

  it('should return for linear', () => {
    const axis: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      range: [0, 100],
      scaleType: 'linear',
    };
    const scale = scaleDomainToAxis(axis);
    const res = scale?.('0.5' as any);
    const exp = 50;
    expect(res).toStrictEqual(exp);
  });

  it('should return for label', () => {
    const axis: Except<AxisProps, 'orientation'> = {
      domain: ['a', 'b', 'c'],
      range: [0, 100],
      scaleType: 'label',
    };
    const scale = scaleDomainToAxis(axis);
    const res = scale?.('b' as any);
    const exp = 50;
    expect(res).toStrictEqual(exp);
  });

  it('should return for date', () => {
    const axis: Except<AxisProps, 'orientation'> = {
      domain: ['01-01-2020', '01-01-2022'],
      range: [0, 100],
      scaleType: 'time',
    };
    const scale = scaleDomainToAxis(axis);
    const res = scale?.(new Date('01-01-2021') as any);
    const exp = 50;
    expect(res).toStrictEqual(exp);
  });
});

describe('handleTickFormat()', () => {
  it('should return the same value w/o tickFormat', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func(1, 1);
    const exp = 1;
    expect(res).toStrictEqual(exp);
  });

  it('should return a formatted value', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: (v: any) => (`$ ${v}`),
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func(1, 1);
    const exp = '$ 1';
    expect(res).toStrictEqual(exp);
  });

  it('should return an empty string w hideTickLabel', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      hideTickLabel: true,
      tickFormat: (v: any) => (`$ ${v}`),
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func(1, 1);
    const exp = '';
    expect(res).toStrictEqual(exp);
  });

  it('should return a truncated string', () => {
    const axis: AxisProps = {
      domain: ['1234567890123456789012345', '1234567890123456789012345'],
      scaleType: 'label',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: (v: any) => (`$ ${v}`),
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func('1234567890123456789012345', 1);
    const exp = '$ 123456789012345...';
    expect(res).toStrictEqual(exp);
  });

  it('should return a truncated string w/o tickFormat', () => {
    const axis: AxisProps = {
      domain: ['1234567890123456789012345', '1234567890123456789012345'],
      scaleType: 'label',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func('1234567890123456789012345', 1);
    const exp = '12345678901234567...';
    expect(res).toStrictEqual(exp);
  });

  it('should return a formatted date value', () => {
    const axis: AxisProps = {
      domain: ['01-01-2020', '01-01-2023'],
      scaleType: 'time',
      orientation: 'top',
      hideTickLabel: false,
      tickFormat: (v: any) => (`today ${v}`),
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const func = handleTickFormat(computed!);
    const res = func('01-01-2023', 1);
    const exp = 'today 01-01-2023';
    expect(res).toStrictEqual(exp);
  });
});

describe('handleNumberOfTicks()', () => {
  it('should return 10 fro large size', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleNumberOfTicks(
      800,
      600,
      computed!,
      viewportStyleConfig,
    );
    const exp = 10;
    expect(res).toStrictEqual(exp);
  });

  it('should return 10 fro small size', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleNumberOfTicks(
      400,
      400,
      computed!,
      viewportStyleConfig,
    );
    const exp = 5;
    expect(res).toStrictEqual(exp);
  });

  it('should return 10 fro tiny size', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleNumberOfTicks(
      200,
      200,
      computed!,
      viewportStyleConfig,
    );
    const exp = 3;
    expect(res).toStrictEqual(exp);
  });
});

describe('hasVerticalTickLabel()', () => {
  it('should return false for large size and short labels', () => {
    const width = 800;
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).not.toBeTruthy();
  });

  it('should return true for long labels', () => {
    const width = 400;
    const axis: AxisProps = {
      domain: ['1234567890123456789', '1234567890123456789'],
      scaleType: 'label',
      orientation: 'top',
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).toBeTruthy();
  });

  it('should return true for long labels', () => {
    const width = 200;
    const axis: AxisProps = {
      domain: ['1234567890123456789', '1234567890123456789'],
      scaleType: 'label',
      orientation: 'top',
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).toBeTruthy();
  });

  it('should return false for tiny size', () => {
    const width = 200;
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'top',
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).not.toBeTruthy();
  });

  it('should return true for small size', () => {
    const width = 400;
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'top',
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).toBeTruthy();
  });

  it('should return true for numTicks > 10', () => {
    const width = 800;
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'top',
      numTicks: 20,
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).toBeTruthy();
  });

  it('should return false for vertical axis', () => {
    const width = 800;
    const axis: AxisProps = {
      domain: [0, 100],
      scaleType: 'linear',
      orientation: 'left',
      numTicks: 20,
    };
    const hasVertical = hasVerticalTickLabel(width, axis, viewportStyleConfig);
    expect(hasVertical).not.toBeTruthy();
  });
});

describe('handleVerticalTickLabelTransform()', () => {
  it('should return style for top axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleVerticalTickLabelTransform(1, true, computed!);
    const exp = { transform: 'translate(9, -4) rotate(-90, 800, 0)' };
    expect(res).toStrictEqual(exp);
  });

  it('should return style for top axis - horizontal label', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleVerticalTickLabelTransform(1, false, computed!);
    const exp = { transform: '', textAnchor: 'middle' };
    expect(res).toStrictEqual(exp);
  });

  it('should return style for bottom axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'bottom',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleVerticalTickLabelTransform(1, true, computed!);
    const exp = { transform: 'translate(13, 6) rotate(90, 800, 0)' };
    expect(res).toStrictEqual(exp);
  });

  it('should return style for bottom axis - horizontal label', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'bottom',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleVerticalTickLabelTransform(1, false, computed!);
    const exp = { transform: '', textAnchor: 'middle' };
    expect(res).toStrictEqual(exp);
  });

  it('should return {} for left/right axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'left',
      tickFormat: undefined,
    };
    const computed = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 0,
      positionRight: 0,
      positionBottom: 0,
      positionLeft: 0,
    });
    const res = handleVerticalTickLabelTransform(1, true, computed!);
    const exp = { };
    expect(res).toStrictEqual(exp);
  });
});

describe('handleVerticalTickLabelOffset()', () => {
  it('should return 0 for no axis', () => {
    const axis: AxisProps | undefined = undefined;
    const res = handleVerticalTickLabelOffset(800, cartesianStyleConfig, axis);
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for vertical string labels', () => {
    const axis: AxisProps = {
      domain: ['1234567890123456789', '1234567890123456789'],
      scaleType: 'label',
      orientation: 'top',
    };
    const res = handleVerticalTickLabelOffset(400, cartesianStyleConfig, axis);
    const exp = 136;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for vertical date labels', () => {
    const axis: AxisProps = {
      domain: ['2011-10-10T14:48:00', '2011-10-10T14:48:00'],
      scaleType: 'time',
      orientation: 'top',
    };
    const res = handleVerticalTickLabelOffset(400, cartesianStyleConfig, axis);
    const exp = 64;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for vertical number labels', () => {
    const axis: AxisProps = {
      domain: [1234567890123456789, 1234567890123456789],
      scaleType: 'linear',
      orientation: 'top',
    };
    const res = handleVerticalTickLabelOffset(400, cartesianStyleConfig, axis);
    const exp = 200;
    expect(res).toStrictEqual(exp);
  });
});

describe('computeAxisProperties()', () => {
  it('should return properties for top axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
    };
    const res = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    });
    expect(res!.scale).toBeDefined();
  });

  it('should return properties for rigth axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'right',
    };
    const res = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    });
    expect(res!.scale).toBeDefined();
  });

  it('should return properties for bottom axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'bottom',
    };
    const res = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    });
    expect(res!.scale).toBeDefined();
  });

  it('should return properties for left axis', () => {
    const axis: AxisProps = {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'left',
    };
    const res = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    });
    expect(res!.scale).toBeDefined();
  });

  it('should return undefined if no axis', () => {
    const axis = undefined;
    const res = computeAxisProperties({
      axis,
      maxRangeX: 800,
      maxRangeY: 600,
      positionTop: 1,
      positionRight: 2,
      positionBottom: 3,
      positionLeft: 4,
    });
    expect(res).toBeUndefined();
  });
});

describe('computeAxisSystemProperties()', () => {
  it('should return', () => {
    const axis: Record<AxisOrientation, AxisProps | undefined> = {
      top: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
      },
      right: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
      },
      bottom: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
      },
      left: {
        domain: [0, 1],
        orientation: 'top',
        scaleType: 'linear',
      },
    };
    const res = computeAxisSystemProperties(
      axis,
      { maxWidth: 800, maxHeight: 600 },
      {
        top: 1, right: 2, bottom: 3, left: 4,
      },
    );
    expect(res.top!.scale).toBeDefined();
    expect(res.right!.scale).toBeDefined();
    expect(res.bottom!.scale).toBeDefined();
    expect(res.left!.scale).toBeDefined();
  });
});

describe('handleChartAxisLayout()', () => {
  it('should return a full configuration', () => {
    const index: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      scaleType: 'linear',
    };
    const series: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      scaleType: 'linear',
    };
    const overlay: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      scaleType: 'linear',
    };
    const res = handleChartAxisLayout(index, series, overlay);
    const exp = {
      horizontal: {
        bottom: { domain: [0, 1], orientation: 'bottom', scaleType: 'linear' }, left: { domain: [0, 1], orientation: 'left', scaleType: 'linear' }, right: { domain: [0, 1], orientation: 'right', scaleType: 'linear' }, top: undefined,
      },
      vertical: {
        bottom: { domain: [0, 1], orientation: 'bottom', scaleType: 'linear' }, left: { domain: [0, 1], orientation: 'left', scaleType: 'linear' }, right: undefined, top: { domain: [0, 1], orientation: 'top', scaleType: 'linear' },
      },
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a configuration w/o overlay', () => {
    const index: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      scaleType: 'linear',
    };
    const series: Except<AxisProps, 'orientation'> = {
      domain: [0, 1],
      scaleType: 'linear',
    };
    const res = handleChartAxisLayout(index, series);
    const exp = {
      horizontal: {
        bottom: { domain: [0, 1], orientation: 'bottom', scaleType: 'linear' }, left: { domain: [0, 1], orientation: 'left', scaleType: 'linear' }, right: undefined, top: undefined,
      },
      vertical: {
        bottom: { domain: [0, 1], orientation: 'bottom', scaleType: 'linear' }, left: { domain: [0, 1], orientation: 'left', scaleType: 'linear' }, right: undefined, top: undefined,
      },
    };
    expect(res).toStrictEqual(exp);
  });
});

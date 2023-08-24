import { Except } from 'type-fest';

import { AxisProps } from '../cartesian-base';

export type AxisOrientation = 'top' | 'left' | 'right' | 'bottom';
export type DominantBaseline = 'auto' | 'middle' | 'hanging';
export type TextAnchor = 'start' | 'middle' | 'end';
export type StrokeLinecap = 'butt' | 'round' | 'square'

export type AllAxisOffsetInput = Pick<AxisProps, 'domain' | 'label'>

export type SingleAxisOffsetInput = AllAxisOffsetInput & { orientation: AxisOrientation }

export type AxisOffsetConfig = {
  topAxisOffset: number;
  rightAxisOffset: number;
  bottomAxisOffset: number;
  leftAxisOffset: number;
  verticalAxisOffset: number;
  horizontalAxisOffset: number;
}

export type HorizontalAxisConfig = {
  tickLabelProps: {
    dy: number;
    dominantBaseline: DominantBaseline;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
  labelOffset: number;
}

export type VerticalAxisConfig = {
  tickLabelProps: {
    dx: number;
    dominantBaseline: DominantBaseline;
    textAnchor: TextAnchor;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
  labelOffset: number;
}

export type AxisConfig = {
  offset: AxisOffsetConfig;
  style: AxisStyleConfig;
  top: HorizontalAxisConfig;
  right: VerticalAxisConfig;
  bottom: HorizontalAxisConfig;
  left: VerticalAxisConfig;
}

export type LabelProps = {
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textAnchor: TextAnchor;
}

export type TickLabelProps = Except<LabelProps, 'textAnchor'>

export type TickLineProps = {
  length: number;
  stroke: string;
  strokeWidth: number;
  strokeLinecap: StrokeLinecap;
}

export type AxisLineProps = {
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
}

export type AxisSpacing = {
  labelCharExtimatedWidth: number;
  labelHeight: number;
  labelOffset: number;
  tickLabelHeight: number;
  tickOffset: number;
  tickLength: number;
}

export type VerticalAxisStyleConfig = {
  tickLabelProps: {
    dx: number;
    textAnchor: TextAnchor;
    dominantBaseline: DominantBaseline;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
};

export type HorizontalAxisStyleConfig = {
  tickLabelProps: {
    dy: number;
    dominantBaseline: DominantBaseline;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
};

export type AxisStyleConfig = {
  labelProps: LabelProps;
  tickLabelProps: TickLabelProps;
  tickLineProps: TickLineProps;
  axisLineProps: AxisLineProps;
  spacing: AxisSpacing;
  top: HorizontalAxisStyleConfig;
  right: VerticalAxisStyleConfig;
  bottom: HorizontalAxisStyleConfig;
  left: VerticalAxisStyleConfig;
}

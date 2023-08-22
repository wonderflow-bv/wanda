import { Except } from 'type-fest';

export type TextAnchor = 'start' | 'middle' | 'end';
export type StrokeLinecap = 'butt' | 'round' | 'square'

export type LabelProps = {
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textAnchor: TextAnchor;
}

export type TickLabelProps = Except<LabelProps, 'textAnchor'>

export type TickProps = {
  length: number;
  stroke: string;
  strokeWidth: number;
  strokeLinecap: StrokeLinecap;
}

export type AxisStyle = {
  hideAxisLine: boolean;
  hideTicks: boolean;
  hideZero: boolean;
  labelProps: LabelProps;
  tickLabelProps: TickLabelProps;
  tickLineProps: TickProps;
}

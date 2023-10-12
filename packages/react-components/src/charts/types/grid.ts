import { Background } from './linear-gradient';

export type GridStyle = {
  offset?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeDasharray?: string;
  lineStyle?: Record<string, unknown>;
}

export type GridStyleConfig = {
  rows?: GridStyle;
  columns?: GridStyle;
  background: Background;
}

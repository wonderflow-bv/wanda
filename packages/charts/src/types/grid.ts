import { Background } from './linear-gradient';

export type GridStyle = {
  offset?: number;
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

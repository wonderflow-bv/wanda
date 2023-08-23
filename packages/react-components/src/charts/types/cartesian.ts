import { AxisStyleConfig } from './axis';
import { GridStyleConfig } from './grid';
import { LinearGradientStyleConfig } from './linear-gradient';

export type MarginProps = {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export type CartesianStyleConfig = {
  linearGradient: LinearGradientStyleConfig;
  grid: GridStyleConfig;
  axis: AxisStyleConfig;
}

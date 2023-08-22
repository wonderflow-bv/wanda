import { AxisStyleConfig, axisStyleConfig } from './axis';
import { GridStyleConfig, gridStyleConfig } from './grid';
import { LinearGradientStyleConfig, linearGradientStyleConfig } from './linear-gradient';

export type CartesianStyleConfig = {
  linearGradient: LinearGradientStyleConfig;
  grid: GridStyleConfig;
  axis: AxisStyleConfig;
}

export const cartesianStyleConfig = {
  linearGradient: linearGradientStyleConfig,
  grid: gridStyleConfig,
  axis: axisStyleConfig,
};

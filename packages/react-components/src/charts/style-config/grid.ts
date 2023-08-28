import { GridStyle, GridStyleConfig } from '../types/grid';
import { themeLight } from './themes';

export const gridRowsStyleConfig: GridStyle = {
  offset: 0,
  fill: '',
  stroke: themeLight.grid.line,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridColumnsStyleConfig: GridStyle = {
  offset: 0,
  fill: '',
  stroke: themeLight.grid.line,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridStyleConfig: GridStyleConfig = {
  rows: gridRowsStyleConfig,
  columns: gridColumnsStyleConfig,
};

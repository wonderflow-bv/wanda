import { Background } from '../types';
import { GridStyle, GridStyleConfig } from '../types/grid';
import { themeLight } from './themes';

export const gridRowsStyleConfig: GridStyle = {
  offset: 0,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridColumnsStyleConfig: GridStyle = {
  offset: 0,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridBackgroundStyleConfig: Background = {
  from: themeLight.grid.background.from,
  to: themeLight.grid.background.to,
};

export const gridStyleConfig: GridStyleConfig = {
  rows: gridRowsStyleConfig,
  columns: gridColumnsStyleConfig,
  background: gridBackgroundStyleConfig,
};

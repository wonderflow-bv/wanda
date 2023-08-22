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
}

export const gridRowsStyleConfig: GridStyle = {
  offset: 0,
  fill: '',
  stroke: '#ccc',
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridColumnsStyleConfig: GridStyle = {
  offset: 0,
  fill: '',
  stroke: '#ccc',
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: '',
  lineStyle: {},
};

export const gridStyleConfig: GridStyleConfig = {
  rows: gridRowsStyleConfig,
  columns: gridColumnsStyleConfig,
};

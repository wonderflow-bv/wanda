import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { BarChartMetadata } from '../../../types';

export const BarsSeries = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, hoveredLegendItem: overLegend } = useCartesianContext();

  console.log(theme, defaultStyle, themes, data, metadata, isHorizontal, axis, overLegend);

  return (<></>);
};

BarsSeries.displayName = 'BarSeries';


/*
 * Copyright 2022-2024 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useSize } from 'ahooks';
import _ from 'lodash';
import {
  CSSProperties, useMemo, useRef, useState,
} from 'react';

import { HeadingsProps } from '../components';
import { useDataContext, useLayoutContext, useThemeContext } from '../providers';
import { cartesianStyleConfig } from '../style-config';
import {
  AxisConfig,
  AxisOrientation,
  AxisProps,
  Background, CartesianStyleConfig, CartesianxAxisSystem, DeepPartial, MarginProps,
} from '../types';
import { computeAxisStyleConfig, computeAxisSystemProperties, handleVerticalTickLabelOffset } from '../utils';
import { useSSR } from './useSSR';

export type UseCartesianProps = {
  axis: Record<AxisOrientation, AxisProps | undefined>;
  axisFiltered: Record<AxisOrientation, AxisProps | undefined>;
  background?: Background;
  headings?: Pick<HeadingsProps, 'top'| 'left'| 'config'>;
  height?: number;
  hideLegend: boolean;
  isLoading?: boolean;
  margin?: MarginProps;
  preventResponsive?: boolean;
  reverseIndex?: boolean;
  mirrorDomains?: boolean;
  overrideInnerHeight?: number;
  barChartLabelsMaxSize?: number;
  showBrush?: boolean;
  styleConfig?: DeepPartial<CartesianStyleConfig>;
  title?: string;
  menu?: React.ReactNode;
  width?: number;
}

export const useCartesian = ({
  axis,
  axisFiltered,
  background,
  headings,
  height = 600,
  hideLegend = false,
  isLoading = false,
  margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  preventResponsive = false,
  reverseIndex = false,
  mirrorDomains = false,
  overrideInnerHeight,
  barChartLabelsMaxSize,
  showBrush = false,
  styleConfig,
  title,
  menu,
  width = 800,
}: UseCartesianProps) => {
  const theme = useThemeContext();
  const { isHorizontal } = useLayoutContext();
  const { metadata, data, filteredData } = useDataContext();
  const { isBrowser } = useSSR();

  const cartesianConfig = useMemo(() => _.merge(cartesianStyleConfig, styleConfig), [styleConfig]);
  const {
    axis: aStyle, legend: lStyle, themes, headings: hStyle, viewport,
  } = cartesianConfig;
  const { from: bgFrom, to: bgTo } = useMemo(
    () => _.merge(themes[theme].background, background), [background, theme, themes],
  );

  const [hoveredLegendItem, setHoveredLegendItem] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  const refLegend = useRef<HTMLDivElement>(null);
  const sizeLegend = useSize(refLegend);

  const hasData = !!filteredData.length;
  const hasEmptyState = !isLoading && !hasData;

  const hasLegend = data && !hideLegend && !isLoading;
  const legendHeight = hasLegend ? (sizeLegend?.height ?? 0) : 0;

  const isBrushInViewport = isHorizontal
    ? Boolean(size && size.width > viewport.medium.maxWidth)
    : Boolean(size && size.height > viewport.medium.maxHeight);
  const hasBrush = isBrowser && isBrushInViewport && showBrush;

  const brushSize = 32;
  const brushPadding = 16;
  const brushTotalArea = brushSize + brushPadding;
  const brushArea = {
    height: (hasBrush && isHorizontal) ? brushTotalArea : 0,
    width: (hasBrush && !isHorizontal) ? brushTotalArea : 0,
  };

  const hasHeadings = Boolean(title || menu);
  const headingsHeight = hasHeadings ? hStyle.height : 0;

  const w = size ? size.width : width;
  const h = size ? (overrideInnerHeight ?? size.height) : height;

  const dynamicWidth = preventResponsive ? width : w;
  const dynamicHeight = preventResponsive ? height : h;

  const dynamicStyle: CSSProperties = {
    '--static-width': `${dynamicWidth}px`,
    '--static-height': `${dynamicHeight}px`,
    '--legend-width': `calc(100% - ${margin.left + margin.right}px)`,
    '--legend-top': `calc(100% - ${legendHeight + margin.bottom}px)`,
    '--legend-left': `${margin.left}px`,
    '--legend-padding': lStyle.padding,
  };

  const {
    top, right, bottom, left,
  } = axis;

  const axisConfig: AxisConfig = useMemo(() => computeAxisStyleConfig(axis, aStyle), [aStyle, axis]);

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const mr = margin.right * (right ? 1 : 2);
  const ml = margin.left * (left ? 1 : 2);

  const barChartLabelsSize = (barChartLabelsMaxSize !== undefined && !isHorizontal) ? barChartLabelsMaxSize : 0;

  const xMax = dynamicWidth - ml - mr - vOff - brushArea.width - barChartLabelsSize;

  const topTickLabelOffset = handleVerticalTickLabelOffset(xMax, cartesianConfig, top);
  const bottomTickLabelOffset = handleVerticalTickLabelOffset(xMax, cartesianConfig, bottom);

  const mt = margin.top * (top ? 1 : 2) + headingsHeight + topTickLabelOffset;
  const mb = margin.bottom * (bottom ? 1 : 2) + legendHeight + bottomTickLabelOffset + brushArea.height;

  const yMax = dynamicHeight - mt - mb - hOff;

  const dimension = {
    loader: {
      width: dynamicWidth - margin.left - margin.right,
      height: dynamicHeight - headingsHeight - margin.top - margin.bottom,
    },
    axis: {
      maxWidth: xMax,
      maxHeight: yMax,
    },
  };

  const position = {
    headings: {
      top: headings?.top ?? margin.top,
      left: headings?.left ?? ml,
    },
    loader: {
      top: margin.top + headingsHeight,
      left: margin.left,
    },
    axis: {
      top: mt + tOff,
      right: ml + lOff + xMax,
      bottom: mt + tOff + yMax,
      left: ml + lOff,
    },
    brush: {
      top: isHorizontal
        ? mt + tOff + bottomTickLabelOffset + dimension.axis.maxHeight + brushArea.height
        : mt + tOff,
      left: isHorizontal
        ? ml + lOff
        : ml + lOff + xMax + barChartLabelsSize,
    },
  };

  const config = useMemo(() => ({
    hasReversedIndex: Boolean(reverseIndex && !isHorizontal),
    hasMirroredDomainsHorizontal: Boolean(mirrorDomains && isHorizontal), // will affect Left/Right axis
    hasMirroredDomainsVertical: Boolean(mirrorDomains && !isHorizontal), // will affect Top/Bottom axis
  }), [isHorizontal, mirrorDomains, reverseIndex]);

  const axisSystem: CartesianxAxisSystem = useMemo(
    () => computeAxisSystemProperties(axis, dimension.axis, position.axis, config),
    [axis, dimension.axis, position.axis, config],
  );

  const axisFilteredSystem: CartesianxAxisSystem = useMemo(
    () => computeAxisSystemProperties(axisFiltered, dimension.axis, position.axis, config),
    [axisFiltered, dimension.axis, position.axis, config],
  );

  return {
    axisConfig,
    axisFilteredSystem,
    axisSystem,
    bgFrom,
    bgTo,
    brushSize,
    brushPadding,
    cartesianConfig,
    dimension,
    dynamicHeight,
    dynamicWidth,
    dynamicStyle,
    hasData,
    hasLegend,
    hasBrush,
    hasReversedIndex: config.hasReversedIndex,
    hasMirroredDomainsHorizontal: config.hasMirroredDomainsHorizontal,
    hasMirroredDomainsVertical: config.hasMirroredDomainsVertical,
    filteredData,
    hasEmptyState,
    hoveredLegendItem,
    isMenuOpen,
    metadata,
    position,
    ref,
    refLegend,
    theme,
    setHoveredLegendItem,
    setIsMenuOpen,
  };
};

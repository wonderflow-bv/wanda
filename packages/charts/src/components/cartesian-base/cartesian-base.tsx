/*
* Copyright 2023 Wonderflow Design Team
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

import { RectClipPath } from '@visx/clip-path';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { useSize } from 'ahooks';
import _ from 'lodash';
import {
  CSSProperties,
  useMemo, useRef, useState,
} from 'react';

import { StyleConfigProvider } from '../../providers';
import { CartesianProvider } from '../../providers/cartesian';
import { DataProvider, useDataContext } from '../../providers/data';
import { useThemeContext } from '../../providers/theme';
import { cartesianStyleConfig } from '../../style-config';
import { AxisConfig, AxisOrientation, CartesianxAxisSystem } from '../../types';
import {
  AxisProps, CartesianStyleConfig, GridProps, MarginProps,
} from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts,
  Data,
  DeepPartial,
} from '../../types/main';
import {
  computeAxisStyleConfig,
  computeAxisSystemProperties, handleVerticalTickLabelOffset,
} from '../../utils/axis';
import { EmptyState } from '../empty-state';
import { Headings, HeadingsProps } from '../headings';
import { Loader } from '../loader';
import { Bars, Lines } from '../shapes';
import styles, { Unselectable } from './cartesian-base.module.css';
import { CartesianBaseAxis } from './cartesian-base-axis';
import { CartesianBaseBrush } from './cartesian-base-brush';
import { CartesianBaseGrid } from './cartesian-base-grid';
import { CartesianBaseLegend } from './cartesian-base-legend';

export type CartesianBaseProps = {
  /**
   * Set the title in the headings. If no title is set, headings will not be displayed.
   */
  title?: string;
  /**
   * Set an optional subtitle in the headings.
   */
  subtitle?: string;
  /**
   * Set headings custom position and style.
   */
  headings?: Pick<HeadingsProps, 'top'| 'left'| 'config'>;
  /**
   * Set the Cartesian component width. 800px is the default value;
   */
  width?: number;
  /**
   * Set the Cartesian component height. 600px is the default value;
   */
  height?: number;
  /**
   * If true prevent the chart to be responsive.
   */
  preventResponsive?: boolean;
  /**
   * Set the loading state.
   */
  isLoading?: boolean;
  /**
   * Set the Cartesian component background `from` and `to` values.
   */
  background?: Background;
  /**
   * Set margin using an object with `top`, `right`, `bottom` and `left` position.
   */
  margin?: MarginProps;
  /**
   * Set `Grid` properties.
   */
  grid?: GridProps;
  /**
   * Set `Axis System` properties.
   */
  axis: Record<AxisOrientation, AxisProps | undefined>;
  /**
   * Set `Axis System` properties.
   */
  axisFiltered: Record<AxisOrientation, AxisProps | undefined>;
  /**
   * Set the horizontal brush visibility.
   */
  showBrush?: boolean;
  /**
   * Hide `Legend` when set to `true`.
   */
  hideLegend?: boolean;
  /**
   * Set an optional custom `Empty State` component.
   */
  emptyState?: React.ReactNode;
  /**
   * Set an optional `Empty State` message to be displayed under the label 'No Data Available'.
   */
  emptyStateMessage?: string;
  /**
   * Set a custom `Legend` content.
   */
  customLegend?: React.ReactNode;
  /**
   * Set custom styling properties.
   */
  styleConfig?: DeepPartial<CartesianStyleConfig>;
  /**
   * Set other custom properties.
   */
  otherProps?: Record<string, unknown>;
  /**
   *
   */
  onBrushChange: (filteredData: Data) => void;
}

export const CartesianBase: React.FC<CartesianBaseProps> = ({
  width = 800,
  height = 600,
  preventResponsive,
  isLoading = false,
  background,
  margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  grid = {
    hideColumns: false,
    hideRows: false,
  },
  title,
  subtitle,
  headings,
  axis,
  axisFiltered,
  showBrush = false,
  hideLegend = false,
  emptyState,
  emptyStateMessage,
  customLegend,
  styleConfig,
  otherProps,
  onBrushChange,
}: CartesianBaseProps) => {
  const theme = useThemeContext();
  const { metadata, data, filteredData } = useDataContext();

  const cartesianConfig = _.merge(cartesianStyleConfig, styleConfig);
  const {
    axis: aStyle, legend: lStyle, themes, headings: hStyle,
  } = cartesianConfig;
  const { from, to } = _.merge(themes[theme].background, background);

  const [hoveredLegendItem, setHoveredLegendItem] = useState<string>('');

  const ref = useRef(null);
  const size = useSize(ref);

  const refLegend = useRef(null);
  const sizeLegend = useSize(refLegend);

  const hasData = !!filteredData.length;
  const hasEmptyState = !isLoading && !hasData;

  const hasLegend = data && !hideLegend && !isLoading;
  const legendHeight = hasLegend ? (sizeLegend?.height ?? 0) : 0;

  const brushHeight = showBrush ? 50 : 0;

  const hasHeadings = !!title;
  const headingsHeight = hasHeadings ? hStyle.height : 0;

  const w = size ? size.width : width;
  const h = size ? size.height : height;

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

  const xMax = dynamicWidth - ml - mr - vOff;

  const topTickLabelOffset = handleVerticalTickLabelOffset(xMax, cartesianConfig, top);
  const bottomTickLabelOffset = handleVerticalTickLabelOffset(xMax, cartesianConfig, bottom);

  const mt = margin.top * (top ? 1 : 2) + headingsHeight + topTickLabelOffset;
  const mb = margin.bottom * (bottom ? 1 : 2) + legendHeight + bottomTickLabelOffset + brushHeight;

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
      left: ml + lOff,
      top: mt + tOff + bottomTickLabelOffset + dimension.axis.maxHeight + brushHeight,

    },
  };

  const axisSystem: CartesianxAxisSystem = useMemo(
    () => computeAxisSystemProperties(axis, dimension.axis, position.axis),
    [axis, dimension.axis, position.axis],
  );

  const axisFilteredSystem: CartesianxAxisSystem = useMemo(
    () => computeAxisSystemProperties(axisFiltered, dimension.axis, position.axis),
    [axisFiltered, dimension.axis, position.axis],
  );

  return (
    <div
      className={styles.Wrapper}
      data-theme={theme}
      data-responsive={!preventResponsive}
      ref={ref}
      style={dynamicStyle}
      data-testid="cartesian"
    >
      <StyleConfigProvider styleConfig={cartesianConfig}>
        <svg
          width={dynamicWidth}
          height={dynamicHeight}
          viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
          className={Unselectable}
          {...otherProps}
        >

          <RectClipPath
            id="clip-path-cartesian-container"
            x={0}
            y={0}
            width={dynamicWidth}
            height={dynamicHeight}
          />

          <RectClipPath
            id="clip-path-cartesian-chart"
            x={position.axis.left}
            y={position.axis.top}
            width={dimension.axis.maxWidth}
            height={dimension.axis.maxHeight}
          />

          <LinearGradient id="cartesian-container" from={from} to={to} />

          <rect
            x={0}
            y={0}
            width={dynamicWidth}
            height={dynamicHeight}
            fill="url(#cartesian-container)"
            rx={0}
            strokeWidth={0}
            stroke="none"
          />

          <Headings
            title={title}
            subtitle={subtitle}
            top={position.headings.top}
            left={position.headings.left}
            config={headings?.config}
          />

          <Loader
            isLoading={isLoading}
            top={position.loader.top}
            left={position.loader.left}
            width={dimension.loader.width}
            height={dimension.loader.height}
          />

          {!isLoading && (
            <Group clipPath="url(#clip-path-cartesian-container)">
              <CartesianBaseGrid
                position={position.axis}
                dimension={dimension.axis}
                axis={axisFilteredSystem}
                hideRows={!hasData || grid.hideRows}
                hideColumns={!hasData || grid.hideColumns}
                tickRows={grid.tickRows}
                tickColumns={grid.tickColumns}
                background={grid.background}
                otherProps={grid.otherProps}
              />

              <CartesianBaseAxis
                dimension={dimension.axis}
                axis={axisFilteredSystem}
                axisConfig={axisConfig}
              />

              <EmptyState
                position={position.axis}
                dimension={dimension.axis}
                customEmptyState={emptyState}
                message={emptyStateMessage}
                isVisible={hasEmptyState}
              />

              {hasData && (
                <CartesianProvider
                  position={position.axis}
                  dimension={dimension.axis}
                  axis={axisFilteredSystem}
                  hoveredLegendItem={hoveredLegendItem}
                >
                  <DataProvider data={filteredData} metadata={metadata} filteredData={filteredData}>
                    <Group clipPath="url(#clip-path-cartesian-chart)">
                      {metadata?.type === Charts.LINE_CHART && <Lines />}
                      {metadata?.type === Charts.BAR_CHART && <Bars />}
                    </Group>
                  </DataProvider>
                </CartesianProvider>
              )}

              <CartesianBaseBrush
                axisSystem={axisSystem}
                position={position.brush}
                dimension={dimension.axis}
                isVisible={showBrush}
                onChange={onBrushChange}
              />
            </Group>
          )}
        </svg>

        <CartesianBaseLegend
          customLegend={customLegend}
          isVisible={hasLegend}
          ref={refLegend}
          onMouseOver={(dataKey: string) => setHoveredLegendItem(dataKey)}
        />
      </StyleConfigProvider>

    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

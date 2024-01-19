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

import { useCartesian } from '../../hooks';
import { StyleConfigProvider } from '../../providers';
import { CartesianProvider } from '../../providers/cartesian';
import { DataProvider } from '../../providers/data';
import { AxisOrientation } from '../../types';
import {
  AxisProps, CartesianStyleConfig, GridProps, MarginProps,
} from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts,
  Data,
  DeepPartial,
} from '../../types/main';
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
   * A callback to retrieve data filtered from the brush.
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
  const {
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
    hasBrush,
    hasData,
    hasLegend,
    filteredData,
    hasEmptyState,
    hoveredLegendItem,
    metadata,
    position,
    ref,
    refLegend,
    theme,
    setHoveredLegendItem,
  } = useCartesian({
    axis,
    axisFiltered,
    background,
    headings,
    height,
    hideLegend,
    isLoading,
    margin,
    preventResponsive,
    showBrush,
    styleConfig,
    title,
    width,
  });

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
          {...otherProps}
          width={dynamicWidth}
          height={dynamicHeight}
          viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
          className={Unselectable}
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

          <LinearGradient id="cartesian-container" from={bgFrom} to={bgTo} />

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
                brushSize={brushSize}
                dimension={dimension.axis}
                isVisible={hasBrush}
                padding={brushPadding}
                position={position.brush}
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

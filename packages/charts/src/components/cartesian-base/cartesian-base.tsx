/*
 * Copyright 2023-2024 Wonderflow Design Team
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
import clsx from 'clsx';
import React, { forwardRef, SVGProps } from 'react';
import { mergeRefs } from 'react-merge-refs';

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
   * Set the content for the popup menu.
   */
  menu?: React.ReactNode;
  /**
   * Set the Cartesian component width. 800px is the default value.
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
   * Set `Axis System` properties used by the `Brush` component.
   */
  axisFiltered: Record<AxisOrientation, AxisProps | undefined>;
  /**
   * Set the `Brush` visibility.
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
   * By default, the data will grow from the lower left Cartesian
   * origin ({x:0, y:0}) in both the horizontal and vertical
   * layouts, so that the values will increase upward and
   * rightward. By setting this parameter `true`, the order of the
   * index will be reversed, but only in the vertical layout (left
   * axis).
   */
  reverseIndex?: boolean;
  /**
   * When set to 'true' zero will be in the middle of the axis and
   * the positive and negative domain value will equal to +/- the
   * max absolute value (eg. [10, -100] will be [100, -100]).
   */
  mirrorDomains?: boolean;
  /**
   * This value is used to override the dynamic height of the
   * chart, intended as the dimension of axis and grid. It is
   * different from the height property which computes all the
   * subcomponents dimension and is equal to the total external
   * chart height.
   */
  overrideInnerHeight?: number;
  /**
   * Set custom styling properties.
   */
  styleConfig?: DeepPartial<CartesianStyleConfig>;
  /**
   * Set SVG custom properties.
   */
  otherProps?: SVGProps<SVGSVGElement>;
  /**
   * Set extra class
   */
  className?: string;
  /**
   * Add some inline style
   */
  style?: Record<string, any>;
  /**
   * A callback to retrieve data filtered from the brush.
   */
  onBrushChange: (filteredData: Data) => void;
}

export const CartesianBase = forwardRef<HTMLElement, CartesianBaseProps>(({
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
  menu,
  axis,
  axisFiltered,
  showBrush = false,
  hideLegend = false,
  emptyState,
  emptyStateMessage,
  customLegend,
  reverseIndex,
  mirrorDomains,
  overrideInnerHeight,
  styleConfig,
  className,
  style,
  otherProps,
  onBrushChange,
},
forwardedRef) => {
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
    hasReversedIndex,
    hasMirroredDomainsHorizontal,
    hasMirroredDomainsVertical,
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
    reverseIndex,
    mirrorDomains,
    overrideInnerHeight,
    showBrush,
    styleConfig,
    title,
    menu,
    width,
  });

  return (
    <div
      aria-atomic="true"
      aria-hidden="false"
      aria-label="Cartesian Chart"
      className={clsx([styles.Wrapper, className])}
      data-testid="cartesian"
      data-responsive={!preventResponsive}
      data-theme={theme}
      ref={mergeRefs([ref, forwardedRef])}
      role="img"
      style={{ ...style, ...dynamicStyle }}
    >
      <StyleConfigProvider styleConfig={cartesianConfig}>
        <svg
          {...otherProps}
          width={dynamicWidth}
          height={dynamicHeight}
          viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
          className={Unselectable}
          onMouseOver={() => setHoveredLegendItem('')}
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

          <defs>
            <filter id="filter_multiply" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>
          </defs>

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
            width={dynamicWidth}
            margin={margin}
            menu={menu}
            config={headings?.config}
            onMenuOpen={setIsMenuOpen}
            data-inner-element="Headings"
          />

          <Loader
            isLoading={isLoading}
            top={position.loader.top}
            left={position.loader.left}
            width={dimension.loader.width}
            height={dimension.loader.height}
            data-inner-element="Loader"
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
                data-inner-element="CartesianBaseGrid"
              />

              <CartesianBaseAxis
                dimension={dimension.axis}
                axis={axisFilteredSystem}
                axisConfig={axisConfig}
                data-inner-element="CartesianBaseAxis"
              />

              <EmptyState
                position={position.axis}
                dimension={dimension.axis}
                customEmptyState={emptyState}
                message={emptyStateMessage}
                isVisible={hasEmptyState}
                data-inner-element="EmptyState"
              />

              {hasData && (
                <CartesianProvider
                  position={position.axis}
                  dimension={dimension.axis}
                  axis={axisFilteredSystem}
                  hoveredLegendItem={hoveredLegendItem}
                  preventTooltipOpening={isMenuOpen}
                  hasReversedIndex={hasReversedIndex}
                  hasMirroredDomainsHorizontal={hasMirroredDomainsHorizontal}
                  hasMirroredDomainsVertical={hasMirroredDomainsVertical}
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
                data-inner-element="CartesianBaseBrush"
              />
            </Group>
          )}
        </svg>

        <CartesianBaseLegend
          customLegend={customLegend}
          isVisible={hasLegend}
          ref={refLegend}
          onMouseOver={(dataKey: string) => setHoveredLegendItem(dataKey)}
          data-inner-element="CartesianBaseLegend"
        />
      </StyleConfigProvider>

    </div>
  );
});

CartesianBase.displayName = 'CartesianBase';

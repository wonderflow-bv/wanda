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

/* eslint-disable @typescript-eslint/naming-convention */

import {
  Axis,
  TickFormatter,
} from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import {
  NumberValue,
} from '@visx/vendor/d3-scale';
import { useSize } from 'ahooks';
import _ from 'lodash';
import {
  CSSProperties,
  useMemo, useRef,
} from 'react';

import { headingsStyleConfig as hStyle } from '../../style-config';
import { ThemeVariants } from '../../types';
import { AxisType } from '../../types/axis';
import { CartesianStyleConfig, MarginProps } from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts, Data, DeepPartial, ScaleType,
} from '../../types/main';
import {
  computeAllAxisProperties, computeAxisConfig, handleTickFormat,
  handleTickNumber,
  handleVerticalTickLabelOffset,
  handleVerticalTickLabelTransform,
  hasVerticalTickLabel,
} from '../../utils/axis';
import { getCartesianStyleConfigFromTheme } from '../../utils/colors';
import { Headings, HeadingsProps } from '../headings';
import { LineChartMetadata } from '../line-chart/line-chart';
import { Lines } from '../shapes';
import styles from './cartesian-base.module.css';

export type CartesianBaseProps = {
  data?: Data;
  metadata?: LineChartMetadata;
  theme?: ThemeVariants;
  title?: string;
  subtitle?: string;
  headings?: Pick<HeadingsProps, 'top'| 'left'| 'config'>;
  width?: number;
  height?: number;
  preventResponsive?: boolean;
  isLoading?: boolean;
  background?: Background;
  margin?: MarginProps;
  grid?: GridProps;
  axis: {
    top?: AxisProps;
    right?: AxisProps;
    bottom?: AxisProps;
    left?: AxisProps;
  };
  legend?: React.ReactNode;
  styleConfig?: DeepPartial<CartesianStyleConfig>;
  otherProps?: Record<string, unknown>;
  children?: React.ReactNode;
}

export type GridProps = {
  hideRows?: boolean;
  hideColumns?: boolean;
  tickRows?: number;
  tickColumns?: number;
  background?: Background;
  otherProps?: Record<string, unknown>;
}

export type AxisProps = {
  domain: Array<string | number>;
  scaleType?: ScaleType;
  label?: string;
  range?: [number, number];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  numTicks?: number;
  hideTicks?: boolean;
  hideTickLabel?: boolean;
  hideAxisLine?: boolean;
  hideZero?: boolean;
  tickFormat?: TickFormatter<NumberValue | string | Date>;
  otherProps?: Record<string, unknown>;
}

export const CartesianBase = ({
  data = [],
  metadata,
  theme = 'light',
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
  legend,
  styleConfig,
  otherProps,
  children,
}: CartesianBaseProps) => {
  const cartesianConfig = useMemo(() => {
    const cConfig = getCartesianStyleConfigFromTheme(theme);
    return _.merge(cConfig, styleConfig);
  }, [styleConfig, theme]);

  const {
    linearGradient: lgStyle,
    grid: gStyle,
    axis: aStyle,
    legend: lStyle,
    viewport: vStyle,
  } = cartesianConfig;

  const { from, to } = _.merge(lgStyle.background, background);
  const { from: gridFrom, to: gridTo } = { ...gStyle.background, ...grid.background };

  const {
    top, right, bottom, left,
  } = axis;

  const { hideRows, hideColumns } = grid;
  const hasRows = !hideRows && (left || right);
  const hasCols = !hideColumns && (bottom || top);

  const ref = useRef(null);
  const size = useSize(ref);

  const refLegend = useRef(null);
  const sizeLegend = useSize(refLegend);

  const w = size ? size.width : width;
  const h = size ? size.height : height;

  const legendH = sizeLegend?.height ?? 0;

  const dynamicWidth = preventResponsive ? width : w;
  const dynamicHeight = preventResponsive ? height : h;

  const dynamicStyle: CSSProperties = {
    '--static-width': `${dynamicWidth}px`,
    '--static-height': `${dynamicHeight}px`,
    '--legend-width': `calc(100% - ${margin.left + margin.right}px)`,
    '--legend-top': `calc(100% - ${legendH + margin.bottom}px)`,
    '--legend-left': `${margin.left}px`,
    '--legend-padding': lStyle.padding,
  };

  const axisConfig = useMemo(() => computeAxisConfig({
    top,
    right,
    bottom,
    left,
  },
  aStyle), [aStyle, bottom, left, right, top]);

  const heading = title ? hStyle.height : 0;

  const mr = margin.right * (right ? 1 : 2);
  const ml = margin.left * (left ? 1 : 2);

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const xMax = dynamicWidth - ml - mr - vOff;

  const topTickLabelOffset = top ? handleVerticalTickLabelOffset(xMax, 'top', top, cartesianConfig) : 0;
  const bottomTickLabelOffset = bottom ? handleVerticalTickLabelOffset(xMax, 'bottom', bottom, cartesianConfig) : 0;

  const mt = margin.top * (top ? 1 : 2) + heading + topTickLabelOffset;
  const mb = margin.bottom * (bottom ? 1 : 2) + legendH + bottomTickLabelOffset;

  const yMax = dynamicHeight - mt - mb - hOff;

  const tPos = mt + tOff;
  const rPos = ml + lOff + xMax;
  const bPos = mt + tOff + yMax;
  const lPos = ml + lOff;

  const allAxis = computeAllAxisProperties({
    top,
    right,
    bottom,
    left,
    maxRangeX: xMax,
    maxRangeY: yMax,
    positionTop: tPos,
    positionRight: rPos,
    positionBottom: bPos,
    positionLeft: lPos,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className={styles.Wrapper}
      data-theme={theme}
      data-responsive={!preventResponsive}
      ref={ref}
      style={dynamicStyle}
    >
      <svg
        width={dynamicWidth}
        height={dynamicHeight}
        viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
        {...otherProps}
      >
        <LinearGradient id="cartesian-container" from={from} to={to} />
        <LinearGradient id="cartesian-grid-background" from={gridFrom} to={gridTo} />

        <rect
          x={0}
          y={0}
          width={dynamicWidth}
          height={dynamicHeight}
          fill="url(#cartesian-container)"
          rx={0}
          strokeWidth={1}
          stroke={theme === 'light' ? 'lightgray' : 'slategray'}
        />

        <Headings
          theme={theme}
          title={title}
          subtitle={subtitle}
          top={headings?.top ?? 40}
          left={headings?.left ?? ml}
          config={headings?.config}
        />

        <Group>
          <rect
            x={lPos}
            y={tPos}
            width={xMax}
            height={yMax}
            fill="url(#cartesian-grid-background)"
          />

          {hasRows && (
            <GridRows
              top={tPos}
              left={lPos}
              scale={allAxis.left?.scale ?? allAxis.right!.scale}
              width={xMax}
              numTicks={grid?.tickRows}
              offset={gStyle.rows?.offset}
              fill={gStyle.rows?.fill}
              stroke={gStyle.rows?.stroke}
              strokeOpacity={gStyle.rows?.strokeOpacity}
              strokeWidth={gStyle.rows?.strokeWidth}
              strokeDasharray={gStyle.rows?.strokeDasharray}
              lineStyle={gStyle.rows?.lineStyle}
              {...grid.otherProps}
            />
          )}

          {hasCols && (
            <GridColumns
              top={tPos}
              left={lPos}
              scale={allAxis.bottom?.scale ?? allAxis.top!.scale}
              height={yMax}
              numTicks={grid?.tickColumns}
              offset={gStyle.columns?.offset}
              fill={gStyle.columns?.fill}
              stroke={gStyle.columns?.stroke}
              strokeOpacity={gStyle.columns?.strokeOpacity}
              strokeWidth={gStyle.columns?.strokeWidth}
              strokeDasharray={gStyle.columns?.strokeDasharray}
              lineStyle={gStyle.columns?.lineStyle}
              {...grid.otherProps}
            />
          )}

          {Object.values(allAxis)
            .filter((a): a is AxisType => !!a)
            .map(a => (
              <Axis
                key={a.orientation}
                orientation={a.orientation}
                scale={a.scale}
                top={a.top}
                left={a.left}
                numTicks={handleTickNumber(xMax, yMax, a, vStyle)}
                tickLength={axisConfig.style.tickLineProps.length}
                tickLabelProps={v => ({
                  ...axisConfig.style.tickLabelProps,
                  ...axisConfig[a.orientation].tickLabelProps,
                  ...handleVerticalTickLabelTransform(
                    v,
                    hasVerticalTickLabel(xMax, a.orientation, a, vStyle),
                    a,
                  ),
                })}
                tickLineProps={axisConfig.style.tickLineProps}
                label={a.label}
                labelOffset={
                axisConfig[a.orientation].labelOffset
                + handleVerticalTickLabelOffset(xMax, a.orientation, a, cartesianConfig)
              }
                labelProps={{
                  ...axisConfig.style.labelProps,
                  ...axisConfig[a.orientation].labelProps,
                }}
                tickFormat={handleTickFormat(a) as TickFormatter<string | NumberValue | Date> | undefined}
                stroke={axisConfig.style.axisLineProps.stroke}
                strokeDasharray={axisConfig.style.axisLineProps.strokeDasharray}
                strokeWidth={axisConfig.style.axisLineProps.strokeWidth}
                hideAxisLine={a.hideAxisLine}
                hideTicks={a.hideTicks}
                hideZero={a.hideZero}
                {...a.otherProps}
              />
            ))}

          {metadata?.type === Charts.LINE_CHART && (
            <Lines
              theme={theme}
              data={data}
              metadata={metadata}
              topPosition={tPos}
              leftPosition={lPos}
              maxWidth={xMax}
              maxHeight={yMax}
              axis={allAxis}
            />
          )}

          {children}
        </Group>

      </svg>

      {legend && (
        <div ref={refLegend} className={styles.Legend}>
          {legend}
        </div>
      )}
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

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
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import {
  NumberValue, ScaleBand, ScaleLinear, ScaleTime,
} from '@visx/vendor/d3-scale';
import { useSize } from 'ahooks';
import _ from 'lodash';
import {
  CSSProperties, useCallback, useMemo, useRef,
} from 'react';

import { headingsStyleConfig as hStyle } from '../../style-config';
import { ThemeVariants } from '../../types';
import { AxisOrientation } from '../../types/axis';
import { CartesianStyleConfig, MarginProps } from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts, Data, DeepPartial, ScaleType,
} from '../../types/main';
import {
  computeAllAxisProperties, computeAxisConfig, manageTickFormat, manageTickNumber,
} from '../../utils/axis';
import { getCartesianStyleConfigFromTheme } from '../../utils/colors';
import { Headings, HeadingsProps } from '../headings';
import { LineChartMetadata } from '../line-chart/line-chart';
import { Lines } from '../shapes';
import { Tooltip } from '../tooltip';
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
  background?: Background;
  margin?: MarginProps;
  grid?: GridProps;
  top?: AxisProps;
  right?: AxisProps;
  bottom?: AxisProps;
  left?: AxisProps;
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
  otherProps?: Record<string, unknown>;
}

export type AxisProps = {
  domain: Array<string | number>;
  scaleType: ScaleType;
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

export type Axis = {
  orientation: AxisOrientation;
  top: number;
  left: number;
  scale: ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number>;
} & AxisProps

export const CartesianBase = ({
  data = [],
  metadata,
  theme = 'light',
  width = 800,
  height = 600,
  preventResponsive,
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
  top,
  right,
  bottom,
  left,
  legend,
  styleConfig,
  otherProps,
  children,
}: CartesianBaseProps) => {
  const {
    linearGradient: lgStyle,
    grid: gStyle,
    axis: aStyle,
    legend: lStyle,
  } = useMemo(() => {
    const cConfig = getCartesianStyleConfigFromTheme(theme);
    return _.merge(cConfig, styleConfig);
  }, [styleConfig, theme]);

  const { from, to } = _.merge(lgStyle.background, background);

  const { hideRows: hasRows, hideColumns: hasCols } = grid;

  const ref = useRef(null);
  const size = useSize(ref);

  const w = size ? size.width : width;
  const h = size ? size.height : height;

  const hasVerticalTickLabel = (width: number, orientation: AxisOrientation, axis?: AxisProps) => {
    if (axis) {
      const { domain, scaleType, numTicks } = axis;
      const isLabel = scaleType === 'label';
      const isTime = scaleType === 'time';
      const isHorizontal = orientation === 'bottom' || orientation === 'top';
      if (isHorizontal) {
        let ticks = numTicks ?? domain.length;
        let ratio;
        if (isLabel) {
          ratio = width / ticks;
        }

        if (isTime) {
          ticks = _.uniq(domain).length;
          ratio = width / ticks;
        }

        console.log(orientation, width, ticks, ratio);
      }
    }

    return false;
  };

  console.log('bottom:', hasVerticalTickLabel(w, 'bottom', bottom), 'top', hasVerticalTickLabel(w, 'top', top));

  const refLegend = useRef(null);
  const sizeLegend = useSize(refLegend);

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

  const viewport = {
    xs: _.inRange(dynamicWidth, 0, 480),
    sm: _.inRange(dynamicWidth, 480, 768),
    lg: dynamicWidth >= 768,
  };
  console.log('viewport',
    Object.entries(viewport).filter(arr => arr[1])[0][0]);

  const axisConfig = useMemo(() => computeAxisConfig({
    top,
    right,
    bottom,
    left,
  },
  aStyle), [aStyle, bottom, left, right, top]);

  const heading = title ? hStyle.height : 0;

  const mt = margin.top * (top ? 1 : 2) + heading;
  const mr = margin.right * (right ? 1 : 2);
  const mb = margin.bottom * (bottom ? 1 : 2) + legendH;
  const ml = margin.left * (left ? 1 : 2);

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const xMax = dynamicWidth - ml - mr - vOff;
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

  /** start of tooltip logic */
  const {
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const { containerRef, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 10,
  });

  const handleMouseMove = useCallback((event: any, datum: any) => {
    const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
    const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
    showTooltip({
      tooltipLeft: containerX ?? 0,
      tooltipTop: containerY ?? 0,
      tooltipData: datum,
    });
  }, [containerBounds.left, containerBounds.top, showTooltip]);

  /** end of tooltip logic */

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
        ref={containerRef}
        onMouseMove={e => handleMouseMove(e, 'test')}
        onMouseOut={hideTooltip}
        {...otherProps}
      >
        <LinearGradient id="cartesian" from={from} to={to} />

        <rect
          x={0}
          y={0}
          width={dynamicWidth}
          height={dynamicHeight}
          fill="url(#cartesian)"
          rx={8}
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
          {!hasRows && (left || right) && (
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

          {!hasCols && (top || bottom) && (
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

          {Object.values(allAxis).filter((a): a is Axis => !!a).map(a => (
            <Axis
              key={a.orientation}
              orientation={a.orientation}
              scale={a.scale}
              top={a.top}
              left={a.left}
              numTicks={manageTickNumber(a, xMax, yMax)}
              tickLength={axisConfig.style.tickLineProps.length}
              tickLabelProps={{
                ...axisConfig.style.tickLabelProps,
                ...axisConfig[a.orientation].tickLabelProps,
              }}
              tickLineProps={axisConfig.style.tickLineProps}
              label={a.label}
              labelOffset={axisConfig[a.orientation].labelOffset}
              labelProps={{
                ...axisConfig.style.labelProps,
                ...axisConfig[a.orientation].labelProps,
              }}
              tickFormat={manageTickFormat(a) as TickFormatter<string | NumberValue | Date> | undefined}
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
              data={data}
              metadata={metadata}
              topPosition={tPos}
              leftPosition={lPos}
              top={allAxis.top}
              right={allAxis.right}
              bottom={allAxis.bottom}
              left={allAxis.left}
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

      {/** TODO: to be removed from here, only for debugging purpose */}
      <Tooltip
        theme={theme}
        isOpen={tooltipOpen}
        top={tooltipTop}
        left={tooltipLeft}
      >
        <p style={{ fontSize: '14px' }}><strong>{`Tooltip ${tooltipData as any}`}</strong></p>
        <p style={{ fontSize: '12px' }}><span>{`top: ${(tooltipTop ?? 0).toFixed()}px`}</span></p>
        <p style={{ fontSize: '12px' }}><span>{`left: ${(tooltipLeft ?? 0).toFixed()}px`}</span></p>
      </Tooltip>

    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';


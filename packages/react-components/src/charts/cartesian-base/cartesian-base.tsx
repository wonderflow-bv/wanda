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

import { Headings, HeadingsProps } from '../headings';
import { headingsStyleConfig as hStyle } from '../style-config';
import { Tooltip } from '../tooltip';
import { ThemeVariants } from '../types';
import { AxisOrientation } from '../types/axis';
import { CartesianStyleConfig, MarginProps } from '../types/cartesian';
import { Background } from '../types/linear-gradient';
import { DeepPartial } from '../types/main';
import { computeAxisConfig, scaleDomainToAxis } from '../utils/axis';
import { getCartesianStyleConfigFromTheme } from '../utils/colors';
import styles from './cartesian-base.module.css';

export type CartesianBaseProps = {
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
  scaleType: 'linear' | 'label' | 'time';
  label?: string;
  range?: [number, number];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  numTicks?: number;
  hideAxisLine?: boolean;
  hideTicks?: boolean;
  hideZero?: boolean;
  tickFormat?: TickFormatter<NumberValue | string | Date>;
  otherProps?: Record<string, unknown>;
}

export type Axis = {
  orientation: AxisOrientation;
  top: number;
  left: number;
  axis: AxisProps | undefined;
  valueScale: ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number> | undefined;
}

export const CartesianBase = ({
  theme = 'light',
  width = 800,
  height = 600,
  preventResponsive,
  background,
  margin = {
    top: 32,
    right: 32,
    bottom: 32,
    left: 32,
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
  styleConfig,
  otherProps,
  children,
}: CartesianBaseProps) => {
  const {
    linearGradient: lgStyle,
    grid: gStyle,
    axis: aStyle,
  } = useMemo(() => {
    const cConfig = getCartesianStyleConfigFromTheme(theme);
    return _.cloneDeep(_.merge(cConfig, styleConfig));
  }, [styleConfig, theme]);

  const { from, to } = _.merge(lgStyle.background, background);

  const { hideRows: hasRows, hideColumns: hasCols } = grid;

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = preventResponsive ? width : (size?.width ?? width);
  const dynamicHeight = preventResponsive ? height : (size?.height ?? height);

  const dynamicStyle: CSSProperties = {
    '--static-width': `${dynamicWidth}px`,
    '--static-height': `${dynamicHeight}px`,
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

  const tm = margin.top * (top ? 1 : 2) + heading;
  const rm = margin.right * (right ? 1 : 2);
  const bm = margin.bottom * (bottom ? 1 : 2);
  const lm = margin.left * (left ? 1 : 2);

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const xMax = dynamicWidth - lm - rm - vOff;
  const yMax = dynamicHeight - tm - bm - hOff;

  const tPos = tm + tOff;
  const rPos = lm + lOff + xMax;
  const bPos = tm + tOff + yMax;
  const lPos = lm + lOff;

  const topScale = useMemo(() => top && scaleDomainToAxis({ ...top, range: [0, xMax] }), [top, xMax]);
  const rightScale = useMemo(() => right && scaleDomainToAxis({ ...right, range: [yMax, 0] }), [right, yMax]);
  const bottomScale = useMemo(() => bottom && scaleDomainToAxis({ ...bottom, range: [0, xMax] }), [bottom, xMax]);
  const leftScale = useMemo(() => left && scaleDomainToAxis({ ...left, range: [yMax, 0] }), [left, yMax]);

  const allAxis: Axis[] = [
    {
      orientation: 'top',
      top: tPos,
      left: lPos,
      axis: top,
      valueScale: topScale,
    },
    {
      orientation: 'right',
      top: tPos,
      left: rPos,
      axis: right,
      valueScale: rightScale,
    },
    {
      orientation: 'bottom',
      top: bPos,
      left: lPos,
      axis: bottom,
      valueScale: bottomScale,
    },
    {
      orientation: 'left',
      top: tPos,
      left: lPos,
      axis: left,
      valueScale: leftScale,
    },
  ];

  /** TODO: tooltip logic to be removed from here, only for debugging purpose */

  const {
    tooltipLeft,
    tooltipTop,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tooltipOpen,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const { containerRef, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 50,
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
          left={headings?.left ?? lm}
          config={headings?.config}
        />

        <Group>
          {!hasRows && (left || right) && (
            <GridRows
              top={tPos}
              left={lPos}
              scale={leftScale ?? rightScale!}
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
              scale={bottomScale ?? topScale!}
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

          {allAxis.filter(a => a.axis).map(a => (
            <Axis
              key={a.orientation}
              orientation={a.orientation}
              scale={a.valueScale!}
              top={a.top}
              left={a.left}
              numTicks={a.axis!.numTicks}
              tickLength={axisConfig.style.tickLineProps.length}
              tickLabelProps={{
                ...axisConfig.style.tickLabelProps,
                ...axisConfig[a.orientation].tickLabelProps,
              }}
              tickLineProps={axisConfig.style.tickLineProps}
              label={a.axis!.label}
              labelOffset={axisConfig[a.orientation].labelOffset}
              labelProps={{
                ...axisConfig.style.labelProps,
                ...axisConfig[a.orientation].labelProps,
              }}
              tickFormat={a.axis!.tickFormat}
              {...a.axis!.otherProps}
              stroke={axisConfig.style.axisLineProps.stroke}
              strokeDasharray={axisConfig.style.axisLineProps.strokeDasharray}
              strokeWidth={axisConfig.style.axisLineProps.strokeWidth}
              hideAxisLine={a.axis?.hideAxisLine}
              hideTicks={a.axis?.hideTicks}
              hideZero={a.axis?.hideZero}
            />
          ))}

          {children}
        </Group>
      </svg>

      {/** TODO: to be removed from here, only for debugging purpose */}
      <Tooltip
        theme={theme}
        isOpen={tooltipOpen}
        top={tooltipTop}
        left={tooltipLeft}
      >
        <p style={{ fontSize: '14px' }}><strong>{`Tooltip ${tooltipData as any}`}</strong></p>
        <p style={{ fontSize: '12px' }}><span>{`top: ${(tooltipTop ?? 0).toFixed() as any}px`}</span></p>
        <p style={{ fontSize: '12px' }}><span>{`left: ${(tooltipLeft ?? 0).toFixed() as any}px`}</span></p>
      </Tooltip>

    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';


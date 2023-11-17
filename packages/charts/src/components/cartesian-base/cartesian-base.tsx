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

import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { useSize } from 'ahooks';
import _ from 'lodash';
import {
  CSSProperties,
  useMemo, useRef,
} from 'react';

import { useStyleConfigContext } from '../../providers';
import { CartesianProvider } from '../../providers/cartesian';
import { useDataContext } from '../../providers/data';
import { useThemeContext } from '../../providers/theme';
import { headingsStyleConfig as hStyle, themes } from '../../style-config';
import {
  AxisProps, CartesianStyleConfig, GridProps, MarginProps,
} from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts,
  DeepPartial,
} from '../../types/main';
import {
  computeAllAxisProperties, computeAxisConfig,
  handleVerticalTickLabelOffset,
  inferScaleTypeFromDomain,
} from '../../utils/axis';
import { getCartesianStyleConfigFromTheme } from '../../utils/colors';
import { Headings, HeadingsProps } from '../headings';
import { Lines } from '../shapes';
import styles from './cartesian-base.module.css';
import { CartesianBaseAxis } from './cartesian-base-axis';
import { CartesianBaseGrid } from './cartesian-base-grid';
import { CartesianBaseLegend } from './cartesian-base-legend';

export type CartesianBaseProps = {
  title?: string;
  subtitle?: string;
  headings?: Pick<HeadingsProps, 'top'| 'left'| 'config'>;
  width?: number;
  height?: number;
  preventResponsive?: boolean;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  background?: Background;
  margin?: MarginProps;
  grid?: GridProps;
  axis: {
    top?: AxisProps;
    right?: AxisProps;
    bottom?: AxisProps;
    left?: AxisProps;
  };
  hideLegend?: boolean;
  customLegend?: React.ReactNode;
  styleConfig?: DeepPartial<CartesianStyleConfig>;
  otherProps?: Record<string, any>;
}

export const CartesianBase: React.FC<CartesianBaseProps> = ({
  width = 800,
  height = 600,
  preventResponsive,
  isLoading = false,
  emptyState,
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
  customLegend,
  hideLegend = false,
  styleConfig,
  otherProps,
}: CartesianBaseProps) => {
  const theme = useThemeContext();
  const { legend: lStyle } = useStyleConfigContext();
  const { metadata } = useDataContext();

  const cartesianConfig = useMemo(() => {
    const cConfig = getCartesianStyleConfigFromTheme(theme);
    return _.merge(cConfig, styleConfig);
  }, [styleConfig, theme]);

  const {
    axis: aStyle,
  } = cartesianConfig;

  const { from, to } = _.merge(themes[theme].background, background);

  const {
    top, right, bottom, left,
  } = axis;

  if (top) top.scaleType = inferScaleTypeFromDomain(top.domain, top.scaleType);
  if (right) right.scaleType = inferScaleTypeFromDomain(right.domain, right.scaleType);
  if (bottom) bottom.scaleType = inferScaleTypeFromDomain(bottom.domain, bottom.scaleType);
  if (left) left.scaleType = inferScaleTypeFromDomain(left.domain, left.scaleType);

  const ref = useRef(null);
  const size = useSize(ref);

  const refLegend = useRef(null);
  const sizeLegend = useSize(refLegend);

  const w = size ? size.width : width;
  const h = size ? size.height : height;

  const legendH = hideLegend ? 0 : (sizeLegend?.height ?? 0);

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

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const heading = title ? hStyle.height : 0;

  const mr = margin.right * (right ? 1 : 2);
  const ml = margin.left * (left ? 1 : 2);

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

  const isEmpty = !isLoading && !!emptyState;
  const isReady = !isLoading && !emptyState;

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

        <rect
          x={0}
          y={0}
          width={dynamicWidth}
          height={dynamicHeight}
          fill="url(#cartesian-container)"
          rx={0}
          strokeWidth={0}
          stroke=""
        />

        <Headings
          title={title}
          subtitle={subtitle}
          top={headings?.top ?? 40}
          left={headings?.left ?? ml}
          config={headings?.config}
        />

        {isLoading && (
          <Group top={dynamicHeight / 2} left={dynamicWidth / 2}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="-10" y="-30" enableBackground="new 0 0 100 100" xmlSpace="preserve">
              <rect fill="#454545" width="10" height="100" rx="4" transform="translate(0) rotate(180 5 50)">
                <animate attributeName="height" attributeType="XML" dur="1.1s" values="30; 100; 30" repeatCount="indefinite" />
              </rect>
              <rect x="17" fill="#454545" width="10" height="100" rx="4" transform="translate(3) rotate(180 20 50)">
                <animate attributeName="height" attributeType="XML" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
              </rect>
              <rect x="40" fill="#454545" width="10" height="100" rx="4" transform="translate(6) rotate(180 38 50)">
                <animate attributeName="height" attributeType="XML" dur="1.15s" values="30; 100; 30" repeatCount="indefinite" begin="0.3s" />
              </rect>
              <rect x="60" fill="#454545" width="10" height="100" rx="4" transform="translate(9) rotate(180 55 50)">
                <animate attributeName="height" attributeType="XML" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.5s" />
              </rect>
              <rect x="80" fill="#454545" width="10" height="100" rx="4" transform="translate(12) rotate(180 72 50)">
                <animate attributeName="height" attributeType="XML" dur="1.0s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
              </rect>
            </svg>
          </Group>
        )}
        {isEmpty && emptyState}

        {isReady && (
          <Group>
            <CartesianBaseGrid
              left={lPos}
              top={tPos}
              scaleRow={allAxis.left?.scale ?? allAxis.right!.scale}
              scaleCols={allAxis.bottom?.scale ?? allAxis.top!.scale}
              maxWidth={xMax}
              maxHeight={yMax}
              hideRows={grid.hideRows}
              hideColumns={grid.hideColumns}
              tickRows={grid.tickRows}
              tickColumns={grid.tickColumns}
              background={grid.background}
              otherProps={grid.otherProps}
            />

            <CartesianBaseAxis
              maxWidth={xMax}
              maxHeight={yMax}
              axis={allAxis}
              axisConfig={axisConfig}
            />

            <CartesianProvider
              position={{
                top: tPos,
                right: rPos,
                bottom: bPos,
                left: lPos,
              }}
              maxWidth={xMax}
              maxHeight={yMax}
              axis={allAxis}
            >
              {metadata?.type === Charts.LINE_CHART && <Lines />}
            </CartesianProvider>
          </Group>
        )}
      </svg>

      {isReady && (
        <CartesianBaseLegend
          customLegend={customLegend}
          hideLegend={hideLegend}
          ref={refLegend}
        />
      )}

    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

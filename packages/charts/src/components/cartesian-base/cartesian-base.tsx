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
import { AxisOrientation } from '../../types';
import {
  AxisProps, CartesianStyleConfig, GridProps, MarginProps,
} from '../../types/cartesian';
import { Background } from '../../types/linear-gradient';
import {
  Charts,
  DeepPartial,
} from '../../types/main';
import {
  computeAllAxisProperties, computeAxisStyleConfig,
  handleVerticalTickLabelOffset,
} from '../../utils/axis';
import { Headings, HeadingsProps } from '../headings';
import { Loader } from '../loader';
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
  axis: Record<AxisOrientation, AxisProps | undefined>;
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
  const { cartesian: cStyle } = useStyleConfigContext();
  const { metadata } = useDataContext();

  const cartesianConfig = _.merge(cStyle, styleConfig);
  const { axis: aStyle, legend: lStyle } = cartesianConfig;
  const { from, to } = _.merge(themes[theme].background, background);

  const ref = useRef(null);
  const size = useSize(ref);

  const refLegend = useRef(null);
  const sizeLegend = useSize(refLegend);

  const legendHeight = hideLegend ? 0 : (sizeLegend?.height ?? 0);
  const headingHeight = title ? hStyle.height : 0;

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

  const axisConfig = useMemo(() => computeAxisStyleConfig(axis, aStyle), [aStyle, axis]);

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

  const mt = margin.top * (top ? 1 : 2) + headingHeight + topTickLabelOffset;
  const mb = margin.bottom * (bottom ? 1 : 2) + legendHeight + bottomTickLabelOffset;

  const yMax = dynamicHeight - mt - mb - hOff;

  const dimension = {
    maxWidth: xMax,
    maxHeight: yMax,
  };

  const position = {
    top: mt + tOff,
    right: ml + lOff + xMax,
    bottom: mt + tOff + yMax,
    left: ml + lOff,
  };

  const allAxis = computeAllAxisProperties(axis, dimension, position);

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
          stroke="none"
        />

        <Headings
          title={title}
          subtitle={subtitle}
          top={headings?.top ?? 40}
          left={headings?.left ?? ml}
          config={headings?.config}
        />

        {isLoading && (
          <Loader
            top={position.top}
            left={0}
            width={dynamicWidth}
            height={dimension.maxHeight}
          />
        )}

        {isEmpty && emptyState}

        {isReady && (
          <Group>
            <CartesianBaseGrid
              position={position}
              dimension={dimension}
              scaleRow={allAxis.left?.scale ?? allAxis.right!.scale}
              scaleCols={allAxis.bottom?.scale ?? allAxis.top!.scale}
              hideRows={grid.hideRows}
              hideColumns={grid.hideColumns}
              tickRows={grid.tickRows}
              tickColumns={grid.tickColumns}
              background={grid.background}
              otherProps={grid.otherProps}
            />

            <CartesianBaseAxis
              dimension={dimension}
              axis={allAxis}
              axisConfig={axisConfig}
            />

            <CartesianProvider
              position={position}
              dimension={dimension}
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

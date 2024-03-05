import { Group } from '@visx/group';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';
import { getBarSizeAndPosition, getBarThickness } from '@/utils';

import {
  useCartesianContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { sortBarsBy } from '../../../utils';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsOverlay = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();

  const {
    data,
    isHorizontal,
    overlay,
    sortBy,
    hasBackgroundOverlay,
    overlayAxis,
    hasOverlay,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
    fixedBarSize,
    style,
  } = useBars();

  const { bar: barStyle, background, maxSize } = style;
  const bgColor = themes[theme].bars.backgroundColor;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!hasOverlay) return null;

  if (!isHorizontal) {
    return (
      <BarGroupHorizontal
        data={data}
        keys={overlay.dataKey!}
        width={maxWidth}
        y0={X0Y0}
        y0Scale={scaleXY0}
        y1Scale={scaleXY1}
        xScale={overlayAxis.scale}
        color={(_, i) => overlay.colors![i]}
      >
        {barGroups => barGroups.map((barGroup) => {
          const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

          return (
            <Group key={_.uniqueId()} top={barGroup.y0}>
              {sortedBars.map((bar) => {
                const { x, width } = getBarSizeAndPosition(bar, overlayAxis, isHorizontal);
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);

                return (
                  <Group key={_.uniqueId()}>
                    {hasBackgroundOverlay && (
                      <Bar
                        className={dynamicClassName(overLegend, bar.key)}
                        x={0}
                        y={bar.y}
                        width={maxWidth}
                        height={thickness}
                        fill={bgColor}
                        opacity={background.opacity}
                        rx={background.rx}
                      />
                    )}

                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={x}
                      y={bar.y}
                      width={width}
                      height={thickness}
                      fill={bar.color}
                      rx={barStyle.rx}
                      opacity={barStyle.opacity}
                      onClick={() => ({})}
                    />
                  </Group>
                );
              })}
            </Group>
          );
        })
          }
      </BarGroupHorizontal>
    );
  }

  return (
    <BarGroup
      data={data}
      keys={overlay.dataKey!}
      height={maxHeight}
      x0={X0Y0}
      x0Scale={scaleXY0}
      x1Scale={scaleXY1}
      yScale={overlayAxis.scale}
      color={(_, i) => overlay.colors![i]}
    >
      {barGroups => barGroups.map((barGroup) => {
        const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {sortedBars.map((bar) => {
              const { y, height } = getBarSizeAndPosition(bar, overlayAxis, isHorizontal);
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);

              return (
                <Group key={_.uniqueId()}>
                  { hasBackgroundOverlay && (
                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={bar.x}
                      y={0}
                      width={thickness}
                      height={maxHeight}
                      fill={bgColor}
                      opacity={background.opacity}
                      rx={background.rx}
                    />
                  )}

                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    x={bar.x}
                    y={y}
                    width={thickness}
                    height={height}
                    fill={bar.color}
                    opacity={barStyle.opacity}
                    rx={barStyle.rx}
                    onClick={() => ({})}
                  />
                </Group>
              );
            })}
          </Group>
        );
      })}
    </BarGroup>
  );
};

BarsOverlay.displayName = 'BarOverlay';


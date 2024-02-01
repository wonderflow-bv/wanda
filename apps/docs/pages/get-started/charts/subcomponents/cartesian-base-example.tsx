import {
  CartesianBase,
  ThemeProvider,
} from '@wonderflow/charts';
import { Card } from '@wonderflow/react-components';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export const CartesianBaseExample = () => {
  const { theme } = useTheme();

  type Mode = 'dark' | 'light';

  const mode = useMemo(() => {
    if (theme === 'system') {
      const shouldPreferDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      return shouldPreferDark ? 'dark' : 'light';
    }

    return theme as Mode;
  }, [theme]);

  const isDark = mode === 'dark';

  const axis = {
    top: undefined,
    right: undefined,
    bottom: {
      domain: ['1994', '2024'],
      orientation: 'bottom',
      label: 'Bottom Axis',
      scaleType: 'time',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
    },
    left: {
      domain: [0, 1000],
      orientation: 'left',
      scaleType: 'linear',
      label: 'Left Axis',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
      numTicks: 5,
    },
  };

  return (
    <ThemeProvider theme={mode}>
      <Card bordered style={{ backgroundColor: isDark ? '#202227' : undefined }}>
        <CartesianBase
          width={700}
          title="Cartesian Base Component"
          axis={axis as any}
          axisFiltered={axis as any}
          onBrushChange={() => ({})}
        />
      </Card>
    </ThemeProvider>
  );
};

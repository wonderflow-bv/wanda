import { BarChart, CartesianChartLayout } from '@wonderflow/charts';
import { Card } from '@wonderflow/react-components';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export const StackedBarChartExample = () => {
  const { theme } = useTheme();

  const mode = useMemo(() => {
    type Mode = 'dark' | 'light';

    if (theme === 'system') {
      const shouldPreferDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      return shouldPreferDark ? 'dark' : 'light';
    }

    return theme as Mode;
  }, [theme]);

  const data = [
    {
      continent: 'Europe',
      'QN95B Neo QLED 4K TV': 875,
      'Q800A Neo QLED 4K TV': 715,
      'Q60A QLED 4K TV': 184,
      'C2 OLED 4K TV': 428,
      'G2 OLED Evo 4K TV': 137,
      'B2 OLED 4K TV': 117,
      'A95K QD-OLED 4K TV': 738,
      'X95J LED 4K TV': 811,
      'X85J LED 4K TV': 101,
      'R6485Q Mini-LED QLED 4K TV': 47,
      'S546Q 4K QLED TV': 698,
      'S435 4K Roku TV': 308,
    },
    {
      continent: 'America',
      'QN95B Neo QLED 4K TV': 859,
      'Q800A Neo QLED 4K TV': 507,
      'Q60A QLED 4K TV': 123,
      'C2 OLED 4K TV': 322,
      'G2 OLED Evo 4K TV': 146,
      'B2 OLED 4K TV': 132,
      'A95K QD-OLED 4K TV': 605,
      'X95J LED 4K TV': 768,
      'X85J LED 4K TV': 224,
      'R6485Q Mini-LED QLED 4K TV': 61,
      'S546Q 4K QLED TV': 741,
      'S435 4K Roku TV': 259,
    },
    {
      continent: 'Asia',
      'QN95B Neo QLED 4K TV': 633,
      'Q800A Neo QLED 4K TV': 413,
      'Q60A QLED 4K TV': 237,
      'C2 OLED 4K TV': 384,
      'G2 OLED Evo 4K TV': 144,
      'B2 OLED 4K TV': 530,
      'A95K QD-OLED 4K TV': 833,
      'X95J LED 4K TV': 605,
      'X85J LED 4K TV': 316,
      'R6485Q Mini-LED QLED 4K TV': 92,
      'S546Q 4K QLED TV': 616,
      'S435 4K Roku TV': 184,
    },
  ];

  return (
    <Card bordered style={{ backgroundColor: mode === 'dark' ? '#202227' : undefined }}>
      <BarChart
        width={700}
        height={400}
        theme={mode}
        layout={CartesianChartLayout.VERTICAL}
        isStacked
        title="Products performance"
        subtitle="trends by Europe/America/Asia"
        data={data}
        sortBy="descending-value"
        index={{
          dataKey: 'continent',
          label: 'Continent',
          hideAxisLine: true,
        }}
        series={{
          dataKey: [
            'QN95B Neo QLED 4K TV',
            'Q800A Neo QLED 4K TV',
            'Q60A QLED 4K TV',
            'C2 OLED 4K TV',
          ],
          label: 'Product Units',
          hideZero: true,
          hideAxisLine: true,
          hideTicks: true,
        }}
        showLabel
        fixedBarSize
        preventTooltipDisplay
        hidePadding
      />
    </Card>
  );
};

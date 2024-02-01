import { LineChart } from '@wonderflow/charts';
import { Card } from '@wonderflow/react-components';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export const LineChartExample = () => {
  const { theme } = useTheme();

  const mode = useMemo(() => {
    type Mode = 'dark' | 'light';

    if (theme === 'system') {
      const shouldPreferDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      return shouldPreferDark ? 'dark' : 'light';
    }

    return theme as Mode;
  }, [theme]);

  return (
    <Card bordered style={{ backgroundColor: mode === 'dark' ? '#202227' : undefined }}>
      <LineChart
        width={700}
        theme={mode}
        title="Feedback Count"
        subtitle="trends from 2014 to 2023"
        showMarkerLabel
        data={[
          { date: '2014', value1: 81, value2: 33 },
          { date: '2015', value1: 121, value2: 72 },
          { date: '2016', value1: 152, value2: 118 },
          { date: '2017', value1: 211, value2: 180 },
          { date: '2018', value1: 244, value2: 143 },
          { date: '2019', value1: 203, value2: 121 },
          { date: '2020', value1: 240, value2: 133 },
          { date: '2021', value1: 193, value2: 174 },
          { date: '2022', value1: 301, value2: 182 },
          { date: '2023', value1: 298, value2: 201 },
        ]}
        index={{
          dataKey: 'date',
          label: 'Year',
        }}
        series={{
          dataKey: ['value1', 'value2'],
          label: 'Feedback Count',
          rename: (_, i) => (i ? 'ProductB' : 'ProductA'),
          domain: [0, 350],
        }}
        showAverage
        hidePadding
      />
    </Card>
  );
};

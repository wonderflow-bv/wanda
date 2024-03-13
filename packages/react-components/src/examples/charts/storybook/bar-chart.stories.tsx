import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from '@/components';

// import { CartesianChartLayout, BarChart, BarChartProps } from '@wonderflow/charts';
import { BarChart, BarChartProps, CartesianChartLayout } from '../../../../../charts/src';
import {
  channels,
  channelsB,
  feedbackCount, feedbackCountGaps, proCons, products,
} from '../mock-data';
import { positiveNegative } from '../mock-data/positiveNegative';
import { FakeMenu } from './line-chart.stories';
import styles from './sb-charts.module.css';

const story: ComponentMeta<typeof BarChart> = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  args: {
    title: 'Bar Chart',
    subtitle: 'A simple bar chart',
    sortBy: 'as-is',
    // isStacked: false,
    // showLabel: false,
    isLoading: false,
    showAverage: false,
    showTrendline: false,
    showBrush: false,
    showBackground: false,
    hideLegend: false,
    hidePadding: false,
    preventTooltipDisplay: false,
    preventResponsive: false,
    layout: CartesianChartLayout.HORIZONTAL,
    theme: 'light',
    reverseIndex: false,
    mirrorDomains: false,
    fixedBarSize: false,
    data: feedbackCount,
    index: {
      dataKey: 'date',
      label: 'Year',
    },
    series: {
      dataKey: ['feedback count'],
      label: 'Feedback Count',
    },
    overlay: undefined,
    menu: undefined,
  },
  argTypes: {
    layout: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    sortBy: {
      options: ['descending-key', 'ascending-key', 'descending-value', 'ascending-value', 'as-is'],
      control: { type: 'select' },
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof BarChart> = (args: BarChartProps) => <BarChart {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const withOverlay = Template.bind({});
withOverlay.args = {
  subtitle: 'A bar chart with overlay',
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
  },
};

export const withMultipleOverlay = Template.bind({});
withMultipleOverlay.args = {
  subtitle: 'A group bar chart with one series and two overlay',
  series: {
    dataKey: ['feedback count'],
    label: 'Feedback Count',
    domain: [0, 12000],
  },
  overlay: {
    dataKey: ['overlay', 'overlayB'],
    rename: ((o, i) => (i === 0 ? 'OverlayA' : o)),
    label: 'Overlay',
    domain: [0, 1],
  },
  data: feedbackCount.slice(11),
};

export const withMultipleSeries = Template.bind({});
withMultipleSeries.args = {
  title: 'Multiple Series',
  subtitle: 'A group bar chart',
  data: proCons,
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    domain: [0, 140],
    dataKey: ['positive', 'negative', 'neutral'],
    label: 'Pros & cons',
    style: [undefined, undefined, { fill: 'gray' }],
  },
};

export const withAverage = Template.bind({});
withAverage.args = {
  subtitle: 'A bar chart with average',
  showAverage: true,
};

export const withTrendline = Template.bind({});
withTrendline.args = {
  subtitle: 'A bar chart with overlay and trendlines',
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
    domain: [0, 1],
  },
  showTrendline: true,
};

export const withCategoriesOnIndex = Template.bind({});
withCategoriesOnIndex.args = {
  title: 'Multiple Series',
  subtitle: 'A line chart with categories on index',
  data: channels,
  index: {
    dataKey: 'channel',
    label: 'Channels',
  },
  series: {
    dataKey: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
    label: 'Feedback count',
  },
};

export const withNestedData = Template.bind({});
withNestedData.args = {
  title: 'Multiple Series',
  subtitle: 'A bar chart rendered from nested data',
  data: channelsB,
  index: {
    dataKey: 'channel',
    label: 'Channels',
  },
  series: {
    dataKey: ['1 star.value', '2 stars.value', '3 stars.value', '4 stars.value', '5 stars.value'],
    label: 'Feedback count',
    domain: [0, 4000],
  },
  overlay: {
    dataKey: ['overlay.value'],
    rename: _ => 'Some KPI',
    label: 'Some KPI',
    domain: [0, 5],
  },
  tooltip: {
    extraSeriesData: (series: any) => `${series.percentage}%`,
    extraOverlayData: (overlay: any) => `${overlay.percentage}%`,
    extraContent: <div>some extra content</div>,
  },
};

export const withBackground = Template.bind({});
withBackground.args = {
  subtitle: 'A bar chart with bars background color',
  series: {
    dataKey: ['feedback count'],
    label: 'Feedback Count',
    showBackground: true,
  },
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
    showBackground: true,
  },
};

export const PositiveAndNegative = Template.bind({});
PositiveAndNegative.args = {
  subtitle: 'A bar chart with positive and negative values',
  data: positiveNegative,
  series: {
    dataKey: ['feedback count'],
    label: 'Feedback Count',
  },
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
  },
  mirrorDomains: true,
};

export const withVerticalFixedBars = Template.bind({});
withVerticalFixedBars.args = {
  subtitle: 'A bar chart with vertical fixed thickness bars',
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
    domain: [0, 1],
  },
  fixedBarSize: true,
  layout: CartesianChartLayout.VERTICAL,
};

export const withMissingData = Template.bind({});
withMissingData.args = {
  data: feedbackCountGaps,
  subtitle: 'A bar line chart with null values',
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
  },
};

export const withCustomBarStyle = Template.bind({});
withCustomBarStyle.args = {
  title: 'Multiple Series',
  subtitle: 'A bar chart with multiple series and custom colors',
  data: proCons,
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    dataKey: ['positive', 'negative', 'neutral'],
    label: 'Pros & cons',
    style: [
      {
        fill: 'slateGray',
      },
      {
        fill: 'salmon',
      },
      {
        fill: 'lightBlue',
      },
    ],
  },
};

export const withBrush = Template.bind({});
withBrush.args = {
  data: products,
  subtitle: 'A bar chart with twelve series',
  sortBy: 'descending-value',
  showBackground: true,
  showBrush: true,
  index: {
    dataKey: 'date',
    label: 'Year',
  },
  series: {
    dataKey: [
      'QN95B Neo QLED 4K TV',
      'Q800A Neo QLED 4K TV',
      'Q60A QLED 4K TV',
      'C2 OLED 4K TV',
      'G2 OLED Evo 4K TV',
      'B2 OLED 4K TV',
      'A95K QD-OLED 4K TV',
      'X95J LED 4K TV',
      'X85J LED 4K TV',
      'R6485Q Mini-LED QLED 4K TV',
      'S546Q 4K QLED TV',
      'S435 4K Roku TV',
    ],
    label: 'Product Units',
    tickFormat: (l: any) => `${l}K`,
    domain: [0, 1000],
    hideZero: true,
  },
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  menu: FakeMenu,
};

const WithinCardTemplate: ComponentStory<typeof BarChart> = (args) => {
  const { theme } = args;
  return (
    <Card
      bordered
      className={styles.Card}
      style={{ backgroundColor: theme === 'dark' ? '#202227' : undefined }}
    >
      <BarChart {...args} />
    </Card>
  );
};

export const WithinCard = WithinCardTemplate.bind({});
WithinCard.args = {
  subtitle: 'A bar chart within a card 75vh and width 100%',
  hidePadding: true,
  theme: 'dark',
};

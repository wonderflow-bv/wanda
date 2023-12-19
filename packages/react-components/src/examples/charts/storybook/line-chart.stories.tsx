import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CartesianChartLayout, LineChart, LineChartProps } from '@wonderflow/charts';

import { Card } from '@/components';

// import { CartesianChartLayout, LineChart, LineChartProps } from '../../../../../charts/src';
import {
  channels, channelsB, feedbackCount, feedbackCountGaps, proCons,
} from '../mock-data';
import styles from './sb-charts.module.css';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    title: 'Line Charts',
    subtitle: 'A trend line chart',
    preventResponsive: false,
    isLoading: false,
    showMarker: false,
    showMarkerLabel: false,
    hideMissingDataConnection: false,
    hideLegend: false,
    hidePadding: false,
    layout: CartesianChartLayout.HORIZONTAL,
    renderAs: 'curves',
    theme: 'light',
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
  },
  argTypes: {
    layout: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    renderAs: {
      options: ['curves', 'lines', 'steps'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof LineChart> = (args: LineChartProps) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const withOverlay = Template.bind({});
withOverlay.args = {
  subtitle: 'A trend line chart with overlay',
  overlay: {
    dataKey: 'overlay',
    label: 'Overlay',
  },
};

export const withMissingData = Template.bind({});
withMissingData.args = {
  data: feedbackCountGaps,
  subtitle: 'A trend line chart with null values',
  overlay: {
    dataKey: 'overlay',
    label: 'Overlay',
  },
};

export const withMultipleSeries = Template.bind({});
withMultipleSeries.args = {
  title: 'Multiple Series',
  subtitle: 'A trend line chart with multiple series',
  data: proCons,
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    domain: [0, 200],
    dataKey: ['positive', 'negative', 'neutral'],
    label: 'Pros & cons',
    style: [undefined, undefined, { stroke: 'gray' }],
  },
};

export const withLabelIndex = Template.bind({});
withLabelIndex.args = {
  title: 'Multiple Series',
  subtitle: 'A line chart with label index',
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
  subtitle: 'A line chart rendered from nested data',
  data: channelsB,
  index: {
    dataKey: 'channel',
    label: 'Channels',
  },
  series: {
    dataKey: ['1 star.value', '2 stars.value', '3 stars.value', '4 stars.value', '5 stars.value'],
    label: 'Feedback count',
    rename: (_: string, i: number) => Array(i + 1).fill('⭐').join(),
  },
  overlay: {
    dataKey: 'overlay.value',
    label: 'TGW',
    domain: [0, 5],
    style: {
      strokeDasharray: '2 4',
    },
  },
  tooltip: {
    extraSeriesData: series => `${series.percentage}%`,
    extraOverlayData: overlay => `${overlay.percentage}%`,
    extraContent: <div>some extra content</div>,
  },
  renderAs: 'lines',
  layout: CartesianChartLayout.VERTICAL,
  showMarker: true,
};

export const withCustomLineStyle = Template.bind({});
withCustomLineStyle.args = {
  title: 'Multiple Series',
  subtitle: 'A trend line chart with multiple series',
  data: proCons,
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    dataKey: ['positive', 'negative', 'neutral'],
    label: 'Pros & cons',
    style: [
      undefined,
      {
        stroke: 'red',
        strokeDasharray: '6 8',
        strokeOpacity: '0.5',
        strokeWidth: '3',
      },
      {
        stroke: 'grey',
        strokeDasharray: '2 4',
        strokeOpacity: '0.8',
        strokeWidth: '1.5',
      },
    ],
  },
};

export const withCustomDomain = Template.bind({});
withCustomDomain.args = {
  subtitle: 'A trend line chart with custom domain',
  series: {
    dataKey: ['feedback count'],
    label: 'Feedback Count',
    domain: [-12000, 12000],
  },
  index: {
    dataKey: 'date',
    label: 'Year',
  },
};

export const withVerticalLayout = Template.bind({});
withVerticalLayout.args = {
  layout: CartesianChartLayout.VERTICAL,
  overlay: {
    dataKey: 'overlay',
    label: 'Overlay',
  },
  index: {
    dataKey: 'date',
    label: 'Year',
  },
  series: {
    dataKey: ['feedback count'],
    label: 'Feedback Count',
  },
};

export const withNoData = Template.bind({});
withNoData.args = {
  data: [],
  title: 'Line Charts',
  subtitle: 'A trend line chart w/o data',
  emptyStateMessage: 'Please select items from the right menu to render the chart.',
};

export const renderAsLines = Template.bind({});
renderAsLines.args = {
  title: 'Multiple Series',
  subtitle: 'A trend line chart rendered with lines',
  data: proCons,
  renderAs: 'lines',
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    domain: [0, 200],
    dataKey: ['positive', 'negative'],
    label: 'Pros & cons',
  },
};

export const renderAsSteps = Template.bind({});
renderAsSteps.args = {
  title: 'Multiple Series',
  subtitle: 'A trend line chart rendered with steps',
  data: proCons,
  renderAs: 'steps',
  index: {
    dataKey: 'date',
    label: 'Time',
  },
  series: {
    domain: [0, 200],
    dataKey: ['positive', 'negative'],
    label: 'Pros & cons',
  },
};

const WithinCardTemplate: ComponentStory<typeof LineChart> = args => (
  <Card
    bordered
    className={styles.Card}
  >
    <LineChart {...args} />
  </Card>
);

export const WithinCard = WithinCardTemplate.bind({});
WithinCard.args = {
  subtitle: 'A trend line chart within a card 75vh and width 100%',
  hidePadding: true,
};

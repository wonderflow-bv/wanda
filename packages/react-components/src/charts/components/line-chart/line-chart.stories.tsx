import { ComponentMeta, ComponentStory } from '@storybook/react';

import { channels, feedbackCount, proCons } from '../../mock-data';
import { CartesianChartLayout } from '../../types';
import { LineChart } from './line-chart';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    title: 'Line Charts',
    subtitle: 'A trend line chart',
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
    showMarker: false,
  },
  argTypes: {},
};

export default story;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

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
        strokeWidth: '2.5',
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

export const withLines = Template.bind({});
withLines.args = {
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

export const withSteps = Template.bind({});
withSteps.args = {
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

export const vertical = Template.bind({});
vertical.args = {
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


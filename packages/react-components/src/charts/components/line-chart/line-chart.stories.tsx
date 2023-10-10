import { ComponentMeta, ComponentStory } from '@storybook/react';

import { feedbackCount, proCons } from '../../mock-data';
import { CartesianChartLayout } from '../../types';
import { LineChart } from './line-chart';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    title: 'Line Charts',
    subtitle: 'A trend line charts',
    data: feedbackCount,
    index: {
      dataKey: 'date',
      label: 'Year',
    },
    series: {
      dataKey: ['value'],
      label: 'Feedback Count',
    },
    overlay: undefined,
    showPoints: false,
  },
  argTypes: {},
};

export default story;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const withOverlay = Template.bind({});
withOverlay.args = {
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
    dataKey: ['positiveValue', 'negativeValue', 'neutralValue'],
    label: 'Pros & cons',
    style: [undefined, undefined, { stroke: 'gray' }],
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
    dataKey: ['positiveValue', 'negativeValue', 'neutralValue'],
    label: 'Pros & cons',
    style: [
      undefined,
      {
        stroke: 'red',
        strokeDasharray: '6 8',
        strokeOpacity: 0.5,
        strokeWidth: 2.5,
      },
      {
        stroke: 'grey',
        strokeDasharray: '2 4',
        strokeOpacity: 0.8,
        strokeWidth: 1.5,
      },
    ],
  },
};

export const withCustomDomain = Template.bind({});
withCustomDomain.args = {
  series: {
    dataKey: ['value'],
    label: 'Feedback Count',
    domain: [-12000, 12000],
  },
  index: {
    dataKey: 'date',
    label: 'Year',
    domain: ['1999-01-01', '2024-01-01'],
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
    dataKey: ['value'],
    label: 'Feedback Count',
  },
};


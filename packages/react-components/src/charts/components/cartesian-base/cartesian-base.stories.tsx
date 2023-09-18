import { ComponentMeta, ComponentStory } from '@storybook/react';

import { feedbackCount } from '../../mock-data';
import { extractPrimitivesFromArray } from '../../utils';
import { CartesianChartLayout } from '../line-chart/line-chart';
import { CartesianBase, Charts } from './cartesian-base';

const story: ComponentMeta<typeof CartesianBase> = {
  title: 'Charts/Cartesian Base',
  component: CartesianBase,
  args: {
    theme: 'light',
    title: 'Chart Title',
    subtitle: 'Subtitle text',
    preventResponsive: false,
    data: [],
    grid: {
      tickColumns: 10,
      tickRows: 10,
    },
    top: {
      domain: ['A', 'B', 'C', 'D', 'E'],
      label: 'Top Label',
      scaleType: 'label',
      paddingOuter: 0,
      paddingInner: 1,
      tickFormat: (v: any) => (`${JSON.stringify(v)} something else`),
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
    },
    right: {
      domain: [0, 0.010],
      label: 'Right Label',
      scaleType: 'linear',
      tickFormat: (v: any) => `${JSON.stringify(v)} $`,
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
    },
    bottom: {
      domain: [new Date('2020-01-01').getTime(), new Date('2022-01-01').getTime()],
      label: 'Bottom Label',
      scaleType: 'time',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
    },
    left: {
      domain: [0, 10000],
      label: 'Left Label',
      scaleType: 'linear',
      hideAxisLine: false,
      hideTickLabel: false,
      hideTicks: false,
    },
    styleConfig: {
      // grid: { rows: { stroke: 'blue' } },
    },
    children: undefined,
  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBase> = args => <CartesianBase {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const TwoAxis = Template.bind({});
TwoAxis.args = {
  grid: {
    hideColumns: true,
    tickColumns: 10,
    tickRows: 5,
    otherProps: {
      strokeDasharray: '3 2',
    },
  },
  top: undefined,
  right: undefined,
  bottom: {
    domain: [new Date('2020-01-01').getTime(), new Date('2020-01-10').getTime()],
    label: 'Time',
    scaleType: 'time',
    numTicks: 10,
  },
  left: {
    domain: [0, 1000],
    label: 'Quantity',
    scaleType: 'linear',
    hideAxisLine: true,
    hideTicks: true,
    hideZero: true,
    numTicks: 10,
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = { theme: 'dark' };

export const WithLegend = Template.bind({});
WithLegend.args = { legend: <ul><li style={{ fontSize: '12px' }}>some legend content here</li></ul> };

export const TestLines = Template.bind({});
TestLines.args = {
  data: feedbackCount,
  metadata: {
    type: Charts.LINE_CHART,
    layout: CartesianChartLayout.HORIZONTAL,
  },
  top: undefined,
  right: undefined,
  bottom: {
    domain: extractPrimitivesFromArray(feedbackCount, 'date') as string[],
    scaleType: 'time',
    label: 'Year',
    numTicks: undefined,
  },
  left: {
    domain: extractPrimitivesFromArray(feedbackCount, 'value') as number[],
    scaleType: 'linear',
    label: 'Feedback Count',
  },
};

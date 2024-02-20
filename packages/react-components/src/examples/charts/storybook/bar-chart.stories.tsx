import { ComponentMeta, ComponentStory } from '@storybook/react';

// import { CartesianChartLayout, BarChart, BarChartProps } from '@wonderflow/charts';
import { BarChart, BarChartProps, CartesianChartLayout } from '../../../../../charts/src';
import {
  feedbackCount,
} from '../mock-data';

const story: ComponentMeta<typeof BarChart> = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  args: {
    title: 'Bar Chart',
    subtitle: 'A quantity bar chart',
    sortBy: 'as-is',
    isStacked: false,
    isLoading: false,
    showLabel: false,
    showAverage: false,
    showTrendline: false,
    showBrush: false,
    hideLegend: false,
    hidePadding: false,
    preventTooltipDisplay: false,
    preventResponsive: false,
    layout: CartesianChartLayout.HORIZONTAL,
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

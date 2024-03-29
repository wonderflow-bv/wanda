import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CartesianChartLayout, LineChart, LineChartProps } from '@wonderflow/charts';

import { Card, Menu } from '@/components';

// import { CartesianChartLayout, LineChart, LineChartProps } from '../../../../../charts/src';
import {
  channels, channelsB, feedbackCount, feedbackCountGaps, proCons, products,
} from '../mock-data';
import styles from './sb-charts.module.css';

export const FakeMenu = (
  <Menu>
    <Menu.Item
      autoFocus
      icon="arrow-right"
      value="1"
      description={<>this is my description</>}
    >
      Sample long menu item
    </Menu.Item>
    <Menu.ItemCheckbox
      onClick={() => ({})}
      checked
      icon="check"
      value="2"
    >
      Checkbox item
    </Menu.ItemCheckbox>
    <Menu.Item value="3" icon="right-from-bracket">
      Item option 3
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item value="4" icon="arrow-down-to-bracket">Even shorter</Menu.Item>
    <Menu.Item value="5" disabled>Really?</Menu.Item>
  </Menu>
);

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    title: 'Line Charts',
    subtitle: 'A trend line chart',
    isLoading: false,
    showMarker: false,
    showMarkerLabel: false,
    showAverage: false,
    showTrendline: false,
    showBrush: false,
    hideMissingDataConnection: false,
    hideLegend: false,
    hidePadding: false,
    preventTooltipDisplay: false,
    preventResponsive: false,
    layout: CartesianChartLayout.HORIZONTAL,
    renderAs: 'curves',
    theme: 'light',
    mirrorDomains: false,
    reverseIndex: false,
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
    dataKey: ['overlay'],
    label: 'Overlay',
  },
};

export const withMultipleOverlay = Template.bind({});
withMultipleOverlay.args = {
  subtitle: 'A trend line chart with overlay',
  overlay: {
    dataKey: ['overlay', 'overlayB'],
    label: 'Overlay',
  },
};

export const withAverage = Template.bind({});
withAverage.args = {
  subtitle: 'A trend line chart with average',
  showAverage: true,
};

export const withTrendline = Template.bind({});
withTrendline.args = {
  subtitle: 'A trend line chart with overlay and trendlines',
  overlay: {
    dataKey: ['overlay'],
    label: 'Overlay',
  },
  showTrendline: true,
};

export const withMissingData = Template.bind({});
withMissingData.args = {
  data: feedbackCountGaps,
  subtitle: 'A trend line chart with null values',
  overlay: {
    dataKey: ['overlay'],
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
  subtitle: 'A line chart rendered from nested data',
  data: channelsB,
  index: {
    dataKey: 'channel',
    label: 'Channels',
  },
  series: {
    dataKey: ['1 star.value', '2 stars.value', '3 stars.value', '4 stars.value', '5 stars.value'],
    extraData: (datum: Record<string, any>) => `${datum.percentage}%`,
    label: 'Feedback count',
    rename: (_: string, i: number | undefined) => Array((i ?? 0) + 1).fill('⭐').join(),
  },
  overlay: {
    dataKey: ['overlay.value'],
    extraData: (datum: Record<string, any>) => `${datum.percentage}%`,
    label: 'TGW',
    domain: [0, 5],
    style: [{
      strokeDasharray: '2 4',
    }],
  },
  tooltipExtraContent: <div>some extra content</div>,
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

export const withBrush = Template.bind({});
withBrush.args = {
  data: products,
  subtitle: 'A trend line chart with twelve series',
  renderAs: 'lines',
  showMarker: true,
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
    dataKey: ['overlay'],
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

export const WithMenu = Template.bind({});
WithMenu.args = {
  menu: FakeMenu,
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

const WithinCardTemplate: ComponentStory<typeof LineChart> = (args) => {
  const { theme } = args;
  return (
    <Card
      bordered
      className={styles.Card}
      style={{ backgroundColor: theme === 'dark' ? '#202227' : undefined }}
    >
      <LineChart {...args} />
    </Card>
  );
};

export const WithinCard = WithinCardTemplate.bind({});
WithinCard.args = {
  subtitle: 'A trend line chart within a card 75vh and width 100%',
  hidePadding: true,
};

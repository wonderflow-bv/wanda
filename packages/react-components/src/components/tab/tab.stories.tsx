/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useMemo, useState } from 'react';

import { Button, Table } from '../..';
import { mockedColumns, mockedData } from '../table/mocked-data';
import { Tab } from './tab';

const story: ComponentMeta<typeof Tab> = {
  title: 'Navigation/Tab',
  component: Tab,
  args: {
    defaultValue: '1',
    dimension: 'regular',
  },
  argTypes: {
    dimension: {
      options: ['regular', 'big'],
      control: { type: 'select' },
    },
  },
};
export default story;

const Template: ComponentStory<typeof Tab> = args => (
  <Tab {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

export const Default = Template.bind({});

export const InitialTab = Template.bind({});
InitialTab.args = {
  defaultValue: '3',
};

export const ProgrammaticTab: ComponentStory<typeof Tab> = () => {
  const [state, setState] = useState('1');

  return (
    <Tab value={state} onValueChange={val => setState(val)}>
      <Tab.Panel value="1" label="Tab 1">
        <p>Tab panel 1</p>
        <Button icon="sun-bright" dimension="small" onClick={() => setState('3')}>Go to tab 3</Button>
      </Tab.Panel>

      <Tab.Panel value="2" label="Tab 2">
        <p>Tab panel 2</p>
        <Button icon="sun-bright" dimension="small" onClick={() => setState('1')}>Go to tab 1</Button>
      </Tab.Panel>

      <Tab.Panel value="3" label="Tab 3">
        <p>Tab panel 3</p>
        <Button icon="sun-bright" dimension="small" onClick={() => setState('2')}>Go to tab 2</Button>
      </Tab.Panel>
    </Tab>
  );
};

export const ChangeEvent = Template.bind({});

ChangeEvent.args = {
  onValueChange: current => alert(`current is ${current}`),
};

export const ConditionalTab = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Tab defaultValue="1">
      <Tab.Panel value="1" label="Tab 1">
        Tab panel 1
      </Tab.Panel>
      <Tab.Panel value="2" label="Tab 2">
        <Button icon="sun-bright" onClick={() => setIsVisible(!isVisible)}>Toggle new tab</Button>
      </Tab.Panel>
      {isVisible && <Tab.Panel value="3" label="Tab 3">Tab panel 3</Tab.Panel>}
    </Tab>
  );
};

export const DisabledTab: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

export const WithIcons: ComponentStory<typeof Tab> = args => (
  <Tab defaultValue="1" {...args}>
    <Tab.Panel icon="star" value="1" label="Tab 1">Panel 1</Tab.Panel>
    <Tab.Panel icon="eye" value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
    <Tab.Panel icon="sun-bright" value="3" label="Tab short 3">Panel 3</Tab.Panel>
    <Tab.Panel icon="moon" disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
    <Tab.Panel icon="magnifying-glass" value="5" label="Tab 5">Panel 5</Tab.Panel>
    <Tab.Panel icon="check" value="6" label="Tab 6">Panel 6</Tab.Panel>
  </Tab>
);

export const WithTables: ComponentStory<typeof Tab> = () => {
  type TableTab = 'Table1' | 'Table2';
  type TablePagination = { pageSize: number; pageIndex: number };
  type Pagination = Record<TableTab, TablePagination>

  const [activeTab, setActiveTab] = useState<TableTab>('Table1');
  const [pagination, setPagination] = useState<Pagination>({
    Table1: {
      pageSize: 5,
      pageIndex: 0,
    },
    Table2: {
      pageSize: 10,
      pageIndex: 0,
    },
  });

  const handleTab = (tab: TableTab) => {
    setActiveTab(tab);
  };

  const handlePagination = ({ pageIndex, pageSize }: TablePagination) => {
    if (pageIndex !== pagination[activeTab].pageIndex
      || pageSize !== pagination[activeTab].pageSize) {
      const newPagination = { ...pagination, [activeTab]: { pageIndex, pageSize } };
      setPagination(newPagination);
    }
  };

  const pageData1 = useMemo(() => {
    const { pageIndex, pageSize } = pagination.Table1;
    const newIndexStart = pageIndex * pageSize;
    const newIndexEnd = (pageIndex * pageSize) + pageSize;

    return mockedData.slice(newIndexStart, newIndexEnd);
  }, [pagination]);

  const pageData2 = useMemo(() => {
    const { pageIndex, pageSize } = pagination.Table2;
    const newIndexStart = pageIndex * pageSize;
    const newIndexEnd = (pageIndex * pageSize) + pageSize;

    return mockedData.slice(newIndexStart, newIndexEnd);
  }, [pagination]);

  return (
    <Tab defaultValue={activeTab} onValueChange={handleTab as ((value: string) => void)}>
      <Tab.Panel value="Table1" label="Table 1">
        <Table
          background="seashell"
          stripes
          showSeparators
          columns={mockedColumns}
          data={pageData1}
          showPagination
          itemsPerPage={pagination.Table1.pageSize}
          initialPageIndex={pagination.Table1.pageIndex}
          onPaginationChange={handlePagination}
          totalRows={mockedData.length}
        />
      </Tab.Panel>

      <Tab.Panel value="Table2" label="Table 2">
        <Table
          background="honeydew"
          stripes
          showSeparators
          columns={mockedColumns}
          data={pageData2}
          showPagination
          itemsPerPage={pagination.Table2.pageSize}
          initialPageIndex={pagination.Table2.pageIndex}
          onPaginationChange={handlePagination}
          totalRows={mockedData.length}
        />
      </Tab.Panel>
    </Tab>
  );
};

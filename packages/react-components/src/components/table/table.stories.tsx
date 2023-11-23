// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import {
  Button, IconButton, Menu, Popover, Stack, Text,
} from '../..';
import { mockedColumns, mockedData, mockedDataWithIds } from './mocked-data';
import { Table } from './table';
import { CustomSortingRule } from './types';

const firstData = {
  firstName: 'Gianni',
  lastName: 'Morandi',
  address: 'Via Roma, 1, Treno',
  uid: 3456789542556789,
  info: 123123.12,
};

const story: ComponentMeta<typeof Table> = {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true },
  },
  args: {
    background: 'white',
    stripes: false,
    selectableRows: false,
    showSeparators: true,
    showHeader: false,
    columns: mockedColumns,
    data: mockedData,
    dataWithIds: mockedDataWithIds,
  },
};

export default story;

const CustomExpandableComponent = ({ data }: { data: any }) => (
  <Stack
    vPadding={16}
    hPadding={16}
    rowGap={32}
  >
    {Object.keys(data).map((item, i) => (
      <div key={item} style={{ background: 'var(--dimmed-1)', padding: 24, minHeight: 50 * (i + 1) }}>
        <Text variant="heading-6">{typeof data[item] === 'string' ? data[item] : null}</Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, nostrum minima, debitis qui magni voluptatum.
      </div>
    ))}
  </Stack>
);

const CustomEmptyComponent = () => (
  <div title="No data to show">
    It seems there is no data to show inside this table. If data should be present,please
    check if columns are visible by using the table controls.
  </div>
);

const Template: ComponentStory<typeof Table> = ({ dataWithIds, ...args }) => (
  <Table
    emptyComponent={<CustomEmptyComponent />}
    onRowExpandChange={rows => console.log(rows)}
    {...args}
  />
);

export const Simple = Template.bind({});

const SelectionTemplate: ComponentStory<typeof Table> = ({ dataWithIds, data, ...args }) => {
  const [tableData, setTableData] = useState(dataWithIds);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const onDelete = (selectedRowIds) => {
    const newTableData = tableData.filter(({ id }) => !selectedRowIds.includes(id));
    setSelectedRowIds([]);
    setTableData(newTableData);
  };

  return (
    <Table
      data={tableData}
      selectedRowIds={selectedRowIds}
      onSelectedRowsChange={setSelectedRowIds}
      selectedActions={
        selectedRowIds => <Button onClick={() => onDelete(selectedRowIds)}>Delete rows</Button>
      }
      emptyComponent={<CustomEmptyComponent />}
      {...args}
    />
  );
};

export const SelectedRows = SelectionTemplate.bind({});
SelectedRows.args = {
  title: 'With selectable rows',
  selectableRows: true,
  showPagination: true,
};

const HidingColumnTemplate: ComponentStory<typeof Table> = ({ dataWithIds, columns, ...args }) => {
  const tableColumns = [
    ...columns,
    {
      id: 'birthday',
      Header: 'Birthday',
      accessor: row => row.birthday,
    },
    {
      id: 'gender',
      Header: 'Gender',
      accessor: row => row.gender,
    },
    {
      id: 'height',
      Header: 'Height',
      accessor: row => row.height,
    },
    {
      id: 'weight',
      Header: 'Weight',
      accessor: row => row.weight,
    },
  ];
  return (
    <Table
      emptyComponent={<CustomEmptyComponent />}
      columns={tableColumns}
      {...args}
    />
  );
};

export const HidingColumn = HidingColumnTemplate.bind({});
HidingColumn.args = {
  showHeader: true,
  columnsControl: true,
};

export const defaultHiddenColumns = Template.bind({});
defaultHiddenColumns.args = {
  showHeader: true,
  columnsControl: true,
  defaultHiddenColumns: ['address', 'uid'],
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  columnsControl: true,
  showHeader: true,
  background: 'var(--global-background)',
  title: 'Scrollable table',
  height: '400px',
};

export const WithTableActions = Template.bind({});
WithTableActions.args = {
  columnsControl: true,
  title: 'Custom title element',
  showHeader: true,
  actions: <Button>Custom action</Button>,
};

export const CustomExpandable = Template.bind({});
CustomExpandable.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  expandableRowComponent: data => <CustomExpandableComponent data={data} />,
};

export const Pagination = SelectionTemplate.bind({});
Pagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  itemsPerPage: 3,
  pageClusters: [3, 6, 9, 12],
  showPagination: true,
};

const RowActionsTemplate: ComponentStory<typeof Table> = ({
  columns,
  ...args
}) => {
  const tableColumns = useMemo(() => [
    {
      id: 'actions',
      disableSortBy: true,
      isToggable: true,
      isCollapsed: true,
      accessor: _ => (
        <Stack direction="row" fill={false}>
          <IconButton icon="astronomy" kind="flat" dimension="small" />
          <Popover trigger={<IconButton icon="more-vert" kind="flat" dimension="small" />}>
            <Menu>
              <Menu.Item
                dimension="small"
                autoFocus
                icon="ctrl-right"
              >
                Sample long menu item
              </Menu.Item>
              <Menu.Item
                dimension="small"
                icon="arrow-down-to-bracket"
              >
                Short menu label
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item dimension="small" icon="view">Even shorter</Menu.Item>
              <Menu.Item dimension="small" disabled>Really?</Menu.Item>
            </Menu>
          </Popover>
        </Stack>
      ),
    },
    ...columns], [columns]);
  return (
    <Table
      columns={tableColumns}
      {...args}
    />
  );
};

export const RowActions = RowActionsTemplate.bind({});
RowActions.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
};

export const NoData = Template.bind({});
NoData.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  data: [],
};

const ManualPaginationTemplate: ComponentStory<typeof Table> = ({
  data,
  dataWithIds,
  ...args
}) => {
  const [allData, setAllData] = useState(dataWithIds);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const [selectedRowIds, setSelectedRowIds] = useState(['4', '9', '12']);

  const pageData = useMemo(() => {
    const { pageIndex, pageSize } = pagination;
    const newIndexStart = pageIndex * pageSize;
    const newIndexEnd = (pageIndex * pageSize) + pageSize;

    return allData.slice(newIndexStart, newIndexEnd);
  }, [allData, pagination]);

  const onDelete = (selectedRowIds) => {
    const newTableData = allData.filter(({ id }) => !selectedRowIds.includes(id));
    setSelectedRowIds([]);
    setAllData(newTableData);
  };

  return (
    <Table
      {...args}
      data={pageData}
      onSelectedRowsChange={setSelectedRowIds}
      selectedRowIds={selectedRowIds}
      selectedActions={
        () => <Button onClick={() => onDelete(selectedRowIds)}>Delete rows</Button>
      }
      onPaginationChange={(newPagination) => {
        if (newPagination.pageIndex !== pagination.pageIndex || newPagination.pageSize !== pagination.pageSize) {
          setPagination(newPagination);
        }
      }}
      totalRows={allData.length}
      emptyComponent={<CustomEmptyComponent />}
    />
  );
};

export const ManualPagination = ManualPaginationTemplate.bind({});
ManualPagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columnsControl: true,
  showHeader: true,
  loading: true,
};

const ManualSortingTemplate: ComponentStory<typeof Table> = ({
  data,
  dataWithIds,
  ...args
}) => {
  const [pageData, setPageData] = useState<Array<typeof firstData>>(dataWithIds.slice(0, 5));
  const [sortBy, setSortBy] = useState<Array<CustomSortingRule<typeof firstData>>>([]);

  const fetchData = useCallback(({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const result = [...dataWithIds] as Array<typeof firstData>;

    if (sortBy.length === 0) {
      setPageData(result.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
      return;
    }

    const sorting = sortBy[0];

    result.sort((dataA, dataB) => {
      const isTypeNumber = typeof dataB[sorting.id] === 'number' || typeof dataA[sorting.id] === 'number';
      if (isTypeNumber) {
        const numberA = Number(dataA[sorting.id]);
        const numberB = Number(dataB[sorting.id]);
        return sorting.desc ? numberB - numberA : numberA - numberB;
      }

      const stringA = String(dataA[sorting.id]);
      const stringB = String(dataB[sorting.id]);

      return sorting.desc
        ? stringB.localeCompare(stringA)
        : stringA.localeCompare(stringB);
    });

    setPageData(result.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
  }, [dataWithIds, sortBy]);

  return (
    <Table
      data={pageData}
      onSortChange={sortBy => setSortBy(sortBy)}
      onPaginationChange={fetchData}
      totalRows={dataWithIds.length}
      emptyComponent={<CustomEmptyComponent />}
      {...args}
    />
  );
};

export const ManualSorting = ManualSortingTemplate.bind({});
ManualSorting.args = {
  isManualSorted: true,
  columnsControl: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5,
};

const ManualPaginationFilteringTemplate: ComponentStory<typeof Table> = ({
  data,
  dataWithIds,
  ...args
}) => {
  const [allData, setAllData] = useState(dataWithIds);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const pageData = useMemo(() => {
    const { pageIndex, pageSize } = pagination;
    const newIndexStart = pageIndex * pageSize;
    const newIndexEnd = (pageIndex * pageSize) + pageSize;

    return allData.slice(newIndexStart, newIndexEnd);
  }, [allData, pagination]);

  const onDelete = (selectedRowIds) => {
    const newTableData = allData.filter(({ id }) => !selectedRowIds.includes(id));
    setAllData(newTableData);
  };

  return (
    <Table
      {...args}
      data={pageData}
      actions={
        <Button onClick={() => setAllData(allData.filter(r => r.lastName === 'Stuffo'))}>Filter Stuffo</Button>
      }
      selectedActions={
        selectedRowIds => <Button onClick={() => onDelete(selectedRowIds)}>Delete rows</Button>
      }
      onPaginationChange={(newPagination) => {
        if (newPagination.pageIndex !== pagination.pageIndex || newPagination.pageSize !== pagination.pageSize) {
          setPagination(newPagination);
        }
      }}
      totalRows={allData.length}
      emptyComponent={<CustomEmptyComponent />}
    />
  );
};

export const ManualPaginationFiltering = ManualPaginationFilteringTemplate.bind({});
ManualPaginationFiltering.args = {
  isManualSorted: true,
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5,
};

const PreselectedRowsTemplate: ComponentStory<typeof Table> = ({ dataWithIds, data, ...args }) => {
  const [tableData, setTableData] = useState(dataWithIds);
  const [selectedRowIds, setSelectedRowIds] = useState(['2', '4', '9', '12']);

  const onDelete = (selectedRowIds) => {
    const newTableData = tableData.filter(({ id }) => !selectedRowIds.includes(id));
    setSelectedRowIds([]);
    setTableData(newTableData);
  };

  return (
    <Table
      data={tableData}
      selectedRowIds={selectedRowIds}
      onSelectedRowsChange={setSelectedRowIds}
      selectedActions={
        selectedRowIds => <Button onClick={() => onDelete(selectedRowIds)}>Delete rows</Button>
      }
      emptyComponent={<CustomEmptyComponent />}
      {...args}
    />
  );
};

export const PreselectedRows = PreselectedRowsTemplate.bind({});
PreselectedRows.args = {
  title: 'With selectable rows',
  selectableRows: true,
  showPagination: true,
};

const AsyncDataTemplate: ComponentStory<typeof Table> = ({ data, columns }) => {
  const [innerData, setInnerData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const dataTimeout = setTimeout(() => {
      setInnerData(data);
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(dataTimeout);
    };
  }, [data]);

  return (
    <Table
      title="Alphabet"
      columns={columns}
      data={innerData}
      loading={loading}
      showHeader
      selectableRows
    />
  );
};

export const AsyncData = AsyncDataTemplate.bind({});
AsyncData.args = {
  title: 'With selectable rows',
};

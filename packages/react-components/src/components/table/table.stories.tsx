import { useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from './table'
import { Button, IconButton, Title, Masonry, Stack, Dropdown, Menu, Separator } from '../..'
import { InfoState } from '../info-state'

export default {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true }
  },
  args: {
    stripes: false,
    selectableRows: false,
    showSeparators: true,
    showHeader: false,
    columns: [
      {
        id: 'firstname',
        Header: 'First Name',
        accessor: row => row.firstName
      },
      {
        id: 'lastname',
        Header: 'Last Name',
        accessor: row => row.lastName
      },
      {
        id: 'address',
        Header: 'Address',
        accessor: row => row.address
      },
      {
        id: 'uid',
        Header: 'UID',
        accessor: row => row.uid,
        minWidth: 200,
        align: 'end'
      },
      {
        id: 'info',
        Header: 'Info',
        accessor: row => row.info,
        disableSortBy: true,
        align: 'end',
        minWidth: 180
      }
    ],
    data: [
      {
        firstName: 'Gianni',
        lastName: 'Morandi',
        address: 'Via Roma, 1, Treno',
        uid: '34567895423556789',
        info: 123123.12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12,
                subRows: [
                  {
                    firstName: '1',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12,
                    subRows: [
                      {
                        firstName: '1',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: '123123',
                        info: 12,
                        subRows: [
                          {
                            firstName: '1',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: '123123',
                            info: 12,
                            subRows: [
                              {
                                firstName: '1',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: '123123',
                                info: 12,
                                subRows: [
                                  {
                                    firstName: '1',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: '123123',
                                    info: 12,
                                    subRows: [
                                      {
                                        firstName: '1',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: '123123',
                                        info: 12,
                                        subRows: [
                                          {
                                            firstName: '1',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: '123123',
                                            info: 12
                                          },
                                          {
                                            firstName: '2',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: '123123',
                                            info: 12
                                          },
                                          {
                                            firstName: '3',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: '123123',
                                            info: 12
                                          }
                                        ]
                                      },
                                      {
                                        firstName: '2',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: '123123',
                                        info: 12
                                      },
                                      {
                                        firstName: '3',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: '123123',
                                        info: 12
                                      }
                                    ]
                                  },
                                  {
                                    firstName: '2',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: '123123',
                                    info: 12
                                  },
                                  {
                                    firstName: '3',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: '123123',
                                    info: 12
                                  }
                                ]
                              },
                              {
                                firstName: '2',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: '123123',
                                info: 12
                              },
                              {
                                firstName: '3',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: '123123',
                                info: 12
                              }
                            ]
                          },
                          {
                            firstName: '2',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: '123123',
                            info: 12
                          },
                          {
                            firstName: '3',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: '123123',
                            info: 12
                          }
                        ]
                      },
                      {
                        firstName: '2',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: '123123',
                        info: 12
                      },
                      {
                        firstName: '3',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: '123123',
                        info: 12
                      }
                    ]
                  },
                  {
                    firstName: '2',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12
                  },
                  {
                    firstName: '3',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12
                  }
                ]
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              }
            ]
          }
        ]
      },
      {
        firstName: 'Simone',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: '345367890',
        canBeDeleted: true,
        info: 123.96
      },
      {
        firstName: 'Matteo',
        lastName: 'Staffone',
        address: 'Via Roma, 13, Genova',
        uid: <code>23456789</code>,
        info: 12.1213,
        subRows: [
          {
            firstName: '1',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12
          },
          {
            firstName: '2',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12,
                subRows: [
                  {
                    firstName: '1',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12
                  },
                  {
                    firstName: '2',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12
                  },
                  {
                    firstName: '3',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: '123123',
                    info: 12
                  }
                ]
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              }
            ]
          },
          {
            firstName: '3',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: '123123',
                info: 12
              }
            ]
          }
        ]
      },
      {
        firstName: 'Emanuele',
        lastName: 'Staffo',
        address: 'Via Roma, 14, Milano',
        uid: '2345678',
        info: 1234
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12
          }
        ]
      },
      {
        firstName: 'Luca',
        lastName: 'Morandi',
        address: 'Via Roma, 1, Treno',
        uid: '34567895423556789',
        info: 123123.12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12
          }
        ]
      },
      {
        firstName: 'Mattia',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: '345367890',
        info: 123.96
      },
      {
        firstName: 'Morfeo',
        lastName: 'Staffone',
        address: 'Via Roma, 13, Genova',
        uid: <code>23456789</code>,
        info: 12.1213
      },
      {
        firstName: 'Gianluca',
        lastName: 'Staffo',
        address: 'Via Roma, 14, Milano',
        uid: '2345678',
        info: 1234
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: '123123',
        info: 12
      }
    ]
  }
} as ComponentMeta<typeof Table>

const CustomExpandableComponent = ({ data }) => (
  <Masonry
    columns={3}
    style={{ padding: '16px 0' }}
  >
    {Object.keys(data).map((item, i) => (
      <div key={item} style={{ background: 'var(--dimmed-1)', padding: 24, minHeight: 50 * (i + 1) }}>
        <Title level="6">{typeof data[item] === 'string' ? data[item] : null}</Title>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, nostrum minima, debitis qui magni voluptatum.
      </div>
    ))}
  </Masonry>
)

const CustomEmptyComponent = () => (
  <InfoState title="No data to show" icon="frown">
    It seems there is no data to show inside this table. If data should be present,please
    check if columns are visible by using the table controls.
  </InfoState>
)

const Template: ComponentStory<typeof Table> = (args) => {
  return (
    <Table
      emptyComponent={<CustomEmptyComponent />}
      {...args}
    />
  )
}

export const Simple = Template.bind({})

export const SelectedRows = Template.bind({})
SelectedRows.args = {
  title: 'With selectable rows',
  selectableRows: true,
  selectedActions: <Button>Delete</Button>,
  onSelectionChange: (selectedRows, selectedIds) => { console.log({ selectedRows, selectedIds }) }
}

export const HidingColumn = Template.bind({})
HidingColumn.args = {
  showHeader: true,
  columnsControl: true
}

export const defaultHiddenColumns = Template.bind({})
defaultHiddenColumns.args = {
  showHeader: true,
  columnsControl: true,
  defaultHiddenColumns: ['address', 'uid']
}

export const Scrollable = Template.bind({})
Scrollable.args = {
  columnsControl: true,
  showHeader: true,
  title: 'Scrollable table',
  height: '400px'
}

export const WithTableActions = Template.bind({})
WithTableActions.args = {
  columnsControl: true,
  title: <Title level="3">Custom title element</Title>,
  showHeader: true,
  actions: <Button>Custom action</Button>
}

export const CustomExpandable = Template.bind({})
CustomExpandable.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  expandableRowsComponent: (data) => <CustomExpandableComponent data={data} />
}

export const Pagination = Template.bind({})
Pagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  itemsPerPage: 10,
  showPagination: true
}

export const RowActions = Template.bind({})
RowActions.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  actionsRowComponent: ({ depth }) => (
    <Stack direction="row" fill={false}>
      <IconButton icon="arrow-rotate-right" kind="flat" dimension="small" />
      {depth > 0 && (
      <Dropdown
        offset={4}
        placement="bottom-start"
        trigger={<IconButton icon="bars" kind="flat" dimension="small" />}
      >
        <Menu>
          <Menu.Item
            dimension="small"
            autoFocus
            icon="arrow-right"
            description={<>Description for this item</>}
          >
            Sample long menu item
          </Menu.Item>
          <Menu.Item
            dimension="small"
            icon="user"
            description={(
              <>
                <Title as="h2" level="5">Sample H2 Title longlonglonglonglonglonglonglonglonglonglong</Title>
                <p>long text content placeholder to test wrapping and sizes</p>
                <img style={{ width: '100%' }} src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
              </>
          )}
          >
            Short menu label
          </Menu.Item>
          <Separator />
          <Menu.Item dimension="small" icon="arrow-down-to-bracket">Even shorter</Menu.Item>
          <Menu.Item dimension="small" disabled>Really?</Menu.Item>
        </Menu>
      </Dropdown>
      )}
    </Stack>
  )
}

export const NoData = Template.bind({})
NoData.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  data: []
}

const ManualPaginationTemplate: ComponentStory<typeof Table> = ({ data, ...args }) => {
  const [pageData, setPageData] = useState([])
  const [totalRows, setTotalRows] = useState(1)

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setTotalRows(data.length)
    setPageData(data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize))
  }, [data])

  return (
    <Table
      {...args}
      data={pageData}
      fetchData={fetchData}
      totalRows={totalRows}
      emptyComponent={<CustomEmptyComponent />}
    />
  )
}
export const ManualPagination = ManualPaginationTemplate.bind({})
ManualPagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5
}

export const Loading = Template.bind({})
Loading.args = {
  columnsControl: true,
  showHeader: true,
  loading: true
}

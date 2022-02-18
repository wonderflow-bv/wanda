import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from './table'
import { Button, Title, Masonry } from '../..'

export default {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true }
  },
  args: {
    stripes: false,
    showSeparators: false,
    selectableRows: false,
    showHeader: false,
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'UID',
        accessor: 'uid'
      },
      {
        Header: 'Info',
        accessor: 'info',
        align: 'end',
        isCollapsed: true
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
            info: 12
          }
        ]
      },
      {
        firstName: 'Simone',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: '345367890',
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
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: '123123',
            info: 12
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
            info: 12
          }
        ]
      },
      {
        firstName: 'Simone',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: '345367890',
        info: 123.96
      },
      {
        firstName: 'Matteo',
        lastName: 'Staffone',
        address: 'Via Roma, 13, Genova',
        uid: <code>23456789</code>,
        info: 12.1213
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
        info: 12
      }
    ]
  }
} as ComponentMeta<typeof Table>

const CustomExpandableComponent = ({ data }) => (
  <Masonry
    columns={3}
  >
    {Object.keys(data).map((item, i) => (
      <div key={item} style={{ background: 'var(--dimmed-1)', padding: 24, minHeight: 50 * (i + 1) }}>
        <Title level="6">{data[item]}</Title>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, nostrum minima, debitis qui magni voluptatum.
      </div>
    ))}
  </Masonry>
)

const Template: ComponentStory<typeof Table> = (args) => {
  return (
    <Table
      {...args}
    />
  )
}

export const Simple = Template.bind({})

export const SelectedRows = Template.bind({})
SelectedRows.args = {
  title: 'With selectable rows',
  selectableRows: true,
  selectedActions: (<Button>Delete</Button>)
}

SelectedRows.argTypes = {
  onSelectionChange: {
    action: (rows) => { console.log(rows) },
    table: {
      disable: true
    }
  }
}

export const HidingColumn = Template.bind({})
HidingColumn.args = {
  columnsControl: false
}

export const Scrollable = Template.bind({})
Scrollable.args = {
  columnsControl: true,
  showHeader: true,
  title: 'Scrollable table',
  height: '400px'
}

export const CustomActions = Template.bind({})
CustomActions.args = {
  columnsControl: true,
  title: <Title level="3">Custom title element</Title>,
  showHeader: true,
  actions: <Button>Custom action</Button>
}

export const Expandable = Template.bind({})
Expandable.args = {
  columnsControl: true,
  showHeader: true,
  ExpandableRowsComponent: (data) => <CustomExpandableComponent data={data} />
}

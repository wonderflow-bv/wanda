import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useMemo } from 'react'
import { Table } from './table'

export default {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true }
  },
  args: {
    stripes: false,
    showSeparators: false
  }
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => {
  const columns = useMemo(() => [
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
  ], [])

  const data = useMemo(() => [
    {
      firstName: 'Gianni',
      lastName: 'Morandi',
      address: 'Via Roma, 1, Treno',
      uid: '34567895423556789',
      info: 123123.12
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
      uid: '23456789',
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
  ], [])

  return (
    <Table
      columns={columns}
      data={data}
      {...args}
    />
  )
}

export const Simple = Template.bind({})

export const SelectedRows = Template.bind({})
SelectedRows.args = {
  selectableRows: true
}

SelectedRows.argTypes = {
  onSelectionChange: {
    action: (rows) => { console.log(rows) },
    table: {
      disable: true
    }
  }
}

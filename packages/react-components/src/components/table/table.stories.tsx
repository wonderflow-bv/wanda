import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useMemo } from 'react'
import { Table } from './table'

export default {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true }
  },
  args: {
    selectableRows: false,
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
      info: 123123.12
    },
    {
      firstName: 'Simone',
      lastName: 'Lastname',
      info: 123.96
    },
    {
      firstName: 'Matteo',
      lastName: 'Staffone',
      info: 12.1213
    },
    {
      firstName: 'Emanuele',
      lastName: 'Staffo',
      info: 1234
    },
    {
      firstName: 'Simone',
      lastName: 'Stuffo',
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

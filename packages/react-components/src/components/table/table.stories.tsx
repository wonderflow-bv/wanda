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
      accessor: 'age'
    }
  ], [])

  const data = useMemo(() => [
    {
      firstName: 'Gianni',
      lastName: 'Morandi',
      age: 123123.12
    },
    {
      firstName: 'Simone',
      lastName: 'Lastname',
      age: 123.96
    },
    {
      firstName: 'Matteo',
      lastName: 'Staffone',
      age: 12.1213
    },
    {
      firstName: 'Emanuele',
      lastName: 'Staffo',
      age: 1234
    },
    {
      firstName: 'Simone',
      lastName: 'Stuffo',
      age: 12
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

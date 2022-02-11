import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from './table'

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      }
    ]
  },
  {
    Header: 'Info',
    accessor: 'age',
    collapse: true
  }
]

const data = [
  {
    firstName: 'Gianni',
    lastName: 'Morandi',
    age: 123
  },
  {
    firstName: 'Simone',
    lastName: 'Lastname',
    age: 123
  },
  {
    firstName: 'Matteo',
    lastName: 'Staffone',
    age: 123
  },
  {
    firstName: 'Emanuele',
    lastName: 'Staffo',
    age: 123
  },
  {
    firstName: 'Simone',
    lastName: 'Stuffo',
    age: 123
  }
]

export default {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true }
  },
  args: {
    columns,
    data
  }
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => (
  <Table
    {...args}
  />
)

export const Simple = Template.bind({})

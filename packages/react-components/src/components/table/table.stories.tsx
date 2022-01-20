import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from './table'

const columns = [{
  name: 'First column',
  selector: row => row.someKey,
  sortable: true
}, {
  name: 'Second column',
  selector: row => row.someKey,
  sortable: true
}, {
  name: 'Third column',
  selector: row => row.someKey
}]

const data = [
  {
    id: 1,
    someKey: 'Some data to print',
    anotherKey: 'Another key data',
    value: 123
  },
  {
    id: 2,
    someKey: 'Some data to print 2',
    anotherKey: 'Another key data 2',
    value: 1234
  },
  {
    id: 3,
    someKey: 'Some data to print 3',
    anotherKey: 'Another key data 3',
    value: 5324
  },
  {
    id: 4,
    someKey: 'Some data to print 4',
    anotherKey: 'Another key data 4',
    value: 124
  },
  {
    id: 5,
    someKey: 'Some data to print',
    anotherKey: 'Another key data',
    value: 123
  },
  {
    id: 6,
    someKey: 'Some data to print 2',
    anotherKey: 'Another key data 2',
    value: 1234
  },
  {
    id: 7,
    someKey: 'Some data to print 3',
    anotherKey: 'Another key data 3',
    value: 5324
  },
  {
    id: 8,
    someKey: 'Some data to print 4',
    anotherKey: 'Another key data 4',
    value: 124
  },
  {
    id: 9,
    someKey: 'Some data to print 3',
    anotherKey: 'Another key data 3',
    value: 5324
  },
  {
    id: 10,
    someKey: 'Some data to print 4',
    anotherKey: 'Another key data 4',
    value: 124
  },
  {
    id: 11,
    someKey: 'Some data to print',
    anotherKey: 'Another key data',
    value: 123
  },
  {
    id: 12,
    someKey: 'Some data to print 2',
    anotherKey: 'Another key data 2',
    value: 1234
  },
  {
    id: 13,
    someKey: 'Some data to print 3',
    anotherKey: 'Another key data 3',
    value: 5324
  },
  {
    id: 14,
    someKey: 'Some data to print 4',
    anotherKey: 'Another key data 4',
    value: 124
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

const ExpndableComponent = ({ data }: Record<string, any>) => (
  <table width="100%">
    <thead><tr>{Object.keys(data).map(key => <th key={key} style={{ textAlign: 'left' }}>{key}</th>)}</tr></thead>
    <tbody>
      <tr>{Object.keys(data).map(key => <td key={key}>{data[key]}</td>)}</tr>
    </tbody>
  </table>
)

const Template: ComponentStory<typeof Table> = (args) => (
  <Table
    {...args}
  />
)

export const Simple = Template.bind({})

export const ExpandableRows = Template.bind({})
ExpandableRows.args = {
  ExpandableRowsComponent: ExpndableComponent,
  pagination: true,
  selectableRows: true,
  selectableRowsHighlight: true,
  striped: true
}

export const InteractiveRows = Template.bind({})
InteractiveRows.args = {
  pointerOnHover: true,
  onRowClicked: (row: any) => console.log(row),
  pagination: true,
  striped: true,
  highlightOnHover: true
}

export const SelectableRows = Template.bind({})
SelectableRows.args = {
  pagination: true,
  selectableRows: true,
  selectableRowsHighlight: true,
  noHeader: false,
  title: 'Sample data'
}

export const LoadingState = Template.bind({})
LoadingState.args = {
  progressPending: true,
  pagination: true
}

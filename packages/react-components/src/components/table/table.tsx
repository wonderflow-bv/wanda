
import { useTable, TableOptions, TableCommonProps } from 'react-table'

export type TableProps<T extends object> = TableCommonProps & TableOptions<T> & {
  pagination?: boolean
}

export const Table = <T extends object, >({
  columns,
  data,
  ...otherProps
}: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  return (
    <table {...getTableProps()} {...otherProps}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: Record<string, any>) => {
                return (
                  <td {...cell.getCellProps()} style={{ background: cell.column.collapse ? 'red' : 'blue' }}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

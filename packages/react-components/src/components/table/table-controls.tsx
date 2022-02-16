import { Dropdown, Menu, Button } from '@/components'
import { useMemo } from 'react'
import { ColumnInstance } from 'react-table'
import { TableProps, ColumnType } from './table'

type ToggleColumnsControlProps = {
  columns: TableProps['columns']
  visibleColumns: ColumnInstance[]
}

export const ToggleColumnsControl = ({ columns, visibleColumns }: ToggleColumnsControlProps) => {
  const filteredColumns = useMemo(() => visibleColumns.filter((col: ColumnType) => !col.hideFromList), [visibleColumns])

  return (
    <Dropdown
      placement="bottom-start"
      trigger={<Button kind="secondary">Toggle columns</Button>}
    >
      <Menu>
        {columns.map((column: ColumnType, i) => {
          const isVisible = column.isVisible
          return !column.hideFromList
            ? (
              <Menu.ItemCheckbox
                autoFocus={i === 1}
                key={column.id}
                checked={isVisible}
                icon={isVisible ? 'check' : undefined}
                disabled={isVisible && filteredColumns.length === 1}
                onClick={() => column.toggleHidden()}
              >
                {column.render('Header')}
              </Menu.ItemCheckbox>
              )
            : null
        }
        )}
      </Menu>
    </Dropdown>
  )
}

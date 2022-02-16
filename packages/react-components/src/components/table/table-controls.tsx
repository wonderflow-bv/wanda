import { Dropdown, Menu, Button } from '@/components'
import { ColumnInstance } from 'react-table'

type ToggleColumnsControlProps = {
  columns: ColumnInstance[]
  visibleColumns: ColumnInstance[]
}

export const ToggleColumnsControl = ({ columns, visibleColumns }: ToggleColumnsControlProps) => {
  return (
    <Dropdown
      placement="bottom-start"
      trigger={<Button kind="secondary">Toggle columns</Button>}
    >
      <Menu>
        {columns.map((column, i) => {
          const isChecked = column.getToggleHiddenProps().checked
          return column.id !== 'selection'
            ? (
              <Menu.ItemCheckbox
                autoFocus={i === 1}
                key={column.id}
                checked={isChecked}
                icon={isChecked ? 'check' : undefined}
                disabled={isChecked && visibleColumns.length === 1}
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

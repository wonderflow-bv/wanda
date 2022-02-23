import { Dropdown, Menu, Button } from '@/components'
import { useCallback, useMemo } from 'react'
import { CustomColumnInstanceType } from '../types'

type ToggleColumnsControlProps = {
  columns: CustomColumnInstanceType[]
  visibleColumns: CustomColumnInstanceType[]
  onToggleAll: (columnsId: string[]) => void
}

export const ToggleColumnsControl = ({
  columns,
  visibleColumns,
  onToggleAll
}: ToggleColumnsControlProps) => {
  const filteredColumns = useMemo(() => visibleColumns.filter((col) => !col.hideFromList), [visibleColumns])

  console.log(columns.length, filteredColumns.length)

  const handleToggleAll = useCallback(
    () => {
      if (filteredColumns.length !== 0) {
        filteredColumns.map((col) => col.toggleHidden(true))
      } else {
        columns.filter(col => !col.hideFromList).map((col) => col.toggleHidden(false))
      }
    },
    [columns, filteredColumns]
  )

  return (
    <Dropdown
      placement="bottom-start"
      trigger={<Button kind="secondary">Toggle columns</Button>}
    >
      <Menu>
        <Menu.ItemCheckbox
          onClick={() => handleToggleAll()}
          checked
          icon={filteredColumns.length === 0 ? 'check' : 'minus'}
        >
          Toggle All
        </Menu.ItemCheckbox>
        {columns.filter(col => !col.hideFromList).map((column, i) => (
          <Menu.ItemCheckbox
            autoFocus={i === 0}
            key={column.id}
            checked={column.isVisible}
            icon={column.isVisible ? 'check' : undefined}
            onClick={() => column.toggleHidden()}
          >
            {column.render('Header')}
          </Menu.ItemCheckbox>
        ))}
      </Menu>
    </Dropdown>
  )
}

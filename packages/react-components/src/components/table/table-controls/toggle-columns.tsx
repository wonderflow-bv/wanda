import { Dropdown, Menu, Button } from '@/components'
import { useCallback, useMemo } from 'react'
import { CustomColumnInstanceType } from '../types'

type ToggleColumnsControlProps = {
  columns: CustomColumnInstanceType[]
  visibleColumns: CustomColumnInstanceType[]
}

export const ToggleColumnsControl = ({
  columns,
  visibleColumns
}: ToggleColumnsControlProps) => {
  const filteredColumns = useMemo(() => columns.filter(col => !col.hideFromList), [columns])

  const handleToggleAll = useCallback(
    () => {
      if (visibleColumns.length !== 0) {
        visibleColumns.map((col) => col.toggleHidden(true))
      } else {
        filteredColumns.filter(col => !col.hideFromList).map((col) => col.toggleHidden(false))
      }
    },
    [filteredColumns, visibleColumns]
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
          icon={visibleColumns.length === 0 ? 'check' : 'minus'}
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

import { Dropdown, Menu, Button } from '@/components'
import { useMemo } from 'react'
import { CustomColumnInstanceType } from '../types'

type ToggleColumnsControlProps = {
  columns: CustomColumnInstanceType[]
  visibleColumns: CustomColumnInstanceType[]
}

export const ToggleColumnsControl = ({ columns, visibleColumns }: ToggleColumnsControlProps) => {
  const filteredColumns = useMemo(() => visibleColumns.filter((col) => !col.hideFromList), [visibleColumns])

  return (
    <Dropdown
      placement="bottom-start"
      trigger={<Button kind="secondary">Toggle columns</Button>}
    >
      <Menu>
        {columns.filter(col => !col.hideFromList).map((column, i) => (
          <Menu.ItemCheckbox
            autoFocus={i === 0}
            key={column.id}
            checked={column.isVisible}
            icon={column.isVisible ? 'check' : undefined}
            disabled={column.isVisible && filteredColumns.length === 1}
            onClick={() => column.toggleHidden()}
          >
            {column.render('Header')}
          </Menu.ItemCheckbox>
        ))}
      </Menu>
    </Dropdown>
  )
}

import { useCallback, useMemo } from 'react'

import { Button, Menu, Dropdown } from '@/components'

import { CustomColumnInstanceType } from '../types'

type ToggleColumnsControlProps<T extends Record<string, unknown>> = {
  columns: Array<CustomColumnInstanceType<T>>;
  visibleColumns: Array<CustomColumnInstanceType<T>>;
}

export const ToggleColumnsControl = <T extends Record<string, unknown>>({
  columns,
  visibleColumns
}: ToggleColumnsControlProps<T>) => {
  const someVisibleColums = useMemo(() => visibleColumns.length !== 0, [visibleColumns])
  const filteredColumns = useMemo(() => columns.filter(col => !col.hideFromList), [columns])

  const handleToggleAll = useCallback(
    () => {
      /**
       * If there are visible columns (excluding artificial ones),
       * hide them all by calling `toggleHidden(true)` for each column
       */
      if (someVisibleColums) {
        visibleColumns.forEach(col => col.toggleHidden(true))
        return
      }
      /**
       * If there are no visible columns (excluding artificial ones), call
       * toggleHidden(false) for each column
       */
      filteredColumns.forEach(col => col.toggleHidden(false))
    },
    [someVisibleColums, filteredColumns, visibleColumns]
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

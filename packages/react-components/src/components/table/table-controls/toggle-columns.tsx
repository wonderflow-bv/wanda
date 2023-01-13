/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useMemo } from 'react';

import { Button, Menu, Popover } from '@/components';

import { CustomColumnInstanceType } from '../types';

type ToggleColumnsControlProps<T extends Record<string, unknown>> = {
  columns: Array<CustomColumnInstanceType<T>>;
  visibleColumns: Array<CustomColumnInstanceType<T>>;
}

export const ToggleColumnsControl = <T extends Record<string, unknown>>({
  columns,
  visibleColumns,
}: ToggleColumnsControlProps<T>) => {
  const hasSomeVisibleColums = useMemo(() => visibleColumns.length !== 0, [visibleColumns]);
  const filteredColumns = useMemo(() => columns.filter(col => !col.isToggable), [columns]);

  const handleToggleAll = useCallback(
    () => {
      /**
       * If there are visible columns (excluding artificial ones),
       * hide them all by calling `toggleHidden(true)` for each column
       */
      if (hasSomeVisibleColums) {
        visibleColumns.forEach(col => col.toggleHidden(true));
        return;
      }

      /**
       * If there are no visible columns (excluding artificial ones), call
       * toggleHidden(false) for each column
       */
      filteredColumns.forEach(col => col.toggleHidden(false));
    },
    [hasSomeVisibleColums, filteredColumns, visibleColumns],
  );

  return (
    <Popover
      placement="bottom-start"
      trigger={<Button kind="secondary">Toggle columns</Button>}
    >
      <Menu maxHeight="350px">
        <Menu.ItemCheckbox
          value="toggle-all"
          onClick={() => handleToggleAll()}
          checked
          icon={visibleColumns.length === 0 ? 'check' : 'minus'}
        >
          Toggle All
        </Menu.ItemCheckbox>
        {columns.filter(col => !col.isToggable).map((column, i) => (
          <Menu.ItemCheckbox
            value={column.id}
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
    </Popover>
  );
};

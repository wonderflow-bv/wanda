/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

import { useMemo } from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Pagination, Select, Stack, Text,
} from '@/components';

export type TablePaginationProps = PropsWithClass & {
  clusters?: number[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageClick?: (page: number) => void;
  isManual?: boolean;
}

export const TablePagination: FCChildren<TablePaginationProps> = ({
  children,
  pageSize,
  onPageSizeChange,
  clusters = [5, 10, 20, 30, 50, 100],
  totalItems,
  currentPage,
  isManual,
  totalPages,
  onPageClick,
  ...otherProps
}) => {
  const uid = useUIDSeed();
  const computedPageCount = useMemo(() => (
    isManual ? Math.ceil(totalItems / pageSize) : totalPages
  ), [isManual, pageSize, totalItems, totalPages]);
  const computedItemsInPageStart = useMemo(
    () => (currentPage && pageSize) && currentPage * pageSize,
    [currentPage, pageSize],
  );
  const computedItemsInPageEnd = useMemo(() => currentPage * pageSize + pageSize, [currentPage, pageSize]);

  return (
    <Stack
      fill={false}
      direction="row"
      columnGap={16}
      vAlign="center"
      hAlign="end"
      vPadding={16}
      {...otherProps}
    >
      <Stack direction="row" columnGap={4}>
        <Text as="label" htmlFor={uid('table-i-per-page')} size={14}>Items per page:</Text>
        <Select
          value={pageSize}
          dimension="small"
          id={uid('table-i-per-page')}
          onChange={({ currentTarget }) => {
            onPageSizeChange?.(Number(currentTarget.value));
          }}
        >
          {clusters.map(cluster => (
            <option key={cluster} value={cluster}>{cluster}</option>
          ))}
        </Select>
      </Stack>
      <Text aria-hidden="true" weight="bold" size={14}>
        {`${computedItemsInPageStart + 1}-${computedItemsInPageEnd > totalItems ? totalItems : computedItemsInPageEnd} of ${totalItems}`}
      </Text>
      <Pagination
        itemsCount={totalItems}
        itemsPerPage={pageSize}
        pageCount={computedPageCount}
        onPageClick={({ selected }) => onPageClick?.(selected)}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
    </Stack>
  );
};

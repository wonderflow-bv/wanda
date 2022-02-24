import { Select, Stack, Text, Pagination } from '@/components'
import { FC, useMemo } from 'react'
import { useUIDSeed } from 'react-uid'

export type TablePaginationProps = PropsWithClass & {
  clusters?: Array<number>
  pageSize: number
  totalItems: number
  totalPages: number
  currentPage: number
  onPageSizeChange?: (pageSize: number) => void
  onPageClick?: (page: number) => void
  isManual?: boolean
}

export const TablePagination: FC<TablePaginationProps> = ({
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
  const uid = useUIDSeed()
  const computedPageCount = useMemo(() => isManual ? Math.ceil(totalItems / pageSize) : totalPages, [isManual, pageSize, totalItems, totalPages])
  const computedItemsInPageStart = useMemo(() => (currentPage && pageSize) && currentPage * pageSize, [currentPage, pageSize])
  const computedItemsInPageEnd = useMemo(() => currentPage * pageSize + pageSize, [currentPage, pageSize])

  return (
    <Stack
      fill={false}
      direction="row"
      columnGap={16}
      verticalAlign="center"
      horizontalAlign="end"
      verticalPadding={16}
      {...otherProps}
    >
      <Stack direction="row" columnGap={4}>
        <Text as="label" htmlFor={uid('table-i-per-page')} size={14}>Items per page:</Text>
        <Select
          value={pageSize}
          dimension="small"
          id={uid('table-i-per-page')}
          onChange={({ currentTarget }) => { onPageSizeChange && onPageSizeChange(Number(currentTarget.value)) }}
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
        onPageClick={({ selected }) => onPageClick && onPageClick(selected)}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
    </Stack>
  )
}

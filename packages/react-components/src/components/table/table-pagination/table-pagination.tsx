import { Select, Stack, Text } from '@/components'
import { FC } from 'react'
import { useUIDSeed } from 'react-uid'

export type TablePaginationProps = PropsWithClass & {
  clusters?: Array<number>
  pageSize?: number
  onPageSizeChange?: (pageSize: number) => void
}

export const TablePagination: FC<TablePaginationProps> = ({
  children,
  pageSize,
  onPageSizeChange,
  clusters = [5, 10, 20, 30, 50, 100],
  ...otherProps
}) => {
  const uid = useUIDSeed()

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
          {clusters.map(pSize => (
            <option key={pSize} value={pSize}>{pSize}</option>
          ))}
        </Select>
      </Stack>
      <Text aria-hidden="true" weight="bold" size={14}>
        { /* `${pageIndex * pageSize + 1}-${(totalRows && pageIndex * pageSize + pageSize > totalRows) ? totalRows : pageIndex * pageSize + pageSize} of ${totalRows || rows.length}` */}
        {/* {`${parseInt(page[0]?.id) + 1}-${parseInt(page[page.length - 1]?.id) + 1} of ${data.length}`} */}
      </Text>
      {children}
    </Stack>
  )
}

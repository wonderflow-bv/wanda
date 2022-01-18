import clsx from 'clsx'
import { useEffect, useState } from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'
import { Except } from 'type-fest'
import { Icon } from '../..'

import styles from './pagination.module.css'

export type PaginationProps = Except<ReactPaginateProps, 'pageCount'> & {
  /**
   * Set the total number of items to paginate through.
   */
  itemsCount: number;
  /**
   * Set the number of items to display per page.
   */
  itemsPerPage?: number;
  /**
   * Set the number of pages to display. If missing this is computed by
   * the `itemsCount` divided by `itemsPerPage`.
   */
  pageCount?: number;
  /**
   * Callback function to be called when the page is changed. A an `object`
   * is passed with the following properties:
   * - `selected`: The index of the selected page.
   * - `offset`: The offset of the selected page.
   */
  onPageClick?(data: Record<string, number>): void;
  /**
   * Set how many pages to show in the visible page range (between the "..." break)
   */
  pageRangeDisplayed?: ReactPaginateProps['pageRangeDisplayed'];
  /**
   * The number of visible pages to display on the sides.
   */
  marginPagesDisplayed?: ReactPaginateProps['marginPagesDisplayed'];
}

export const Pagination = ({
  className,
  itemsCount,
  itemsPerPage = 10,
  onPageClick,
  pageCount,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
  ...otherProps
}: PaginationProps) => {
  const [computedPageCount, setComputedPageCount] = useState(0)

  useEffect(() => {
    itemsCount && setComputedPageCount(Math.ceil(itemsCount / itemsPerPage))
  }, [itemsCount, itemsPerPage])

  const handlePageClick = (event: Record<string, any>) => {
    const newOffset = (event.selected * itemsPerPage) % itemsCount
    onPageClick && onPageClick({ ...event, offset: newOffset })
  }

  return (
    <ReactPaginate
      containerClassName={clsx(styles.Pagination, className)}
      breakLabel="..."
      nextLabel={<Icon dimension={16} name="chevron-right" />}
      previousLabel={<Icon dimension={16} name="chevron-left" />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount || computedPageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      {...otherProps}
    />
  )
}

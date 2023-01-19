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

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { Except } from 'type-fest';

import { Symbol } from '@/components';

import * as styles from './pagination.module.css';

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
  onPageClick?: (data: Record<string, number>) => void;
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
  const [computedPageCount, setComputedPageCount] = useState(0);

  useEffect(() => {
    if (itemsCount) setComputedPageCount(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage]);

  const handlePageClick = (event: Record<string, any>) => {
    const newOffset = (event.selected * itemsPerPage) % itemsCount;
    onPageClick?.({ ...event, offset: newOffset });
  };

  return (
    <ReactPaginate
      containerClassName={clsx(styles.Pagination, className)}
      breakLabel="..."
      nextLabel={<Symbol dimension={16} source="chevron-right" data-testid="RightChevron" />}
      previousLabel={<Symbol dimension={16} source="chevron-left" data-testid="LeftChevron" />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount ?? computedPageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      {...otherProps}
    />
  );
};

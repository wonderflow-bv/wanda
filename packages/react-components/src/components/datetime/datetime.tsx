/*
 * Copyright 2022 Wonderflow
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

import { HTMLAttributes, useEffect, useState } from 'react';

export type DatetimeProps = HTMLAttributes<HTMLTimeElement> & {
  /**
   * The date to format and display.
   */
  date: string;
  /**
   * Set the locale to use to format the date.
   */
  locale?: string | string[];
  /**
   * Customize the date format by passing options from Intl.DateTimeFormat
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   */
  options?: Intl.DateTimeFormatOptions;
}

export const Datetime = ({
  date,
  locale = 'en-US',
  options,
  ...otherProps
}: DatetimeProps) => {
  const [datetime, setDateTime] = useState<string>('');

  useEffect(() => {
    const timeDate: Date = new Date(date);
    const humanDate = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }).format(timeDate);

    setDateTime(humanDate);
  }, [date, locale, options]);

  return (
    <time
      dateTime={date}
      {...otherProps}
    >
      {datetime}
    </time>
  );
};

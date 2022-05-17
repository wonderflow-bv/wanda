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

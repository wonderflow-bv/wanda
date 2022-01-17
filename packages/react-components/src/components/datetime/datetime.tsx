import { HTMLAttributes, useEffect, useState } from 'react'

export type DatetimeProps = HTMLAttributes<HTMLTimeElement> & {
  date: string;
  locale?: string | string[];
  options?: Intl.DateTimeFormatOptions;
}

export const Datetime = ({
  date,
  locale = 'en-US',
  options,
  ...otherProps
}: DatetimeProps) => {
  const [datetime, setDateTime] = useState<string>('')

  useEffect(() => {
    const timeDate: Date = new Date(date)
    const humanDate = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(timeDate)

    setDateTime(humanDate)
  }, [date, locale, options])

  return (
    <time
      dateTime={date}
      {...otherProps}
    >
      {datetime}
    </time>
  )
}

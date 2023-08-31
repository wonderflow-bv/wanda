import _ from 'lodash';

export const getLocales = (
  value: string | string[],
  defaultLocales = 'en-US',
) => {
  try {
    return Intl.getCanonicalLocales(value);
  } catch (err: unknown) {
    console.error(err);
    return defaultLocales;
  }
};

export const formatNumber = (
  value: number,
  locales = 'en-US',
  options = { maximumSignificantDigits: 12 },
) => new Intl.NumberFormat(getLocales(locales), options).format(value);

export const formatDate = (
  value: Date,
  locales = 'en-US',
  options = { year: 'numeric', month: 'short', day: 'numeric' } as { year: 'numeric'; month: 'short'; day: 'numeric' },
) => new Intl.DateTimeFormat(getLocales(locales), options).format(value);

export const formatValue = (
  value: string | number | Date,
  locales = 'en-US',
  options?: any,
) => {
  if (typeof value === 'number') return formatNumber(value, locales, options);
  if (_.isDate(value)) return formatDate(value, locales, options);
  return value;
};

import _ from 'lodash';

export const getLocales = (
  value: string | string[],
  defaultLocales = 'en-US',
) => {
  try {
    // @ts-expect-error: missing Intl d.ts declaration
    return Intl.getCanonicalLocales(value);
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
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
  options = { year: '2-digit', month: '2-digit', day: '2-digit' } as any,
) => new Intl.DateTimeFormat(getLocales(locales), options).format(value).replaceAll('/', '.');

export const formatValue = (
  value: string | number | Date,
  locales = 'en-US',
  options?: any,
) => {
  if (typeof value === 'number') return formatNumber(value, locales, options);
  if (_.isDate(value)) return formatDate(value, locales, options);
  return value;
};

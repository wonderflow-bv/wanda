import { formatKpiValue, formatPriceRangeValues } from './formatting';

describe('formatPriceRangeValues()', () => {
  it('should return both price values', () => {
    const res = formatPriceRangeValues(10, 20);
    expect(res).toBe('10.00 - 20.00 €');
  });
  it('should return only the first value', () => {
    const res = formatPriceRangeValues(10);
    expect(res).toBe('10.00 €');
  });

  it('should return only the second value', () => {
    const res = formatPriceRangeValues(undefined, 20);
    expect(res).toBe('20.00 €');
  });

  it('should return undefined', () => {
    const res = formatPriceRangeValues(undefined, undefined);
    expect(res).toBeFalsy();
  });
});

describe('formatKpiValue()', () => {
  it('should return the string "10.00" ', () => {
    const res = formatKpiValue(10, 2);
    expect(res).toBe('10.00');
  });

  it('should return the string "10" w/o decimals', () => {
    const res = formatKpiValue(10);
    expect(res).toBe('10');
  });

  it('should return an empty string', () => {
    const res = formatKpiValue(-10, 2);
    expect(res).toBe('');
  });

  it('should return an empty string with an nullish value', () => {
    const res = formatKpiValue(undefined, 2);
    expect(res).toBe('');
  });
});

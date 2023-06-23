import { formatPriceRangeValues } from './formatting';

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

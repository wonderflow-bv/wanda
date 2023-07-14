import { clampValue, formatKpiValue, formatPriceRangeValues } from './formatting';

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

describe('clampValue()', () => {
  it('should clamp value correctly', () => {
    const val = 10;
    const min = 0;
    const max = 11;
    const test = 10;
    const res = clampValue(val, min, max);
    expect(res).toBe(test);
  });
  it('should clamp value correctly w/o max', () => {
    const val = 10;
    const min = 0;
    const max = undefined;
    const test = 10;
    const res = clampValue(val, min, max);
    expect(res).toBe(test);
  });

  it('should clamp value correctly w/o min', () => {
    const val = 10;
    const min = undefined;
    const max = 10;
    const test = 10;
    const res = clampValue(val, min, max);
    expect(res).toBe(test);
  });

  it('should clamp negative value correctly w/o max', () => {
    const val = -10;
    const min = 0;
    const max = undefined;
    const test = 0;
    const res = clampValue(val, min, max);
    expect(res).toBe(test);
  });
});

describe('formatKpiValue()', () => {
  it('should return a value with 2 decimals" ', () => {
    const res = formatKpiValue(10, { decimal: 2 });
    expect(res).toBe('10.00');
  });

  it('should return a value w/o decimals', () => {
    const res = formatKpiValue(10);
    expect(res).toBe('10');
  });

  it('should return a negative value with 2 decimals', () => {
    const res = formatKpiValue(-10, { decimal: 2 });
    expect(res).toBe('-10.00');
  });

  it('should return a value with 1 decimals low clamped', () => {
    const res = formatKpiValue(10, { decimal: 1, minRange: 11 });
    expect(res).toBe('11.0');
  });

  it('should return a value with 1 decimals high clamped', () => {
    const res = formatKpiValue(10, { decimal: 1, maxRange: 9 });
    expect(res).toBe('9.0');
  });

  it('should return a value with 1 decimals high clamped', () => {
    const res = formatKpiValue(10, { decimal: 1, minRange: 9 });
    expect(res).toBe('10.0');
  });

  it('should return an empty string passing nullish value', () => {
    const res = formatKpiValue(undefined, { decimal: 2 });
    expect(res).toBe('');
  });
});

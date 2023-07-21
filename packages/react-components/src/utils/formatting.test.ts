import { Currency } from '../components/product-card/product-card-kpis/product-card-kpis';
import {
  clampValue, formatKpiValue, formatPriceRangeValues, getCurrency, isGreaterThan, isValueOverCap,
} from './formatting';

describe('formatPriceRangeValues()', () => {
  it('should return both price values', () => {
    const res = formatPriceRangeValues(10, 20);
    expect(res).toBe('10.00 - 20.00 €');
  });

  it('should return both price values with currency $ and w/o decimal', () => {
    const res = formatPriceRangeValues(10, 20, { currency: 'USD', decimals: 0 });
    expect(res).toBe('10 - 20 $');
  });

  it('should return both price values w/o currency', () => {
    const res = formatPriceRangeValues(10, 20, { currency: undefined, decimals: 0 });
    expect(res).toBe('10 - 20');
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

  it('should return correct format with cap', () => {
    const res = formatKpiValue(10, { decimal: 0, cap: 100 });
    expect(res).toBe('10 / 100');
  });
});

describe('isValueOverCap()', () => {
  it('should return true when value > cap', () => {
    const val = 10;
    const cap = 9;
    const isOver = isValueOverCap(val, cap);
    expect(isOver).toBeTruthy();
  });

  it('should return true when value < cap', () => {
    const val = 10;
    const cap = 11;
    const isOver = isValueOverCap(val, cap);
    expect(isOver).not.toBeTruthy();
  });

  it('should return false when cap = 0', () => {
    const val = 10;
    const cap = 0;
    const isOver = isValueOverCap(val, cap);
    expect(isOver).not.toBeTruthy();
  });
});

describe('isGreaterThan()', () => {
  it('should return true when value > threashold', () => {
    const v = 10;
    const t = 5;
    const isGreater = isGreaterThan(t, v);
    expect(isGreater).toBeTruthy();
  });

  it('should return false when value < threashold', () => {
    const v = 10;
    const t = 15;
    const isGreater = isGreaterThan(t, v);
    expect(isGreater).not.toBeTruthy();
  });

  it('should return false when value = undefined', () => {
    const v = undefined;
    const t = 15;
    const isGreater = isGreaterThan(t, v);
    expect(isGreater).not.toBeTruthy();
  });
});

describe('getCurrency()', () => {
  const tests: Array<{ code: Currency | undefined; out: string }> = [
    { code: 'EUR', out: '€' },
    { code: 'USD', out: '$' },
    { code: 'GBP', out: '£' },
    { code: 'JPY', out: '¥' },
    { code: 'CNY', out: '¥' },
    { code: undefined, out: '' },
  ];

  tests.map(t => (
    it(`should return ${t.out}`, () => {
      const input = t.code;
      const output = getCurrency(input);
      const test = t.out;
      expect(output).toBe(test);
    })
  ));
});

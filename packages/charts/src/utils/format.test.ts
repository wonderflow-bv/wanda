import {
  formatDate, formatNumber, formatValue, getLocales, truncate,
} from './format';

describe('getLocales()', () => {
  it('should return the corresponding locales ["it-IT"]', () => {
    const res = getLocales('it-it');
    const exp = ['it-IT'];
    expect(res).toStrictEqual(exp);
  });

  it('should return the corresponding multiple locales ["it-IT", "en-US"]', () => {
    const res = getLocales(['it-it', 'en-us']);
    const exp = ['it-IT', 'en-US'];
    expect(res).toStrictEqual(exp);
  });

  it('should return the corresponding the default locales ["en-US"]', () => {
    const res = getLocales(['it-it-en-us']);
    const exp = ['en-US'];
    expect(res).toStrictEqual(exp);
  });
});

describe('formatNumber()', () => {
  it('should return the value for the default locales', () => {
    const res = formatNumber(1000);
    const exp = '1,000';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for it-IT locales', () => {
    const res = formatNumber(1000, 'it-IT');
    const exp = '1.000';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for en-UK locales', () => {
    const res = formatNumber(1000, 'en-UK');
    const exp = '1,000';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for the default locales for decimals', () => {
    const res = formatNumber(0.1);
    const exp = '0.1';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for it-IT locales for decimals', () => {
    const res = formatNumber(0.1, 'it-IT');
    const exp = '0,1';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for en-UK locales for decimals', () => {
    const res = formatNumber(0.1, 'en-UK');
    const exp = '0.1';
    expect(res).toStrictEqual(exp);
  });
});

describe('formatDate()', () => {
  it('should return the formatted date', () => {
    const res = formatDate(new Date('12-13-2023'));
    const exp = '12-13-23';
    expect(res).toStrictEqual(exp);
  });

  it('should return the formatted date', () => {
    const res = formatDate(new Date('2023-12-13'));
    const exp = '12-13-23';
    expect(res).toStrictEqual(exp);
  });

  it('should return the formatted date for UK', () => {
    const res = formatDate(new Date('2023-12-13'), 'en-UK');
    const exp = '13-12-23';
    expect(res).toStrictEqual(exp);
  });

  it('should return the formatted date for IT', () => {
    const res = formatDate(new Date('12-13-2023'), 'it-IT');
    const exp = '13-12-23';
    expect(res).toStrictEqual(exp);
  });
});

describe('formatValue()', () => {
  it('should return the value for number', () => {
    const res = formatValue(1000);
    const exp = '1,000';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for date', () => {
    const res = formatValue(new Date('12-13-2023'));
    const exp = '12-13-23';
    expect(res).toStrictEqual(exp);
  });

  it('should return the value for string', () => {
    const res = formatValue('test');
    const exp = 'test';
    expect(res).toStrictEqual(exp);
  });
});

describe('truncate()', () => {
  it('should return truncated text', () => {
    const res = truncate('abcdefghijklmnopqrstuvwxyz');
    const exp = 'abcdefghijklmnopq...';
    expect(res).toStrictEqual(exp);
  });

  it('should return untruncated text', () => {
    const res = truncate('12345678901234567890');
    const exp = '12345678901234567890';
    expect(res).toStrictEqual(exp);
  });
});


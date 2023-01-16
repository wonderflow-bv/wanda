// eslint-disable-next-line @typescript-eslint/no-var-requires
const Theme = require('../dist/themes/light.json');

const THEME_TOT_KEYS = 49;

describe('Theme', () => {
  test('Light should include all keys', () => {
    expect(Object.keys(Theme).length).toBe(THEME_TOT_KEYS);
  });

  test('Should includes globals', () => {
    expect(Object.keys(Theme).includes('global-foreground')).toBeTruthy();
  });

  test('Should includes cta', () => {
    expect(Object.keys(Theme).includes('cta-default')).toBeTruthy();
  });

  test('Should includes dimmed', () => {
    expect(Object.keys(Theme).includes('dimmed-0')).toBeTruthy();
  });

  test('Should includes background', () => {
    expect(Object.keys(Theme).includes('highlight-gray-background')).toBeTruthy();
  });

  test('Should matches original', () => {
    const output = JSON.stringify(Theme);
    expect(JSON.parse(output)).toEqual(Theme);
  });
});

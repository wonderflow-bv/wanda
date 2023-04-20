import { cssRelativeUnitsToPixel } from './conversions';

describe('cssRelativeUnitsToPixel()', () => {
  const rightCases = ['20rem', '20em'];
  const wrongCases = ['abc', '20Rem', '20eM', '20ReM', '20EM', '20px', '20%'];

  rightCases.map(c => it(`should return 320 with input "${c}"`, () => {
    const res = cssRelativeUnitsToPixel(c);
    expect(res).toBe(320);
  }));

  wrongCases.map(c => it(`should return -1 with input "${c}"`, () => {
    const res = cssRelativeUnitsToPixel(c);
    expect(res).toBe(-1);
  }));
});

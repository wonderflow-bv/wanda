import { fromHSLA, toHSLA } from './colors';

describe('toHSLA()', () => {
  const query = 'hsl(120, 50%, 50%)';

  it('should return an hsla string', () => {
    const res = toHSLA(query, 0.5);
    const exp = 'hsla(120, 50%, 50% / 0.5)';
    expect(res).toStrictEqual(exp);
  });

  it('should return a hsl for alpha', () => {
    const res = toHSLA(query, 1);
    const exp = query;
    expect(res).toStrictEqual(exp);
  });
});

describe('fromHSLA()', () => {
  const query = 'hsla(120, 50%, 30% / 0.5)';

  it('should return a object with separeted values', () => {
    const res = fromHSLA(query);
    const exp = {
      a: '0.5', h: '120', l: '30%', s: '50%',
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a full objectt from HSL string', () => {
    const res = fromHSLA('hsl(120, 50%, 30%)');
    const exp = {
      a: '100%', h: '120', l: '30%', s: '50%',
    };
    expect(res).toStrictEqual(exp);
  });
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tkns = require('../platforms/web/tokens.json');

describe('Tokens', () => {
  test('should match original', () => {
    const output = JSON.stringify(Tkns);
    expect(JSON.parse(output)).toEqual(Tkns);
  });
});

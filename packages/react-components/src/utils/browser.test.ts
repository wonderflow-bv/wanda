import { isBrowser } from './browser';

describe('isBrowser()', () => {
  it('should test browser true', () => {
    const b = isBrowser();
    expect(b).toBeTruthy();
  });
});

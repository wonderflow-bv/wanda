import { isBrowser } from './browser';

describe('isBrowser()', () => {
  it('should test browser true', () => {
    const isB = isBrowser();
    expect(isB).toBeTruthy();
  });
});

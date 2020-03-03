// Under test
import { space } from './space';

describe('Space', () => {
  Object.keys(space).forEach(size => {
    it(size, () => {
      const { number, rem } = space[size];
      expect(number).toEqual(expect.any(Number));
      expect(rem).toEqual(`${number}rem`);
    });
  });
});

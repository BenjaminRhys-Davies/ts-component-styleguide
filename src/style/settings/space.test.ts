// Under test
import { space } from './space';

describe('Space', () => {
  Object.keys(space).forEach(size => {
    describe(size, () => {
      const { number, rem } = space[size];

      it('number', () => {
        expect(number).toEqual(expect.any(Number));
      });
      it('rem', () => {
        expect(rem).toEqual(`${number}rem`);
      });
    });
  });
});

// Under test
import { base, fontSize, weight } from './typography';

describe('Typography', () => {
  it('base', () => {
    expect(base).toEqual(expect.any(Number));
  });

  describe('fontSize', () => {
    Object.keys(fontSize).forEach(size => {
      describe(size, () => {
        const { number, rem } = fontSize[size];

        it('number', () => {
          expect(number).toEqual(expect.any(Number));
        });
        it('rem', () => {
          expect(rem).toEqual(`${number}rem`);
        });
      });
    });
  });

  describe('weight', () => {
    Object.keys(weight).forEach(w => {
      it(w, () => {
        expect(weight[w]).toEqual(expect.any(Number));
      });
    });
  });
});

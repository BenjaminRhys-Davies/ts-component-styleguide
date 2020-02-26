// Under test
import { reset } from './reset';

describe('reset', () => {
  it('exports a string', () => {
    expect(reset).toEqual(jasmine.any(String));
  });
});

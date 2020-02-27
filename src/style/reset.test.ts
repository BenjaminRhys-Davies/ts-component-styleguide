// Under test
import { reset } from './reset';

describe('reset', () => {
  it('exports a string', () => {
    expect(reset).toEqual(expect.any(String));
  });
});

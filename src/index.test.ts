import { Button } from './index';

describe('index ()', () => {
  it('exports a Button', () => {
    expect(Button).toBeInstanceOf(Function);
  });
});

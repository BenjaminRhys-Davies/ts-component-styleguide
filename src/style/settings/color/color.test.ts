// Mocks
const shadeMockResult = (n: number, hex: string): string => `shade ${hex} by ${n}`;
const shadeMock = jest.fn().mockImplementation(shadeMockResult);
const tintMockResult = (n: number, hex: string): string => `tint ${hex} by ${n}`;
const tintMock = jest.fn().mockImplementation(tintMockResult);
jest.mock('polished', () => ({ shade: shadeMock, tint: tintMock }));

// Under test
import { color } from './color';

describe('Color', () => {
  type TestData = {
    expected: (c: string) => string;
    name: string;
  };

  const testData: TestData[] = [
    { expected: c => tintMockResult(0.8, c), name: 'lightest' },
    { expected: c => tintMockResult(0.6, c), name: 'lighter' },
    { expected: c => tintMockResult(0.4, c), name: 'light' },
    { expected: c => shadeMockResult(0.2, c), name: 'dark' },
    { expected: c => shadeMockResult(0.6, c), name: 'darker' },
  ];

  beforeEach(() => {
    shadeMock.mockClear();
    tintMock.mockClear();
  });

  Object.keys(color).forEach(str => {
    it(str, () => {
      expect(color[str].toString()).toEqual(color[str].default);
      expect(color[str].default).toEqual(color[str].default);
      testData.forEach(({ name, expected }) => {
        expect(color[str][name]).toEqual(expected(color[str]));
      });
    });
  });
});

// Mocks
const shadeMockResult = (n: number, hex: string): string => `shade ${hex} by ${n}`;
const shadeMock = jest.fn().mockImplementation(shadeMockResult);
const tintMockResult = (n: number, hex: string): string => `tint ${hex} by ${n}`;
const tintMock = jest.fn().mockImplementation(tintMockResult);
jest.mock('polished', () => ({ shade: shadeMock, tint: tintMock }));

// Under test
import { color, colorRamp } from './color';

describe('Colors', () => {
  type Color = keyof typeof color;

  describe('color', () => {
    const validHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    Object.keys(color).forEach(c => {
      it(c, () => {
        expect(color[c as Color]).toMatch(validHex);
      });
    });
  });

  describe('colorRamp', () => {
    type TestData = {
      expected: (c: Color) => string;
      name: string;
    };

    const testData: TestData[] = [
      { expected: c => tintMockResult(0.8, color[c]), name: 'lightest' },
      { expected: c => tintMockResult(0.6, color[c]), name: 'lighter' },
      { expected: c => tintMockResult(0.4, color[c]), name: 'light' },
      { expected: c => color[c], name: 'default' },
      { expected: c => shadeMockResult(0.2, color[c]), name: 'dark' },
      { expected: c => shadeMockResult(0.6, color[c]), name: 'darker' },
    ];

    beforeEach(() => {
      shadeMock.mockClear();
      tintMock.mockClear();
    });

    Object.keys(color).forEach(str => {
      describe(str, () => {
        testData.forEach(({ name, expected }) => {
          it(name, () => {
            expect(colorRamp[str as Color]).toEqual(expect.objectContaining({
              [name]: expected(str as Color),
            }));
          });
        });
      });
    });
  });
});

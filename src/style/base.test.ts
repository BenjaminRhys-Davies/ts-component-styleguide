import { Face } from './generators/font';

// Mocks
const fontMock = jest.fn();
jest.mock('./generators/font', () => ({ font: fontMock }));

const resetResult = 'EXPECTED RESET';
jest.mock('./reset', () => ({ reset: resetResult }));

const weightResult = {
  default: 99999,
  medium: 88888,
};
jest.mock('./settings/typography', () => ({ weight: weightResult }));

// Under test
import { base, defaultFonts } from './base';

describe('base', () => {
  beforeEach(() => {
    fontMock.mockClear();
  });
  describe('base', () => {
    it('exports a string', () => {
      expect(base).toEqual(expect.any(String));
    });
    it('contains reset', () => {
      expect(base).toContain(resetResult);
    });
  });

  describe('defaultFonts', () => {
    const faceGenerator = (path: string): Face[] => [
      {
        path,
        fileName: 'GT-Walsheim-Pro-Regular',
        sources: ['eot', 'woff2', 'woff', 'ttf'],
        style: 'normal',
        weight: weightResult.default,
      },
      {
        path,
        fileName: 'GT-Walsheim-Pro-Medium',
        sources: ['eot', 'woff2', 'woff', 'ttf'],
        style: 'normal',
        weight: weightResult.medium,
      },
      {
        path,
        fileName: 'GT-Walsheim-Pro-Regular-Oblique',
        sources: ['eot', 'woff2', 'woff', 'ttf'],
        style: 'italic',
        weight: weightResult.default,
      },
      {
        path,
        fileName: 'GT-Walsheim-Pro-Medium-Oblique',
        sources: ['eot', 'woff2', 'woff', 'ttf'],
        style: 'italic',
        weight: weightResult.medium,
      },
    ];
    describe('calls font generator', () => {
      it('with detault path', () => {
        defaultFonts();
        expect(fontMock).toHaveBeenCalledWith(
          [
            {
              faces: faceGenerator('fonts/'),
              name: 'GT Walsheim Pro',
            },
          ],
          ['sans-serif'],
        );
      });
      it('with custom path', () => {
        const path = 'EXPECTED PATH';
        defaultFonts(path);
        expect(fontMock).toHaveBeenCalledWith(
          [
            {
              faces: faceGenerator(path),
              name: 'GT Walsheim Pro',
            },
          ],
          ['sans-serif'],
        );
      });
    });
  });
});

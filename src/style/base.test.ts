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
  describe('base', () => {
    it('exports a string', () => {
      expect(base).toEqual(expect.any(String));
    });
    it('contains reset', () => {
      expect(base).toContain(resetResult);
    });
  });

  describe('defaultFonts', () => {
    it('calls font generator', () => {
      defaultFonts();
      expect(fontMock).toHaveBeenCalledWith(
        [
          {
            name: 'GT Walsheim Pro',
            faces: [
              {
                fileName: 'GT-Walsheim-Pro-Regular',
                path: '/fonts/',
                sources: ['eot', 'woff2', 'woff', 'ttf'],
                style: 'normal',
                weight: weightResult.default,
              },
              {
                fileName: 'GT-Walsheim-Pro-Medium',
                path: '/fonts/',
                sources: ['eot', 'woff2', 'woff', 'ttf'],
                style: 'normal',
                weight: weightResult.medium,
              },
              {
                fileName: 'GT-Walsheim-Pro-Regular-Oblique',
                path: '/fonts/',
                sources: ['eot', 'woff2', 'woff', 'ttf'],
                style: 'italic',
                weight: weightResult.default,
              },
              {
                fileName: 'GT-Walsheim-Pro-Medium-Oblique',
                path: '/fonts/',
                sources: ['eot', 'woff2', 'woff', 'ttf'],
                style: 'italic',
                weight: weightResult.medium,
              },
            ],
          },
        ],
        ['sans-serif'],
      );
    });
  });
});

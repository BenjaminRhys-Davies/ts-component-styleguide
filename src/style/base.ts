import { font } from './generators/font';
import { reset } from './reset';
import { weight } from './settings/typography';

export const base = `
  ${reset}

  html {
    font-size: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 100%;
  }
`;

const style = {
  italic: 'italic',
  normal: 'normal',
};

export const defaultFonts = (): string[] =>
  font(
    [
      {
        name: 'GT Walsheim Pro',
        faces: [
          {
            fileName: 'GT-Walsheim-Pro-Regular',
            style: style.normal,
            weight: weight.default,
          },
          {
            fileName: 'GT-Walsheim-Pro-Medium',
            style: style.normal,
            weight: weight.medium,
          },
          {
            fileName: 'GT-Walsheim-Pro-Regular-Oblique',
            style: style.italic,
            weight: weight.default,
          },
          {
            fileName: 'GT-Walsheim-Pro-Medium-Oblique',
            style: style.italic,
            weight: weight.medium,
          },
        ].map(face => ({
          ...face,
          path: 'fonts/',
          sources: ['eot', 'woff2', 'woff', 'ttf'],
        })),
      },
    ],
    ['sans-serif'],
  );

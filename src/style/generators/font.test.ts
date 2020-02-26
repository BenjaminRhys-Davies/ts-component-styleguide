// Under test
import { font, Face } from './font';

describe('font', () => {
  describe('should', () => {
    describe('fallback to', () => {
      it('custom font-family', () => {
        const fallbackFontFamilies = ['EXPECTED FALLBACK #1', 'EXPECTED FALLBACK #2'];
        expect(font([], fallbackFontFamilies)).toEqual(expect.arrayContaining(
          [expect.stringContaining(`body { font-family: ${fallbackFontFamilies.map(n => `'${n}'`).join(',')};`)],
        ));
      });
      it('no font-family', () => {
        const fonts = font([]);
        expect(fonts).not.toEqual(expect.arrayContaining(
          [expect.stringContaining('@font-face')],
        ));
        expect(fonts).not.toEqual(expect.arrayContaining(
          [expect.stringContaining('body { font-family:')],
        ));
      });
    });
    describe('handle', () => {
      describe('no', () => {
        it('font-faces', () => {
          expect(font([])).not.toEqual(expect.arrayContaining(
            [expect.stringContaining('@font-face')],
          ));
        });
      });

      describe('font-families', () => {
        const fontFamilies: Required<Parameters<typeof font>>[0] = [
          'EXPECTED NAME #1',
          'EXPECTED NAME #2',
          'EXPECTED NAME #3',
        ].map(name => ({ name }));

        it('with no faces', () => {
          expect(font(fontFamilies)).not.toEqual(expect.arrayContaining(
            [expect.stringContaining('@font-face')],
          ));
        });

        it('registers all family names', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            [expect.stringContaining(`body { font-family: ${fontFamilies.map(({ name }) => `'${name}'`).join(',')};`)],
          ));
        });
      });

      describe('font-families', () => {
        const sources: Face['sources'] = ['eot', 'svg', 'ttf', 'woff', 'woff2'];
        const fontFamilies: Required<Parameters<typeof font>>[0] = [
          {
            faces: [{
              sources,
              fileName: 'EXPECTED FILENAME #1',
              path: 'EXPECTED PATH #1',
              style: 'EXPECTED STYLE #1',
              weight: 1,
            }],
            name: 'EXPECTED FAMILY #1',
          },
          {
            faces: [
              {
                sources,
                fileName: 'EXPECTED FILENAME #2',
                path: 'EXPECTED PATH #2',
                style: 'EXPECTED STYLE #2',
                weight: 2,
              },
              {
                sources,
                fileName: 'EXPECTED FILENAME #3',
                path: 'EXPECTED PATH #3',
                style: 'EXPECTED STYLE #3',
                weight: 3,
              },
            ],
            name: 'EXPECTED FAMILY #2',
          }
        ];

        it('with font-faces', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            fontFamilies.flatMap(({ faces = [] }) => faces.map(() => expect.stringContaining(`@font-face {`))),
          ));
        });

        it('with font-families', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            fontFamilies.flatMap(({ faces = [], name }) => faces.map(() => expect.stringContaining(`font-family: "${name}";`))),
          ));
        });

        it('with font-weight', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            fontFamilies.flatMap(({ faces = [] }) => faces.map(({ weight }) => expect.stringContaining(`font-weight: ${weight};`))),
          ));
        });

        it('with font-style', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            fontFamilies.flatMap(({ faces = [] }) => faces.map(({ style }) => expect.stringContaining(`font-style: ${style};`))),
          ));
        });

        it('with src', () => {
          expect(font(fontFamilies)).toEqual(expect.arrayContaining(
            fontFamilies.flatMap(({ faces = [] }) => faces.flatMap(({ fileName, path }) =>
              expect.stringContaining(
                [
                  `src: url("${path}${fileName}.eot?#iefix") format("embedded-opentype")`,
                  `url("${path}${fileName}.svg#svgFontName") format("svg")`,
                  `url("${path}${fileName}.ttf") format("truetype")`,
                  `url("${path}${fileName}.woff") format("woff")`,
                  `url("${path}${fileName}.woff2") format("woff2")`,
                ].join(','),
              ),
            ))
          ));
        });
      });
    });
  });
});

// Under test
import { font, Face } from './font';

describe('font', () => {
  describe('should', () => {
    describe('fallback to', () => {
      it('custom font-family', () => {
        const fallbackFontFamilies = ['EXPECTED FALLBACK #1', 'EXPECTED FALLBACK #2'];
        expect(font([], fallbackFontFamilies)).toEqual(expect.arrayContaining(
          [expect.stringContaining(`body { font-family: ${fallbackFontFamilies.map(n => `'${n}'`).join(',')}; }`)],
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
            [expect.stringContaining(`body { font-family: ${fontFamilies.map(({ name }) => `'${name}'`).join(',')}; }`)],
          ));
        });
      });

      describe('font-families', () => {
        const fontFamilies: Required<Parameters<typeof font>>[0] = [
          {
            faces: [{
              fileName: 'EXPECTED FILENAME #1',
              path: 'EXPECTED PATH #1',
              sources: ['eot', 'svg', 'ttf', 'woff', 'woff2'],
              style: 'EXPECTED STYLE #1',
              weight: 1,
            }],
            name: 'EXPECTED FAMILY #1',
          },
          {
            faces: [
              {
                fileName: 'EXPECTED FILENAME #2',
                path: 'EXPECTED PATH #2',
                sources: ['woff', 'ttf', 'eot'],
                style: 'EXPECTED STYLE #2',
                weight: 2,
              },
              {
                sources: [],
                fileName: 'EXPECTED FILENAME #3',
                path: 'EXPECTED PATH #3',
                style: 'EXPECTED STYLE #3',
                weight: 3,
              },
            ],
            name: 'EXPECTED FAMILY #2',
          },
        ];

        describe('with', () => {
          interface FlatFace extends Face {
            name: string;
          }
          
          const expectedFlatFaces = fontFamilies.reduce(
            (acc, { faces = [], name }) => [
              ...acc,
              ...faces.map(face => ({ ...face, name })),
            ],
            [] as FlatFace[],
          );
          const [faces] = font(fontFamilies);
          const actualFaces = faces.split('}');
          expectedFlatFaces.map(({ fileName, name, path, sources, style, weight }, i) => {
            const actualFace = actualFaces[i];

            describe(name, () => {
              it('font-face', () => {
                expect(actualFace).toEqual(expect.stringContaining('@font-face {'));
              });

              it('font-family', () => {
                expect(actualFace).toEqual(expect.stringContaining(`font-family: "${name}";`));
              });

              it('font-weight', () => {
                expect(actualFace).toEqual(expect.stringContaining(`font-weight: ${weight};`));
              });

              it('font-style', () => {
                expect(actualFace).toEqual(expect.stringContaining(`font-style: ${style};`));
              });

              describe('src', () => {
                it('eot', () => {
                  (sources.includes('eot') ?
                    expect(actualFace) :
                    expect(actualFace).not
                  ).toEqual(expect.stringContaining(`url("${path}${fileName}.eot?#iefix") format("embedded-opentype")`));
                });
                
                if (sources.includes('eot')) {
                  it('eot', () => {
                    expect(actualFace).toEqual(expect.stringContaining(`url("${path}${fileName}.eot?#iefix") format("embedded-opentype")`));
                  });
                }
                if (sources.includes('svg')) {
                  it('svg', () => {
                    expect(actualFace).toEqual(expect.stringContaining(`url("${path}${fileName}.svg#svgFontName") format("svg")`));
                  });
                }
                if (sources.includes('ttf')) {
                  it('ttf', () => {
                    expect(actualFace).toEqual(expect.stringContaining(`url("${path}${fileName}.ttf") format("truetype")`));
                  });
                }
                if (sources.includes('woff')) {
                  it('woff', () => {
                    expect(actualFace).toEqual(expect.stringContaining(`url("${path}${fileName}.woff") format("woff")`));
                  });
                }
                if (sources.includes('woff2')) {
                  it('woff2', () => {
                    expect(actualFace).toEqual(expect.stringContaining(`url("${path}${fileName}.woff2") format("woff2")`));
                  });
                }
              });
            });
          });
        });
      });
    });
  });
});

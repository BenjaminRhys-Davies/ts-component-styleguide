// Under test
import { font, Face } from './font';

describe('font', () => {
  describe('should', () => {
    describe('fallback to', () => {
      it('custom font-family', () => {
        const fallbackFontFamilies = ['EXPECTED FALLBACK #1', 'EXPECTED FALLBACK #2'];
        const fontFamily = fallbackFontFamilies.map(n => `'${n}'`).join(',');
        expect(font([], fallbackFontFamilies)).toEqual(
          expect.arrayContaining([expect.stringContaining(`body { font-family: ${fontFamily}; }`)]),
        );
      });
      it('no font-family', () => {
        const fonts = font([]);
        expect(fonts).not.toEqual(
          expect.arrayContaining([
            expect.stringContaining('@font-face'),
            expect.stringContaining('body { font-family:'),
          ]),
        );
      });
    });
    describe('handle', () => {
      describe('no', () => {
        it('font-faces', () => {
          expect(font([])).not.toEqual(expect.arrayContaining([expect.stringContaining('@font-face')]));
        });
      });

      describe('font-families', () => {
        const fontFamilies: Required<Parameters<typeof font>>[0] = [
          'EXPECTED NAME #1',
          'EXPECTED NAME #2',
          'EXPECTED NAME #3',
        ].map(name => ({ name }));

        it('with no faces', () => {
          expect(font(fontFamilies)).not.toEqual(expect.arrayContaining([expect.stringContaining('@font-face')]));
        });

        it('registers all family names', () => {
          expect(font(fontFamilies)).toEqual(
            expect.arrayContaining([
              expect.stringContaining(
                `body { font-family: ${fontFamilies.map(({ name }) => `'${name}'`).join(',')}; }`,
              ),
            ]),
          );
        });
      });

      describe('font-family', () => {
        const fontFamilies: Required<Parameters<typeof font>>[0] = [
          {
            faces: [
              {
                fileName: 'EXPECTED FILENAME #1',
                path: 'EXPECTED PATH #1',
                sources: ['eot', 'svg', 'ttf', 'woff', 'woff2'],
                style: 'EXPECTED STYLE #1',
                weight: 1,
              },
            ],
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
            (acc, { faces = [], name }) => [...acc, ...faces.map(face => ({ ...face, name }))],
            [] as FlatFace[],
          );
          const [faces] = font(fontFamilies);
          const actualFaces = faces.split('}');
          expectedFlatFaces.forEach(({ fileName, name, path, sources, style, weight }, i) => {
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
                  const expected = expect.stringContaining(
                    `url("${path}${fileName}.eot?#iefix") format("embedded-opentype")`,
                  );
                  if (sources.includes('eot')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
                it('otf', () => {
                  const expected = expect.stringContaining(`url("${path}${fileName}.otf") format("opentype")`);
                  if (sources.includes('otf')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
                it('svg', () => {
                  const expected = expect.stringContaining(`url("${path}${fileName}.svg#svgFontName") format("svg")`);
                  if (sources.includes('svg')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
                it('ttf', () => {
                  const expected = expect.stringContaining(`url("${path}${fileName}.ttf") format("truetype")`);
                  if (sources.includes('ttf')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
                it('woff', () => {
                  const expected = expect.stringContaining(`url("${path}${fileName}.woff") format("woff")`);
                  if (sources.includes('woff')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
                it('woff2', () => {
                  const expected = expect.stringContaining(`url("${path}${fileName}.woff2") format("woff2")`);
                  if (sources.includes('woff2')) {
                    expect(actualFace).toEqual(expected);
                  } else {
                    expect(actualFace).not.toEqual(expected);
                  }
                });
              });
            });
          });
        });
      });
    });
  });
});

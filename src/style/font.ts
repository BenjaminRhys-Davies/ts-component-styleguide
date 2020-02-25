import { weight } from './settings/typography';

export interface Face {
  fileName: string;
  path: string;
  sources: string[];
  style: string;
  weight: number;
}

export interface FamilyConfig {
  faces: Face[];
  name: string;
}

const style = {
  italic: 'italic',
  normal: 'normal',
};

const formats = {
  eot: 'embedded-opentype',
  otf: 'opentype',
  svg: 'svg',
  ttf: 'truetype',
  woff: 'woff',
  woff2: 'woff2',
};

const sources = ['eot', 'woff2', 'woff', 'ttf'];

const path = '/fonts/';

const defaultConfig: FamilyConfig[] = [
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
      path,
      sources,
    })),
  },
];

const postFix = (type: string): string => {
  switch (type) {
    case 'eot':
      return '?#iefix';
    case 'svg':
      return '#svgFontName';
    default:
      return '';
  }
};

const fontSource = (type: string, fileLocation: string): string =>
  `url("${fileLocation}.${type}${postFix(type)}") format("${formats[type]}")`;

const fontFamily = (fonts: FamilyConfig[]): string =>
  fonts.map((family: FamilyConfig) => `'${family.name}'`).join(',');

const fontFace = (fonts: FamilyConfig[]): string[] =>
  fonts.map(({ faces, name }: FamilyConfig) => faces.map((face: Face) => `
    @font-face {
      font-family: "${name}";
      src: ${face.sources.map(type => fontSource(type, `${face.path}${face.fileName}`)).join(',')};
      font-weight: ${face.weight};
      font-style: ${face.style};
    }`).join(''),
  );

export const fonts = (fontConfigs: FamilyConfig[] = defaultConfig): string[] => [
  ...fontFace(fontConfigs),
  `body {
    font-family: ${fontFamily(fontConfigs)},sans-serif;
  }`,
];
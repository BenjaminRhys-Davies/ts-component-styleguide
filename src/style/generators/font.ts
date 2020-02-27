const formats = {
  eot: 'embedded-opentype',
  otf: 'opentype',
  svg: 'svg',
  ttf: 'truetype',
  woff: 'woff',
  woff2: 'woff2',
};

export interface Face {
  fileName: string;
  path: string;
  sources: (keyof typeof formats)[];
  style: string;
  weight: number;
}

export interface FamilyConfig {
  faces?: Face[];
  name: string;
}

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

const fontSource = (type: keyof typeof formats, fileLocation: string): string =>
  `url("${fileLocation}.${type}${postFix(type)}") format("${formats[type]}")`;

const encloseName = (name: string): string => `'${name}'`;

const fontFace = (fonts: FamilyConfig[]): string =>
  fonts
    .map(({ faces = [], name }: FamilyConfig) =>
      faces
        .map(
          (face: Face) =>
            `@font-face {
              font-family: "${name}";
              font-style: ${face.style};
              font-weight: ${face.weight};
              src: ${face.sources.map(type => fontSource(type, `${face.path}${face.fileName}`)).join(',')};
            }`,
        )
        .join(''),
    )
    .join('');

export const font = (familyConfigs: FamilyConfig[], fallback: string[] = []): string[] => {
  const families = [...familyConfigs.map(({ name }) => name), ...fallback];
  return [
    fontFace(familyConfigs),
    families.length ? `body { font-family: ${families.map(encloseName).join(',')}; }` : '',
  ];
};

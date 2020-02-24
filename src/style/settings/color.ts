import { shade, tint } from 'polished';

const COLOR = {
  // primary
  richPurple: '#3d0066',
  electricBlue: '#01e1fd',
  white: '#ffffff',
  black: '#000000',

  // secondary
  indigo: '#7c07fc',
  violet: '#b26bfc',
  yellow: '#f9cc00',
  orange: '#fd6134',
  rose: '#ff4289',
  teal: '#02ddc1',
  plum: '#7c1a70',
  royalBlue: '#002859',
  lockwood: '#005b4c',
  maroon: '#720035',

  // neutral
  platinum: '#f6f6f6',
  snow: '#efefef',
  silver: '#dfdfdf',
  coolGrey: '#a7a5a5',
  nickel: '#6f6a6c',
  charcoal: '#4f4c4d',
};

export type ColorName = keyof typeof COLOR;
export type ColorNames = {
  [color in ColorName]: string;
};

export type Ramp = 'lightest' | 'lighter' | 'light' | 'default' | 'dark' | 'darker';

type GenerateColorRamps = {
  [d in Ramp]: (hex: string) => string;
};

type Ramps = {
  [d in Ramp]: string;
};

const RAMPS: GenerateColorRamps = {
  lightest: hex => tint(0.8, hex),
  lighter: hex => tint(0.6, hex),
  light: hex => tint(0.4, hex),
  default: hex => hex,
  dark: hex => shade(0.2, hex),
  darker: hex => shade(0.6, hex),
};

const generateColorRamp = (name: ColorName): Ramps => Object.keys(RAMPS).reduce(
  (acc, ramp) => ({
    ...acc,
    [ramp]: RAMPS[ramp as Ramp](COLOR[name]),
  }),
  {} as Ramps,
);

export type ColorRamps = {
  [color in ColorName]: Ramps;
};

const COLOR_RAMPS = Object.keys(COLOR).reduce(
  (acc, name) => ({
    ...acc,
    [name]: generateColorRamp(name as ColorName),
  }),
  {} as ColorRamps,
);

export const color: Readonly<ColorNames> = COLOR;
export const colorRamp: Readonly<typeof COLOR_RAMPS> = COLOR_RAMPS;

import { shade, tint } from 'polished';

export const color = {
  richPurple: '#3d0066',
  electricBlue: '#01e1fd',
  white: '#ffffff',
  black: '#000000',
};

export type ColorName = keyof typeof color;
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

const ramps: GenerateColorRamps = {
  lightest: hex => tint(0.8, hex),
  lighter: hex => tint(0.6, hex),
  light: hex => tint(0.4, hex),
  default: hex => hex,
  dark: hex => shade(0.2, hex),
  darker: hex => shade(0.6, hex),
};

const generateColorRamp = (name: ColorName): Ramps =>
  Object.keys(ramps).reduce(
    (acc, ramp) => ({
      ...acc,
      [ramp]: ramps[ramp as Ramp](color[name]),
    }),
    {} as Ramps,
  );

export type ColorRamps = {
  [color in ColorName]: Ramps;
};

export const colorRamp = Object.keys(color).reduce(
  (acc, name) => ({
    ...acc,
    [name]: generateColorRamp(name as ColorName),
  }),
  {} as ColorRamps,
);

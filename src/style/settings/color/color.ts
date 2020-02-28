import { shade, tint } from 'polished';

const colors = {
  richPurple: '#3d0066',
  electricBlue: '#01e1fd',
  white: '#ffffff',
  black: '#000000',
};

export type ColorName = keyof typeof colors;
export type ColorNames = {
  [color in ColorName]: string;
};

export type Ramp = 'lightest' | 'lighter' | 'light' | 'default' | 'dark' | 'darker';

type GenerateRamps = {
  [d in Ramp]: (hex: string) => string;
};

type Ramps = {
  [d in Ramp]: string;
};

const generateRamps: GenerateRamps = {
  lightest: hex => tint(0.8, hex),
  lighter: hex => tint(0.6, hex),
  light: hex => tint(0.4, hex),
  default: hex => hex,
  dark: hex => shade(0.2, hex),
  darker: hex => shade(0.6, hex),
};

const generateColorRamp = (hex: string): Ramps =>
  Object.keys(generateRamps).reduce(
    (acc, ramp) => ({
      ...acc,
      [ramp]: generateRamps[ramp as Ramp](hex),
    }),
    {
      toString() {
        return hex;
      },
    } as Ramps,
  );

export type Color = {
  [color in ColorName]: Ramps;
};

export const color = Object.keys(colors).reduce(
  (acc, name) => ({
    ...acc,
    [name]: generateColorRamp(colors[name]),
  }),
  {} as Color,
);

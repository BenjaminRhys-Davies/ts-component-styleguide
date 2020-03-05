export const weight = {
  default: 400,
  medium: 500,
  regular: 300,
};

const fontSizes = {
  labelSmall: 0.75,
  labelRegular: 0.8125,
  labelLarge: 0.875,
  default: 1,
  displaySmall: 1.125,
  displayRegular: 1.4375,
  displayLarge: 2,
};

export type FontSize = {
  [size in keyof typeof fontSizes]: {
    number: number;
    rem: string;
  };
};

export const fontSize = Object.keys(fontSizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      number: fontSizes[key],
      rem: `${fontSizes[key]}rem`,
    },
  }),
  {} as FontSize,
);

export const base = 16;

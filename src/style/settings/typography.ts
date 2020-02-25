export const weight = {
  default: 400,
  medium: 500,
  regular: 300,
};

export type Weights = keyof typeof weight;

const fontSizes = {
  labelSmall: 0.75,       // 12px
  labelRegular: 0.8125,   // 13px
  labelLarge: 0.875,      // 14px
  default: 1,             // 16px
  displaySmall: 1.125,    // 18px
  displayRegular: 1.4375, // 23px
  displayLarge: 2,        // 32px
};

export type FontSizes = keyof typeof fontSizes;

export type FontSize = {
  [size in FontSizes]: {
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

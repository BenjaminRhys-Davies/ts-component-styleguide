const spaces = {
  xxxSmall: 0.125,
  xxSmall: 0.25,
  xSmall: 0.5,
  small: 0.75,
  default: 1,
  large: 1.5,
};

export type Space = {
  [key in keyof typeof spaces]: {
    number: number;
    rem: string;
  };
};

export const space = Object.keys(spaces).reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      number: spaces[key],
      rem: `${spaces[key]}rem`,
    },
  }),
  {} as Space,
);

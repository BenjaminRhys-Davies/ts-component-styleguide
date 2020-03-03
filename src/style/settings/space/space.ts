const SPACING = {
  xxxSmall: 0.125, // 2px
  xxSmall: 0.25, // 4px
  xSmall: 0.5, // 8px
  small: 0.75, // 12px
  default: 1, // 16px
  large: 1.5, // 24px
};

type Spacing = keyof typeof SPACING;

export type Space = {
  [key in Spacing]: {
    number: number;
    rem: string;
  };
};

export const space = Object.keys(SPACING).reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      number: SPACING[key],
      rem: `${SPACING[key]}rem`,
    },
  }),
  {} as Space,
);

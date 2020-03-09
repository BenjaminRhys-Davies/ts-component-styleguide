const layers = {
  toast: 900,
  modal: 600,
  pullout: 500,
  veil: 400,
  navigation: 300,
  tooltip: 200,
  context: 100,
  base: 0,
  hidden: -100,
};

type Layer = keyof typeof layers;
export type Layers = {
  [l in Layer]: number;
};

export const layer = Object.keys(layers).reduce(
  (acc, key) => ({ ...acc, [key]: layers[key] }),
  {} as Layers,
);

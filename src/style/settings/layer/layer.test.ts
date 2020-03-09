// Under test
import { layer } from './layer';

describe('Layer', () => {
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
  Object.keys(layers).forEach(l => {
    it(l, () => {
      expect(layer[l]).toEqual(layers[l]);
    });
  });
});

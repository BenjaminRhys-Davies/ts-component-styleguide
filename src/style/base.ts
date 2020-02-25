import { reset } from './reset';

export const base = `
  ${reset}

  html {
    font-size: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 100%;
  }
`;

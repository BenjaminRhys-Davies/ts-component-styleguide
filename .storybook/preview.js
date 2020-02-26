import React from 'react';
import { createGlobalStyle } from "styled-components";
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import { base, defaultFonts } from '../src/style/base';
import results from '../.jest-test-results.json';

const GlobalStyle = createGlobalStyle`
  ${base}
  ${defaultFonts()}
`;

addDecorator(storyFn => <><GlobalStyle />{storyFn()}</>);
addDecorator(withTests({ results }));
addDecorator(withKnobs());
